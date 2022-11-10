export class ApiServer {
  static async post(data) {
    return await fetch('https://jsonplaceholder.typicode.com/posts/', {
      method: 'POST',
      body: JSON.stringify({
        ...data
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => res.json())
  }
}
