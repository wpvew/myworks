import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { usePostData } from '../../hooks/usePostData';
import { CommentFormContainer } from '../CommentFormContainer';
import { CommentsPost } from './CommentsPost';
import { TextContent } from '../Content/CardsList/Card/TextContent';
import { EColors, Text } from '../Text';
import { KarmaCounterContainer } from '../Content/CardsList/Card/Controls/KarmaCounterContainer';
import { PostMenuList } from './PostMenuList';
import ReactHtmlParser from 'react-html-parser';
import styles from './post.css';

export function Post() {
  const navigate = useNavigate();
  const ref = useRef<HTMLDivElement>(null);
  const { comments, post, isLoading, error } = usePostData();

  post.metadata?.forEach((elem) => {
    post.text = post.text.replace(`<img>${elem}</img>`, `<img src="${elem}" style="width: 100%">`);
  });

  const handleClickCloseBtn = () => {
    navigate('/posts');
  };

  useEffect(() => {
    function handeClick(e: MouseEvent) {
      if (e.target instanceof Node && !ref.current?.contains(e.target)) {
        navigate('/posts');
      }
    }
    document.addEventListener('click', handeClick);

    const rootHtmlElement = document.getElementById('react_root');
    const modalPosition = window.scrollY;
    if (rootHtmlElement) {
      rootHtmlElement.style.top = `-${modalPosition}px`;
      rootHtmlElement.classList.add('modal-active');
    }
    return () => {
      document.removeEventListener('click', handeClick);
      if (rootHtmlElement) {
        rootHtmlElement.removeAttribute('style');
        rootHtmlElement.classList.remove('modal-active');
        window.scrollTo(0, modalPosition);
      }
    };
  }, []);

  const node = document.getElementById('modal_root');
  if (!node) return null;

  return ReactDOM.createPortal(
    <div className={styles.modal} ref={ref}>
      {!isLoading && post.postId ? (
        <>
          <div className={styles.container}>
            <div className={styles.header}>
              <KarmaCounterContainer like={post.like} id={post.postId} rating={post.rating} classesAddition={styles.postKarma} />
              <TextContent postId={post.postId} />
            </div>
            <div className={styles.content}>
              {post.text && <div className=''>{ReactHtmlParser(post.text)}</div>}
              {post.video && <iframe allowFullScreen frameBorder={0} width='100%' height='512' src={post.video}></iframe>}
              <img className={styles.postImg} src={post.image} alt='' />
            </div>
            <div className={styles.menuBar}>
              <PostMenuList post={post} />
            </div>
            <button onClick={handleClickCloseBtn} className={styles.closeBtn}>
              <span className={styles.closeBtnX}></span>
            </button>
          </div>
          <CommentFormContainer postId={post.postId} />
          <CommentsPost comments={comments} error={error} />
        </>
      ) : (
        <div className={styles.loading}>
          {' '}
          <Text size={20} color={EColors.black}>
            Loading...
          </Text>{' '}
        </div>
      )}
    </div>,
    node
  );
}
