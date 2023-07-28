import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColaboradoresInactivosComponent } from './colaboradores-inactivos.component';

describe('ColaboradoresInactivosComponent', () => {
  let component: ColaboradoresInactivosComponent;
  let fixture: ComponentFixture<ColaboradoresInactivosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ColaboradoresInactivosComponent]
    });
    fixture = TestBed.createComponent(ColaboradoresInactivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
