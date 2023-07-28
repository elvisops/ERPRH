import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivarColaboradorComponent } from './activar-colaborador.component';

describe('ActivarColaboradorComponent', () => {
  let component: ActivarColaboradorComponent;
  let fixture: ComponentFixture<ActivarColaboradorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActivarColaboradorComponent]
    });
    fixture = TestBed.createComponent(ActivarColaboradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
