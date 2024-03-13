import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import ValidateForm from 'src/app/helpers/formvalidate';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";
  signupform!: FormGroup;
  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router){ }

  onSignUp(){
    if(this.signupform.valid){
      console.log(this.signupform.value);
      this.auth.signUp(this.signupform.value)
      .subscribe({
        next: (res=>{
          alert(res.message);
          this.signupform.reset();
          this.router.navigate(['login']);
        }),
        error: (err=>{
          alert(err?.error.message);
        })
      })
    }
    else{
      ValidateForm.validateAllFormField(this.signupform);
    }
  }

  ngOnInit(): void{
    this.signupform = this.fb.group({
      firstname: ['',Validators.required],
      lastname: ['',Validators.required],
      email: ['',Validators.required],
      username: ['',Validators.required],
      password: ['',Validators.required]
    })
  }

  hideShowPassword(){
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password"; 
  }
}
