import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColaboradoresPermanentesCrearComponent } from './colaboradores-permanentes-crear.component';

describe('ColaboradoresPermanentesCrearComponent', () => {
  let component: ColaboradoresPermanentesCrearComponent;
  let fixture: ComponentFixture<ColaboradoresPermanentesCrearComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ColaboradoresPermanentesCrearComponent]
    });
    fixture = TestBed.createComponent(ColaboradoresPermanentesCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
