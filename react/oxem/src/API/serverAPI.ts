import { TLeaseData } from '../components/Content';

export class serverAPI {
  static async postData(data: TLeaseData) {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify({
        ...data,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await response.json();
  }
}
