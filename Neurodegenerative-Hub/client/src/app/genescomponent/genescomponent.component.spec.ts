import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenescomponentComponent } from './genescomponent.component';

describe('GenescomponentComponent', () => {
  let component: GenescomponentComponent;
  let fixture: ComponentFixture<GenescomponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenescomponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenescomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
