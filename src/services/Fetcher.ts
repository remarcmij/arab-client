import axios from 'axios';
import yaml from 'js-yaml';

export default class Fetcher {
  static async fetchData(url: string): Promise<string> {
    const { data } = await axios.get(url);
    return data;
  }

  static async fetchYml(url: string): Promise<Lemma[]> {
    const data = await this.fetchData(url);
    const doc = yaml.safeLoad(data);
    return doc;
  }

  static async fetchCsv(url: string): Promise<Lemma[]> {
    const data = await this.fetchData(url);
    const lines = data.split('\n');
    const lemmas = lines.map(line => {
      const [nl, ar, trans] = line.split(';');
      return { nl, ar, trans };
    });
    return lemmas;
  }
}
