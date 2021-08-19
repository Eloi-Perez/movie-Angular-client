import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileDeleteCardComponent } from './user-profile-delete-card.component';

describe('UserProfileDeleteCardComponent', () => {
  let component: UserProfileDeleteCardComponent;
  let fixture: ComponentFixture<UserProfileDeleteCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserProfileDeleteCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileDeleteCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
