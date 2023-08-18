export interface Registry {
  off: () => void;
}

export interface Callable {
  [key: string]: (args: any) => void;
}

export interface Subscriber {
  [key: string]: Callable;
}

export interface IEventBus {
  emit<T>(event: string, arg?: T): void;
  on(event: string, callback: (args: any) => void): Registry;
}
