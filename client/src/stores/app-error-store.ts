import { makeAutoObservable } from 'mobx';

class AppErrorStore {
  message: string = '';
  show: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  setError(message: string) {
    this.message = message;
    this.show = true;
  }

  hideError() {
    this.show = false;
  }
}

export const appErrorStore = new AppErrorStore();
