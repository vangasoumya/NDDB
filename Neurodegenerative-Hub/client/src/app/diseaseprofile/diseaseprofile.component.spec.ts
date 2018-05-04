import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiseaseprofileComponent } from './diseaseprofile.component';

describe('DiseaseprofileComponent', () => {
  let component: DiseaseprofileComponent;
  let fixture: ComponentFixture<DiseaseprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiseaseprofileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiseaseprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
