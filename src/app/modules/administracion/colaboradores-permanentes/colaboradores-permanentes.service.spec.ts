import { TestBed } from '@angular/core/testing';

import { ColaboradoresPermanentesService } from './colaboradores-permanentes.service';

describe('ColaboradoresPermanentesService', () => {
  let service: ColaboradoresPermanentesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ColaboradoresPermanentesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
