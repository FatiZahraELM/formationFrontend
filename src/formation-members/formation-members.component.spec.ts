import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormationMembersComponent } from './formation-members.component';

describe('FormationMembersComponent', () => {
  let component: FormationMembersComponent;
  let fixture: ComponentFixture<FormationMembersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormationMembersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormationMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
