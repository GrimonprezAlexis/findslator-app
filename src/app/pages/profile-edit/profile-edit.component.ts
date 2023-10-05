import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError } from 'rxjs';
import { UserService } from 'src/app/_core/services';
import { User, UserAuth, UserProfile } from 'src/app/_core/types';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss'],
})
export class ProfileEditComponent implements OnInit {
  userForm!: FormGroup;
  currentStep: number = 1;

  steps: string[] = [
    'Informations personnelles',
    'Informations professionnelles',
    'Cursus académique',
    'Expérience professionnelle',
    'Documents requis',
    'Confirmation des informations',
  ];

  successMessage!: string;
  errorMessage!: string;

  constructor(private fb: FormBuilder, public userService: UserService) {}

  ngOnInit() {
    this.userForm = this.fb.group({
      // ... Informations personnel ...
      lastName: ['', Validators.required],
      firstName: ['', Validators.required],
      picture: [this.userService.getUser().picture], //todo if require
      email: [
        this.userService.getUser().email,
        [Validators.required, Validators.email],
      ],
      // password: [
      //   '',
      //   [
      //     Validators.required,
      //     Validators.minLength(8),
      //     Validators.pattern(
      //       '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])'
      //     ),
      //   ],
      // ],
      gender: ['', Validators.required],
      nationality: [''],
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
      tariffs: this.fb.array([]),

      // ... Cursus
      hasDiploma: ['false', Validators.required],
      diplomaDetails: [''],
      diplomaName: [''],
      graduationYear: [''],
      issuedBy: [''],
      otherDiplomas: this.fb.array([]),

      // ... Experiences professionnel ...
      experiences: this.fb.array([]),
      documents: this.fb.array([]),
      confirmation: this.fb.group({
        informationAccurate: [false, Validators.requiredTrue],
        acceptTermsAndConditions: [false, Validators.requiredTrue],
      }),
    });
  }

  nextStep(step: number) {
    this.currentStep = step;
  }

  get tariffs() {
    return this.userForm.get('tariffs') as FormArray;
  }

  // Helper method to add a pricing entry
  addPrice() {
    const tariffFormGroup = this.fb.group({
      service: ['', Validators.required],
      unit: ['', Validators.required],
      price: [0, Validators.required],
      currency: ['', Validators.required],
      minPrice: [0, Validators.required],
    });
    this.tariffs.push(tariffFormGroup);
  }

  removePrice(index: number) {
    this.tariffs.removeAt(index);
  }

  /**
   *
   * DIPLOMES
   *
   *
   */
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

  /**
   *
   * EXPERIENCES
   *
   *
   */
  get experiences() {
    return this.userForm.get('experiences') as FormArray;
  }

  addExperience() {
    const experienceFormGroup = this.fb.group({
      title: ['', Validators.required],
      company: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      description: ['', Validators.required],
    });

    this.experiences.push(experienceFormGroup);
  }

  removeExperience(index: number) {
    this.experiences.removeAt(index);
  }

  /**
   *
   * DOCUMENTS
   *
   *
   */
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
      this.AddUserInfo(this.userForm.value);
    }
  }

  //Add Form info and update the user by _id from this.user._id
  private AddUserInfo(userFormValue: User<UserProfile>) {
    if (this.userService.getUser().auth0Id) {
      const auth0Id = this.userService.getUser().auth0Id;
      return this.userService.updateUser(auth0Id, userFormValue);
    } else {
      //Add error from modal
      //With success and error
      console.error('Error creating user:');
      this.errorMessage = 'Error updating user. Please try again.';
      return null;
    }
  }
}
