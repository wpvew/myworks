declare global {
  interface Object {
    hasOwnProperty<T extends string>(v: T): this is Record<T, any>;
  }
}
