import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { AuthService, User } from '@auth0/auth0-angular';
import { catchError, switchMap } from 'rxjs/operators';
import { ModalService } from 'src/app/_core/services/modal.service';
import { HelperService } from '../../_core/services/helper.service';
import { UserService } from '../../_core/services/user.service';
import { UserAuth, UserProfile, UserRole } from '../../_core/types/user.type';
import { ExploreComponent } from '../explore/explore.component';
import { ProfileEditComponent } from '../profile-edit/profile-edit.component';

@Component({
  selector: 'app-profile-oage',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfilePageComponent implements OnInit {
  title = 'Decoded ID Token';
  user!: UserAuth<UserProfile> | null | undefined;
  private userRole: UserRole =
    (sessionStorage.getItem('userRole') as UserRole) || 'both';
  successMessage!: string;
  errorMessage!: string;

  constructor(
    private _authService: AuthService,
    private _userService: UserService,
    private _helperService: HelperService,
    public modalService: ModalService,
    private _resolver: ComponentFactoryResolver
  ) {}

  //After Auth0 login
  //Check if user exist with email if exists return user
  //Else create user with Auth0 Login info and return user
  ngOnInit(): void {
    this._authService.user$
      .pipe(switchMap((auth0User) => this.checkAndCreateUser(auth0User)))
      .subscribe({
        next: (user: UserAuth<UserProfile>) => {
          this.successMessage = `Welcome ${user.email}`;
          this.user = user;
          console.log('>>', this.user);
        },
        error: (error) => {
          console.error('Error creating user:', error);
          this.errorMessage = 'Error creating user. Please try again.';
        },
      });
  }

  private checkAndCreateUser(response: User | null | undefined) {
    return this._userService.getUser('email', response?.email).pipe(
      catchError((error) => {
        console.error('Error:', error);
        const newUser: UserAuth<undefined> = {
          roles: [this.userRole],
          email: response?.email,
          picture: response?.picture,
          auth0Id: response?.sub,
          updated_at:
            response?.updated_at || this._helperService.getCurrentISODate(),
        };
        return this._userService
          .createUser(newUser)
          .pipe(
            switchMap((response) =>
              this._userService.getUser('id', response.insertedId)
            )
          );
      })
    );
  }

  getUserLastUpdated(user: UserAuth<UserProfile>) {
    return this._helperService.formatDate(user.updated_at);
  }

  public modal$ = this.modalService.modal$;

  openExplorerInModal() {
    this.modalService.openModal(ExploreComponent, 'Explorer les tradcteurs');
  }

  openProfileInModal(title: string) {
    this.modalService.openModal(ProfileEditComponent, title);
  }
}
