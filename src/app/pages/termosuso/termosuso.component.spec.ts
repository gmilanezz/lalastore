import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermosusoComponent } from './termosuso.component';

describe('TermosusoComponent', () => {
  let component: TermosusoComponent;
  let fixture: ComponentFixture<TermosusoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TermosusoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TermosusoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
