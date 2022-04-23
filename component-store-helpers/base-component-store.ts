import { ComponentStore } from '@ngrx/component-store';
import { StateObservables$ } from '../helpers/types-observables.helpers';
import { keysFrom } from '../helpers/object-entity.helpers';
import { reduce } from '../helpers/recursive-functional.helpers';

/**
 * Extend this and provide an initial state of T for automatically generated observable properties.
 *
 * Eases repetition of:
 *
 * prop1$: this.select(x => x.prop1)
 * prop2$: this.select(x => x.prop2)
 * ...etc
 */
export class BaseComponentStore<T extends object> extends ComponentStore<T> {
  baseObservables: StateObservables$<T>;

  constructor(initialState: T) {
    super(initialState);

    this.baseObservables = reduce(
      (state$: StateObservables$<T>, key: keyof T) => ({
        ...state$,
        [`${key}$`]: this.select((x) => x[key]),
      }),
      {} as StateObservables$<T>,
      keysFrom(initialState)
    );
  }
}
