import { TestBed } from '@angular/core/testing';

import { DequeUtil } from './deque.util';

describe('DequeUtil', () => {
  let service: DequeUtil;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DequeUtil);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
