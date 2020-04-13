import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormControl,
  ValidatorFn,
  AbstractControl,
  Validators
} from "@angular/forms";

import { ProfileService } from "../../services/profile/profile.service";

export function invalidDateValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const d = control.value;
    const isInvalid =
      Object.prototype.toString.call(d) !== "[object Date]" ||
      (Object.prototype.toString.call(d) === "[object Date]" &&
        Number.isNaN(d.getTime()));

    return isInvalid ? { invalidDate: { value: control.value } } : null;
  };
}

@Component({
  selector: "app-dob",
  templateUrl: "./dob.component.html",
  styleUrls: ["./dob.component.css"]
})
export class DobComponent implements OnInit {
  currentYear = new Date().getFullYear();
  dateForm = new FormGroup({
    date: new FormControl(new Date("15/06/1991")),
    time: new FormControl("14:45"),
    name: new FormControl("")
  });
  minDate: Date;
  maxDate: Date;

  constructor(private profileService: ProfileService, private router: Router) {
    this.minDate = new Date(this.currentYear - 100, 0, 1);
    this.maxDate = new Date(this.currentYear - 1, 0, 1);
    const nameStored = profileService.getName();
    const dobStored = profileService.getDob();
    const timeStored = dobStored == null ? null : this.buildTime(dobStored);
    this.dateForm = new FormGroup({
      date: new FormControl(dobStored, [
        Validators.required,
        invalidDateValidator()
      ]),
      time: new FormControl(timeStored, [Validators.required]),
      name: new FormControl(nameStored, [Validators.required])
    });
  }

  buildTime(date: Date) {
    const [hour, mins] = date.toLocaleTimeString().split(":");
    return `${hour}:${mins}`;
  }

  ngOnInit(): void {}

  onSubmit() {
    const newName = this.dateForm.value.name;
    const newDate = this.buildDate(this.dateForm.value);
    console.log(this.dateForm);
    this.profileService.setDob(newDate);
    this.profileService.setName(newName);
    this.router.navigate(["/dashboard"]);
  }

  buildDate({ date, time }) {
    const [hours, minutes] = time.split(":");
    const finalDate = new Date(date);
    finalDate.setHours(hours);
    finalDate.setMinutes(minutes);
    return finalDate;
  }
}
