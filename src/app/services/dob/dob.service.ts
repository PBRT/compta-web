import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class DobService {
  dob = new Date("11/06/1991");
  constructor() {}

  getDob() {
    return this.dob;
  }

  setDob(date) {
    this.dob = date;
  }
}
