import Observable, { Subscriber } from './Observable';

const INTERVAL_DURATION = 5000;

export default class FlashcardTimer extends Observable {
  private timerId = 0;

  subscribe(subscriber: Subscriber) {
    this.timerId = setInterval(this.notify.bind(this), INTERVAL_DURATION);
    return super.subscribe(subscriber);
  }

  unsubscribe(subscriber: Subscriber) {
    clearInterval(this.timerId);
    return super.unsubscribe(subscriber);
  }
}
