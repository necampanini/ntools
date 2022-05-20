import {NEVER, Observable, of} from "rxjs";

/**
 * For use with component store. takes the state interface and creates
 * an object with the same properties, suffixed with a '$' while
 * the value type returns its previous type as an observable.
 *
 * Example:
 *
 * ExampleState = {
 *  id: string,
 *  name: string
 * }
 *
 * StateObservable$<ExampleState> = {
 *  id$: Observable<string>;
 *  name$: Observable<string>
 * }
 */
export type StateObservables$<T> = {
  [K in keyof T as `${string & K}$`]: Observable<T[K]>
}

/**
 * just a more declarative name for triggering component store effects
 * that do not require an argument.
 *
 * example: this.store.effects.getThing(PLEASE$)
 */
export const PLEASE$ = of(NEVER);
