import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricoColaboradoresInactivosComponent } from './historico-colaboradores-inactivos.component';

describe('HistoricoColaboradoresInactivosComponent', () => {
  let component: HistoricoColaboradoresInactivosComponent;
  let fixture: ComponentFixture<HistoricoColaboradoresInactivosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HistoricoColaboradoresInactivosComponent]
    });
    fixture = TestBed.createComponent(HistoricoColaboradoresInactivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
