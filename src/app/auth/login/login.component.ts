import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from "../shared/auth.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "bwm-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  mistake: any[] = [];
  notifyMessage: string = "";
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.initForm();
    this.route.params.subscribe(params => {
      if (params["registered"] == "success") {
        //debugger;
        this.notifyMessage =
          "You have been successfully registered you can login now";
      }
    });
  }
  initForm() {
    this.loginForm = this.fb.group({
      email: [
        "",
        [
          Validators.required,
          Validators.pattern(
            "^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$"
          )
        ]
      ],
      password: ["", Validators.required]
    });
  }
  isInvalidForm(fieldName): boolean {
    return (
      this.loginForm.controls[fieldName].invalid &&
      (this.loginForm.controls[fieldName].dirty ||
        this.loginForm.controls[fieldName].touched)
    );
  }
  isRequiredForm(fieldName): boolean {
    return this.loginForm.controls[fieldName].errors.required;
  }
  login() {
    // debugger;

    //console.log(this.loginForm.value);
    this.auth.login(this.loginForm.value).subscribe(
      token => {
        //debugger;
        this.router.navigate(["/rentals"]);
      },
      errorResponse => {
        //debugger;
        console.log(errorResponse);
        this.mistake = errorResponse.error.errors;
        //this.mistake = errorResponse.error;
      }
    );
  }
}
