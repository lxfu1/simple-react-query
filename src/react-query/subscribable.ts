type TListener = () => void;

export class Subscribable {
  protected listeners: TListener[] = [];
  constructor() {}
  subScribe(listener: TListener) {
    this.listeners.push(listener as TListener);

    this.onSubscribe();

    return () => {
      this.listeners = this.listeners.filter((x) => x !== listener);
      this.onUnsubscribe();
    };
  }
  hasListeners() {
    return this.listeners.length > 0;
  }
  notify() {}
  onSubscribe() {
    // Do something
  }
  onUnsubscribe() {
    // Do something
  }
}
