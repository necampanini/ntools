import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  ExampleWidget,
  ExampleWidgetKey,
  StaticExampleWidgetKeys,
} from './example-filter-table.models';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import {
  buildFilterPredicateFrom,
  initFilterFormGroup,
} from './example-filter-table.helpers';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { camelCaseToPresentational } from '../helpers/string-general.helpers';
import {
  combineLatest,
  combineLatestWith,
  debounceTime,
  distinctUntilChanged,
  map,
  startWith,
  Subject,
  takeUntil,
} from 'rxjs';
import { tapResponse } from '@ngrx/component-store';
import { PLEASE$ } from '../helpers/types-observables.helpers';

@Component({
  selector: 'example-filter-table',
  templateUrl: 'example-filter-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExampleFilterTableComponent
  implements AfterViewInit, OnInit, OnDestroy
{
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: ExampleWidgetKey[] = StaticExampleWidgetKeys; // all properties
  dataSource = new MatTableDataSource<ExampleWidget>([]);
  defaultFilterPredicate = this.dataSource.filterPredicate;
  selection = new SelectionModel<ExampleWidget>(true, []);

  /**
   * NOTE! Used as the base list of properties to iterate over
   * for setting up filtering. Should be a subset of the displayed
   * columns
   */
  FILTER_PROPERTIES: ExampleWidgetKey[] = ['name', 'color', 'vendor'];
  filterForm: FormGroup = initFilterFormGroup(this.fb, this.FILTER_PROPERTIES);

  camelCaseToPresentational = camelCaseToPresentational;

  ngDestroy$ = new Subject();

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initFilterFormPipeline();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  private initFilterFormPipeline = (): void => {
    const searchTermFilter$ = this.filterForm.controls[
      'filter'
    ].valueChanges.pipe(
      takeUntil(this.ngDestroy$),
      startWith(''),
      debounceTime(350),
      distinctUntilChanged(),
      map((x) => x?.trim().toLowerCase() || '')
    );

    const propertyCheckboxFilters$ = this.FILTER_PROPERTIES.map((prop) =>
      this.filterForm.controls[prop].valueChanges.pipe(startWith(false))
    );

    combineLatest(propertyCheckboxFilters$)
      .pipe(
        takeUntil(this.ngDestroy$),
        debounceTime(300),
        map((checkboxes) => checkboxes.every((x) => x == false)),
        combineLatestWith(searchTermFilter$),
        tapResponse(
          ([shouldReset, searchTermFilter]) => {
            this.dataSource.filterPredicate = shouldReset
              ? this.defaultFilterPredicate
              : buildFilterPredicateFrom(this.filterForm);

            this.dataSource.filter = searchTermFilter;
          },
          (err) => console.error('Error in building observable filters', err)
        )
      )
      .subscribe();
  };

  ngOnDestroy(): void {
    this.ngDestroy$.next(PLEASE$);
  }
}
