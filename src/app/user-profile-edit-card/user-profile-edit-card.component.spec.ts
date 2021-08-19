import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileEditCardComponent } from './user-profile-edit-card.component';

describe('UserProfileEditCardComponent', () => {
  let component: UserProfileEditCardComponent;
  let fixture: ComponentFixture<UserProfileEditCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserProfileEditCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileEditCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
