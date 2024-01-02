import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColaboradoresPermanentesDesactivarComponent } from './colaboradores-permanentes-desactivar.component';

describe('ColaboradoresPermanentesDesactivarComponent', () => {
  let component: ColaboradoresPermanentesDesactivarComponent;
  let fixture: ComponentFixture<ColaboradoresPermanentesDesactivarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ColaboradoresPermanentesDesactivarComponent]
    });
    fixture = TestBed.createComponent(ColaboradoresPermanentesDesactivarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
