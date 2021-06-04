import { TestBed } from '@angular/core/testing';

import { ExprBuilderService } from './expr-builder.service';

describe('ExprBuilderService', () => {
  let service: ExprBuilderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExprBuilderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
