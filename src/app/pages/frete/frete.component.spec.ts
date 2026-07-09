import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreteComponent } from './frete.component';

describe('FreteComponent', () => {
  let component: FreteComponent;
  let fixture: ComponentFixture<FreteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FreteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FreteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
