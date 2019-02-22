export default class Fetcher {
  static fetchJSON(url: string): Promise<any> {
    return fetch(url).then(res => {
      if (!res.ok) {
        throw new Error(`Error fetching data: ${res.status} - ${res.statusText}`)
      }
      return res.json()
    })
  }
}
