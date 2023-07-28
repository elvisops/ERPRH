import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColaboradoresPermanentesComponent } from './colaboradores-permanentes.component';

describe('ColaboradoresPermanentesComponent', () => {
  let component: ColaboradoresPermanentesComponent;
  let fixture: ComponentFixture<ColaboradoresPermanentesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ColaboradoresPermanentesComponent]
    });
    fixture = TestBed.createComponent(ColaboradoresPermanentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
