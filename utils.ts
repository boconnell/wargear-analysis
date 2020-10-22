import * as R from "ramda";

export function length<T>(arr: Array<T>) {
  return arr.length;
}

export function lookup<K extends keyof any, V>(record: Record<K, V>) {
  return function get(key: K) {
    return record[key];
  };
}

export function includes<T>(arr: Array<T>) {
  return function (el: T) {
    return arr.includes(el);
  };
}

export function flatten<T>(arr: Array<Array<T>>) {
  return R.reduce((el1, el2) => R.concat(el1, el2), [] as Array<T>, arr);
}

export function joinWith(delim: string) {
  return function join<T>(arr: Array<T>) {
    return arr.join(delim);
  };
}

export function add(el1: number) {
  return function (el2: number) {
    return el1 + el2;
  };
}

export function add2(el1: number, el2: number) {
  return add(el1)(el2);
}

export function sum(arr: Array<number>) {
  return R.reduce(add2, 0, arr);
}

export function mergeWith<A>(
  f: (a1: A, a2: A) => A,
  rec1: Record<string, A>,
  rec2: Record<string, A>
) {
  const res = {
    ...rec1,
  };
  R.forEachObjIndexed((value, key) => {
    if (key in res) {
      res[key] = f(res[key], value);
    } else {
      res[key] = value;
    }
  }, rec2);
  return res;
}

export function concat<A>(list1: A[], list2: A[]) {
  return R.concat(list1, list2);
}
