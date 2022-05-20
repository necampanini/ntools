import {GenericEntity} from "../helpers/types-general.helpers";

export interface ExampleEntity {
  id: string,
  name: string
}

export interface ExampleFeatureState {
  entities: ExampleEntity[],
  lookUp: GenericEntity<ExampleEntity>
  loading: boolean,
  selectedEntityId: string | null
}

export const initialState: ExampleFeatureState = {
  entities: [],
  lookUp: {},
  loading: false,
  selectedEntityId: null
}
