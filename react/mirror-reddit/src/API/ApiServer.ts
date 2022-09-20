import axios from 'axios';

export class ApiServer {
  static async getAvatar(userName: string, token: string) {
    return await axios.get(`https://oauth.reddit.com/user/${userName}/about.json`, {
      headers: { Authorization: `bearer ${token}` },
    });
  }
  static async getSortedPostsList(sort = 'new', nextAfter = '', token: string) {
    return await axios.get(`https://oauth.reddit.com/${sort}.json`, {
      headers: { Authorization: `bearer ${token}` },
      params: {
        limit: 10,
        after: nextAfter,
      },
    });
  }
  static async getSearchedPostsList(search: string, nextAfter = '', token: string) {
    return await axios.get('https://oauth.reddit.com/search.json', {
      headers: { Authorization: `bearer ${token}` },
      params: {
        after: nextAfter,
        limit: 10,
        q: search,
      },
    });
  }
  static async getTabedPostsList(myUserName: string, type: string, token: string) {
    return await axios.get(`https://oauth.reddit.com/user/${myUserName}/${type}`, {
      headers: { Authorization: `bearer ${token}` },
      params: {
        type: 'links',
        limit: 10,
      },
    });
  }
  static async getPost(srcPost: string, token: string) {
    return await axios.get(`https://oauth.reddit.com/comments/${srcPost}.json`, {
      headers: { Authorization: `bearer ${token}` },
    });
  }
  static async voting(id: string, vote: string, token: string) {
    return await axios.post('https://oauth.reddit.com/api/vote', `dir=${vote}&id=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
  }
  static async hidding(id: string, token: string) {
    return await axios.post('https://oauth.reddit.com/api/hide', `id=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
  }
  static async unHidding(id: string, token: string) {
    return await axios.post('https://oauth.reddit.com/api/unhide', `id=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
  }
  static async saving(id: string, category: string, token: string) {
    return await axios.post('https://oauth.reddit.com/api/save', `category=${category}&id=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
  }
  static async unSaving(id: string, category: string, token: string) {
    return await axios.post('https://oauth.reddit.com/api/unsave', `category=${category}&id=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
  }
  static async sendComment(id: string, text: string, token: string) {
    return await axios.post('https://oauth.reddit.com/api/comment', `thing_id=${id}&text=${text}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      params: {
        return_rtjson: true,
      },
    });
  }
}
