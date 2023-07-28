import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColaboradoresPermanentesEditarComponent } from './colaboradores-permanentes-editar.component';

describe('ColaboradoresPermanentesEditarComponent', () => {
  let component: ColaboradoresPermanentesEditarComponent;
  let fixture: ComponentFixture<ColaboradoresPermanentesEditarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ColaboradoresPermanentesEditarComponent]
    });
    fixture = TestBed.createComponent(ColaboradoresPermanentesEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
