import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberFormationsComponent } from './member-formations.component';

describe('MemberFormationsComponent', () => {
  let component: MemberFormationsComponent;
  let fixture: ComponentFixture<MemberFormationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MemberFormationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MemberFormationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
