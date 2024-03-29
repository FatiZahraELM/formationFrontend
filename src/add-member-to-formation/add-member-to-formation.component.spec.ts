import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMemberToFormationComponent } from './add-member-to-formation.component';

describe('AddMemberToFormationComponent', () => {
  let component: AddMemberToFormationComponent;
  let fixture: ComponentFixture<AddMemberToFormationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddMemberToFormationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddMemberToFormationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
