import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrocaDevolucaoComponent } from './troca-devolucao.component';

describe('TrocaDevolucaoComponent', () => {
  let component: TrocaDevolucaoComponent;
  let fixture: ComponentFixture<TrocaDevolucaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrocaDevolucaoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrocaDevolucaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
