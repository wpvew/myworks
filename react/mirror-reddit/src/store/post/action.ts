import { RootStateOrAny } from 'react-redux';
import { Action, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { ApiServer } from '../../API/ApiServer';
import { ICommentData, IPostData } from '../../hooks/usePostData';
import { getCreatedAtAgo } from '../../utils/js/getCreatedAtAgo';

export const UPDATE_POST_DETAILS = 'UPDATE_POST_DETAILS';
export type TUpdatePostDetailsData = {
  type: typeof UPDATE_POST_DETAILS;
};
export const updataPostDetailsData: ActionCreator<TUpdatePostDetailsData> = () => ({
  type: UPDATE_POST_DETAILS,
});

export const UPDATE_POST_DETAILS_SUCCESS = 'UPDATE_POST_DETAILS_SUCCESS';
export type TUpdatePostDetailsDataSuccess = {
  type: typeof UPDATE_POST_DETAILS_SUCCESS;
  postData: IPostData;
  commentsData: ICommentData[];
};
export const updataPostDetailsDataSuccess: ActionCreator<TUpdatePostDetailsDataSuccess> = (postData: IPostData, commentsData: ICommentData[]) => ({
  type: UPDATE_POST_DETAILS_SUCCESS,
  postData,
  commentsData,
});
export const UPDATE_POST_DETAILS_ERROR = 'UPDATE_POST_DETAILS_ERROR';
export type TUpdatePostDetailsDataError = {
  type: typeof UPDATE_POST_DETAILS_ERROR;
  error: string;
};
export const updataPostDetailsDataError: ActionCreator<TUpdatePostDetailsDataError> = (error) => ({
  type: UPDATE_POST_DETAILS_ERROR,
  error,
});

export interface IAvatar {
  name: string;
  avatar: string;
}
export type TData = {
  kind: string;
  data: Record<string, any>;
};

export const updataPostDetailsDataAsync =
  (srcPost: string): ThunkAction<void, RootStateOrAny, unknown, Action<any>> =>
  (dispatch, getState) => {
    dispatch(updataPostDetailsData());
    ApiServer.getPost(srcPost, getState().token)
      .then(({ data: dataPostDetails }) => {
        if (!dataPostDetails[1].data.children.length) dispatch(updataPostDetailsDataError('Comments not found'));
        Promise.all([getAvatar(dataPostDetails[0].data.children), getAvatar(dataPostDetails[1].data.children)].flat(Infinity)).then(([avatarAuthor, avatarsComments]: Array<Record<string, any>>) => {
          let userAvatars = [];
          if (avatarsComments) {
            userAvatars = avatarsComments.flat(Infinity).map(
              ({ data: { data } }: Record<string, any>): IAvatar => ({
                name: data.name,
                avatar: data.snoovatar_img || data.icon_img,
              })
            );
          }

          const commentsState = createObjComment(dataPostDetails[1].data.children, userAvatars);
          const postState = createObjPost(dataPostDetails[0].data.children[0].data, avatarAuthor[0].data.data);
          dispatch(updataPostDetailsDataSuccess(postState, commentsState));
        });
      })
      .catch((error) => {
        dispatch(updataPostDetailsDataError(error.response.data.message));
      });

    function convert(str: string) {
      return str
        .replace(/amp;/g, '')
        .replace(/&gt;/g, '>')
        .replace(/&lt;/g, '<')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&#x200B;/g, ' ')
        .replace(/>https:\/\/preview\.redd\.it\//g, '><img>https://preview.redd.it/')
        .replace(/<\/a>/, '</img></a>');
    }

    function createObjPost(dataPost: Record<string, any>, userAvatars: Record<string, any>): IPostData {
      return {
        postId: dataPost['id'],
        author: dataPost['author'],
        authorLink: `https://www.reddit.com/user/${dataPost['author']}`,
        avatar: userAvatars.snoovatar_img || userAvatars.icon_img,
        title: dataPost['title'],
        text: dataPost['selftext'] && convert(dataPost['selftext_html']),
        image: dataPost['url'],
        createdAt: new Date(+(dataPost['created'] + '000')).toLocaleString(),
        createdAtAgo: getCreatedAtAgo(dataPost['created_utc']),
        like: dataPost['likes'],
        rating: dataPost['ups'],
        qtyComments: dataPost['num_comments'],
        hidden: dataPost['hidden'],
        saved: dataPost['saved'],
        metadata: dataPost['media_metadata'] && Object.values(dataPost['media_metadata']).map((value: any): string => convert(value.s.u)),
        video: dataPost['media'] && dataPost['media']['reddit_video']['fallback_url'],
        swiper: !!dataPost['gallery_data'],
      };
    }

    function createObjComment(data: Array<TData>, userAvatars: Array<IAvatar>): Array<ICommentData> {
      return data
        .filter((data) => data.kind !== 'more')
        .map(({ data: dataComment }: Record<string, any>): ICommentData => {
          return {
            id: dataComment['id'],
            author: dataComment['author'],
            authorLink: `https://www.reddit.com/user/${dataComment['author']}`,
            text: dataComment['body'],
            createdAt: dataComment['created_utc'],
            createdAtAgo: getCreatedAtAgo(dataComment['created_utc']),
            like: dataComment['likes'],
            rating: dataComment['ups'],
            replies: dataComment['replies'].data ? createObjComment(dataComment['replies'].data.children, userAvatars) : '',
            avatar: userAvatars.find((item) => item.name === dataComment['author'])?.avatar,
          };
        });
    }

    function getAvatar<T extends Array<ICommentData>>(data: T): Array<Record<string, any>> {
      return data.map(async ({ data }: Record<string, any>) => {
        if (data.author === '[deleted]') return 'not replies';
        return Promise.all(
          [!data.children ? await ApiServer.getAvatar(data.author, getState().token) : 'not replies', data['replies'] ? getAvatar(data['replies'].data.children) : 'not replies']
            .flat(Infinity)
            .filter((item) => item !== 'not replies')
        );
      });
    }
  };
