import { TestBed } from '@angular/core/testing';

import { FuturesPriceStoreService } from './futures-price-store.service';

describe('FuturesPriceStoreService', () => {
  let service: FuturesPriceStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FuturesPriceStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
