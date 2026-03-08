type Fn<A, B> = (_: A) => B;

interface Pipe<A, B> extends Fn<A, B> {
  then<C>(g: Fn<B, C>): Pipe<A, C>;
}

export function pipe<A>(): Pipe<A, A> {
  function _pipe<A, B>(first: Fn<A, B>): Pipe<A, B> {
    return Object.assign(first, {
      then<C>(next: Fn<B, C>): Pipe<A, C> {
        return _pipe<A, C>((a) => next(first(a)));
      }
    });
  }

  return _pipe((a) => a);
};
