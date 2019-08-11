import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../shared/auth.service";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "bwm-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"]
})
export class RegisterComponent implements OnInit {
  formData: any = {};
  mistake: any[] = [];
  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() { }

  register() {
    this.auth.register(this.formData).subscribe(
      () => {
        this.router.navigate(["/login", { registered: "success" }]);
      },
      errorResponse => {
        //debugger;
        // console.log(errorResponse.error.errors);
        this.mistake = errorResponse.error.errors;
        //this.errors = ["sdscsdsfsfsf"];
      }
    );
  }
}
