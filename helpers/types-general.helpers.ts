import {NEVER, of} from "rxjs";

export type GenericEntity<T> = {
  [id: string]: T
}

export const PLEASE$ = of(NEVER);
