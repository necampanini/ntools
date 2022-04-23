import {NEVER, of} from "rxjs";

export type EntityNumberId<T> = {
  [id: number]: T
}

export type EntityStringId<T> = {
  [id: string]: T
}

export const PLEASE$ = of(NEVER);
