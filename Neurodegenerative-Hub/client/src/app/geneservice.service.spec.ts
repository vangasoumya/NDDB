import { TestBed, inject } from '@angular/core/testing';

import { GeneserviceService } from './geneservice.service';

describe('GeneserviceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GeneserviceService]
    });
  });

  it('should be created', inject([GeneserviceService], (service: GeneserviceService) => {
    expect(service).toBeTruthy();
  }));
});
