import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BestSallerComponent } from './best-saller.component';

describe('BestSallerComponent', () => {
  let component: BestSallerComponent;
  let fixture: ComponentFixture<BestSallerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BestSallerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BestSallerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
