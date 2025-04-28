import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { technicianGuardGuard } from './technician.guard';

describe('technicianGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => technicianGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
