export type Subscriber = () => void;

export default class Observable {
  private subscribers = new Set<Subscriber>();

  subscribe(subscriber: () => void) {
    this.subscribers.add(subscriber);
    return this.unsubscribe.bind(this, subscriber);
    // return () => this.subscribers.delete(subscriber);
  }

  unsubscribe(subscriber: Subscriber) {
    this.subscribers.delete(subscriber);
  }

  protected notify() {
    this.subscribers.forEach(callback => callback());
  }
}
