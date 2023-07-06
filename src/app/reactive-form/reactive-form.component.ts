import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup,Validators } from '@angular/forms';

interface phoneFormGroup {
  phone: FormControl<string | null>;
}

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css']
})
export class ReactiveFormComponent {

  userModel: FormGroup;

  nameControl = new FormControl('', [Validators.required]);
  surnameControl = new FormControl('', [Validators.required]);
  emailControl = new FormControl('', [Validators.required, Validators.email]);  
  usernameControl = new FormControl('', [Validators.required, Validators.minLength(4)]);
  birthdateControl = new FormControl('');
  genderControl = new FormControl('F');

  //Patron que controla que se debe tener al menos una mayuscula, al menos una minuscula, al menos un digito y como minimo 8 caracteres
  passwordControl = new FormControl('', [Validators.required,Validators.pattern('^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\\D*\\d)[A-Za-z\\d!$%@#£€*?&]{8,}$')]);
  
  phoneFormArray = new FormArray<FormGroup<phoneFormGroup>>([
    new FormGroup({
      phone: new FormControl(''),
    }),
  ]);

  formValid: boolean = false;
  showPass: boolean = false;

  constructor(
    private fb: FormBuilder
  ) { 
    this.userModel = this.fb.group({
      name: this.nameControl,
      surname: this.surnameControl,
      birthdate: this.birthdateControl,
      email: this.emailControl,
      gender: this.genderControl,
      phones: this.phoneFormArray,
      username: this.usernameControl,
      password: this.passwordControl
    });
  }

  addPhoneControl(): void {
    this.phoneFormArray.push(
      this.fb.group({
        phone: [''],
      })
    )
  }

  deletePhoneFormArray(index: number): void {
    this.phoneFormArray.removeAt(index);
  }

  showPassword(): void {
    this.showPass = !this.showPass;
  }

  back(): void{
    this.formValid = !this.formValid;
  }

  onSubmit(){
    if(this.userModel.valid){
      this.formValid = true;
    }
  }
}
