import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { DobService } from "../../services/dob/dob.service";

@Component({
  selector: "app-dob",
  templateUrl: "./dob.component.html",
  styleUrls: ["./dob.component.css"]
})
export class DobComponent implements OnInit {
  currentYear = new Date().getFullYear();
  dateForm = new FormGroup({
    date: new FormControl(new Date("15/06/1991")),
    time: new FormControl("14:45")
  });
  minDate: Date;
  maxDate: Date;

  constructor(private dobService: DobService) {
    this.minDate = new Date(this.currentYear - 100, 0, 1);
    this.maxDate = new Date(this.currentYear - 1, 0, 1);
    const dobStored = dobService.getDob();
    const [hours, minutes] = dobStored.toLocaleTimeString().split(":");
    console.log(dobStored);
    this.dateForm = new FormGroup({
      date: new FormControl(dobStored),
      time: new FormControl(`${hours}:${minutes}`)
    });
  }
  ngOnInit(): void {}

  onSubmit() {
    const d = this.buildDate(this.dateForm.value);
    this.dobService.setDob(d);
  }

  buildDate({ date, time }) {
    const [hours, minutes] = time.split(":");
    const finalDate = new Date(date);
    finalDate.setHours(hours);
    finalDate.setMinutes(minutes);
    return finalDate;
  }
}
