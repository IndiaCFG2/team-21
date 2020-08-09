import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KhubComponent } from './khub.component';

describe('KhubComponent', () => {
  let component: KhubComponent;
  let fixture: ComponentFixture<KhubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KhubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KhubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
