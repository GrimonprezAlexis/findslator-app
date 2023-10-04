import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/_core/services';
import { UserAuth, UserProfile } from 'src/app/_core/types';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss'],
})
export class ProfileEditComponent implements OnInit {
  userForm!: FormGroup;
  currentStep: number = 1;
  user!: UserAuth<UserProfile>;

  steps: string[] = [
    'Informations personnelles',
    'Informations professionnelles',
    'Cursus académique',
    'Expérience professionnelle',
    'Documents requis',
    'Confirmation des informations',
  ];

  constructor(private fb: FormBuilder, private _userService: UserService) {}

  ngOnInit() {
    this.user = this._userService.getUser();
    console.log('>> user from profile edit', this.user);

    this.userForm = this.fb.group({
      // ... Informations personnel ...
      lastName: ['', Validators.required],
      firstName: ['', Validators.required],
      photo: [''],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(
            '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])'
          ),
        ],
      ],
      gender: ['', Validators.required],
      nationality: ['', Validators.required],
      countryOfResidence: ['', Validators.required],
      city: [''],
      linkedin: [''],
      website: [''],
      bio: [''],

      // ... Informations professionnel ...
      services: [''],
      status: ['', Validators.required],
      companySize: [''],
      nativeLanguage: [[]],
      workingLanguages: [[]],
      experienceYear: [''],
      specializations: [''],
      translationTools: [''],
      translationToolsDetails: [''],
      pricing: this.fb.array([]),

      // ... Cursus
      diploma: ['false'],
      diplomaDetails: [''],
      diplomaName: [''],
      graduationYear: [''],
      issuedBy: [''],
      otherDiplomas: this.fb.array([]),

      // ... Experiences professionnel ...
      experience: this.fb.array([]),
      documents: this.fb.array([]),
      confirmation: this.fb.group({
        informationAccurate: [false, Validators.requiredTrue],
        acceptTermsAndConditions: [false, Validators.requiredTrue],
      }),
    });
    //this.addPrice();
    //this.addExperience();
    //this.addDocument();
  }

  nextStep(step: number) {
    this.currentStep = step;
  }

  get pricingControls() {
    return (this.userForm.get('pricing') as FormArray).controls;
  }

  // Helper method to add a pricing entry
  addPrice() {
    const pricingArray = this.userForm.get('pricing') as FormArray;
    if (pricingArray) {
      pricingArray.push(
        this.fb.group({
          service: [''],
          unit: [''],
          price: [''],
          currency: [''],
          minPrice: [''],
        })
      );
    }
  }

  removePrice(index: number) {
    const pricingArray = this.userForm.get('pricing') as FormArray;
    if (pricingArray) {
      pricingArray.removeAt(index);
    }
  }

  get otherDiplomas() {
    return this.userForm.get('otherDiplomas') as FormArray;
  }
  addAnotherDiploma() {
    this.otherDiplomas.push(
      this.fb.group({
        diplomaDetails: [''],
        diplomaName: [''],
        graduationYear: [''],
        issuedBy: [''],
      })
    );
  }

  removeDiploma(index: number) {
    this.otherDiplomas.removeAt(index);
  }

  get experienceControls() {
    return this.userForm.get('experience') as FormArray;
  }

  addExperience() {
    this.experienceControls.push(
      this.fb.group({
        title: [''],
        company: [''],
        startDate: [''],
        endDate: [''],
        description: [''],
      })
    );
  }

  removeExperience(index: number) {
    this.experienceControls.removeAt(index);
  }

  get documentControls() {
    return this.userForm.get('documents') as FormArray;
  }

  addDocument() {
    this.documentControls.push(
      this.fb.group({
        documentType: [''],
        documentName: [''],
        file: [''],
      })
    );
  }

  removeDocument(index: number) {
    this.documentControls.removeAt(index);
  }

  submitForm() {
    if (this.userForm.valid) {
      // Traitement des données du formulaire
      console.log(this.userForm.value);
    }
  }

  private AddUserInfo() {
    //Add Form info and update the user by _id from this.user._id
    // return this._userService.getUser('email', response?.email).pipe(
    //   catchError((error) => {
    //     console.error('Error:', error);
    //     const newUser: UserAuth<undefined> = {
    //       roles: [this.userRole],
    //       email: response?.email,
    //       picture: response?.picture,
    //       auth0Id: response?.sub,
    //       updated_at:
    //         response?.updated_at || this._helperService.getCurrentISODate(),
    //     };
    //     return this._userService
    //       .createUser(newUser)
    //       .pipe(
    //         switchMap((response) =>
    //           this._userService.getUser('id', response.insertedId)
    //         )
    //       );
    //   })
    // );
  }
}
