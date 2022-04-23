import {Observable } from "rxjs";

export type StateObservables$<T> = {
  [K in keyof T as `${string & K}$`]: Observable<T[K]>
}
