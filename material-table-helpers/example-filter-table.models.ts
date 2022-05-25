import {keysFrom} from "../helpers/object-entity.helpers";

export interface ExampleWidget {
  id: string;
  name: string;
  vendor: string;
  color: string;
  dateCreated: Date
  dateModified: Date | null
}

export type ExampleWidgetKey = keyof ExampleWidget

export const StaticExampleWidget: ExampleWidget = {
  id: '',
  name: '',
  vendor: '',
  color: '',
  dateCreated: new Date(),
  dateModified: null
}

export const StaticExampleWidgetKeys = keysFrom(StaticExampleWidget);
