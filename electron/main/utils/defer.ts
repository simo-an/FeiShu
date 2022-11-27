interface DeferParam<T> {
  promise: Promise<T>,
  resolve: (T?: unknown) => void
  reject: (reason?: any) => void
}

const defer = <T = void>(): DeferParam<T> => {
  let resolve: (value: T) => void;
  let reject: (reason?: any) => void;
  // eslint-disable-next-line promise/param-names
  const promise = new Promise<T>((resolved, rejected) => {
    resolve = resolved;
    reject = rejected;
  });

  return { promise, resolve, reject };
};

export default defer;
