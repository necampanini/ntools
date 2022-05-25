import { FormBuilder, FormGroup } from '@angular/forms';
import { reduce } from '../helpers/recursive-functional.helpers';
import { FormControlConfig } from '../helpers/types-general.helpers';
import { keysFrom } from '../helpers/object-entity.helpers';

export const initFilterFormGroup = <T>(
  fb: FormBuilder,
  properties: (keyof T)[]
): FormGroup => {
  const propertyCheckboxControls = reduce(
    (result: FormControlConfig, key: keyof T): FormControlConfig => ({
      ...result,
      [key]: fb.control(false),
    }),
    {},
    properties
  );

  const stringFilterControl = fb.control('');

  const controls: FormControlConfig = {
    ...propertyCheckboxControls,
    filter: stringFilterControl,
  };

  return fb.group(controls);
};

export const buildFilterPredicateFrom = <T>({
  value: formValue,
}: FormGroup): ((data: any, filter: string) => boolean) => {
  // only consider those that are currently checked
  const filterKeys = keysFrom(formValue).filter(
    (key) => formValue[key] == true
  );

  return (data: any, filter: string) => {
    for (const filterKey of filterKeys) {
      const toEvaluate = data[filterKey]?.toLowerCase().trim() || '';
      const found = toEvaluate.indexOf(filter) !== -1;

      if (found) return true;
    }
    return false;
  };
};
