import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import ValidateForm from 'src/app/helpers/formvalidate';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
 
  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";
  loginform!: FormGroup;
  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router){ }

  ngOnInit(): void{
    this.loginform = this.fb.group({
      username: ['',Validators.required],
      password: ['',Validators.required]
    })
  }

  hideShowPassword(){
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password"; 
  }

  onLogin(){
    if(this.loginform.valid){
      console.log(this.loginform.value);

      this.auth.login(this.loginform.value).
      subscribe({
          next:(res=>{
            alert(res.message);
            this.loginform.reset();
            this.router.navigate(['dashboard']);
          }),
          error:(err=>{
            alert(err?.error.message);
          }) 
        })
    }
    else{
      console.log("Form is not valid");

      ValidateForm.validateAllFormField(this.loginform);
      alert("FORM IS INVALID");
    }
  }

}
