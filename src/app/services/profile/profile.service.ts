import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class ProfileService {
  dob: Date = null;
  name: string = null;
  constructor() {}

  getDob(): Date {
    return this.dob;
  }

  setDob(date: Date): void {
    this.dob = date;
    localStorage.setItem("compta__dob", date.toString());
  }

  getName(): string {
    return this.name;
  }

  setName(name): void {
    this.name = name;
    localStorage.setItem("compta__name", name);
  }

  isEmpty(): boolean {
    return this.dob == null || this.name == null;
  }
}
