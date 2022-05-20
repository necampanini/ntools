import { BaseComponentStore } from './base-component-store';
import { ExampleFeatureState } from './example-feature.state';

import { initialState } from './example-feature.state';
import { Observable, of, switchMap, withLatestFrom } from 'rxjs';
import { Injectable } from '@angular/core';

/**
 * by convention, passed into the providers array of a parent component.
 * child components receive the reference in their constructors
 */
@Injectable()
export class ExampleFeatureStore extends BaseComponentStore<ExampleFeatureState> {
  constructor() {
    super(initialState);
  }

  /**
   * can trigger component store effects with no parameter, instead
   * relying on current state, pulled in with 'withLatestFrom',
   * and destructing the values passed down, ignoring the first one (aliased as 'call$')
   */
  doSomethingWithCurrentlySelectedEntityId = this.effect(
    (call$: Observable<any>) =>
      call$.pipe(
        withLatestFrom(this.baseObservables.selectedEntityId$),
        switchMap(([, id]) => {
          return of(id);
        })
      )
  );
}
