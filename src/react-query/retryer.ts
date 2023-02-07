import { Retryer, IRetry } from "./type";

export function createRetryer<TData = unknown, TError = unknown>(
  config: IRetry
): Retryer {
  let isResolved = false;
  let promiseResolve: (data: TData) => void;
  let promiseReject: (error: TError) => void;

  const promise = new Promise<TData>((outerResolve, outerReject) => {
    promiseResolve = outerResolve;
    promiseReject = outerReject;
  });

  const resolve = (value: any) => {
    if (!isResolved) {
      isResolved = true;
      config.onSuccess?.(value);
      promiseResolve(value);
    }
  };

  const reject = (value: any) => {
    if (!isResolved) {
      isResolved = true;
      config.onFail?.(value);
      promiseReject(value);
    }
  };

  // Create loop function
  const run = () => {
    // Do nothing if already resolved
    if (isResolved) {
      return;
    }

    let promiseOrValue: any;

    // Execute query
    try {
      promiseOrValue = config.fn();
    } catch (error) {
      promiseOrValue = Promise.reject(error);
    }

    Promise.resolve(promiseOrValue)
      .then(resolve)
      .catch((error) => {
        // Stop if the fetch is already resolved
        if (isResolved) {
          return;
        }

        // Do we need to retry the request?
        reject(error);
      });
  };

  // Start loop
  run();

  return {
    promise,
  };
}
