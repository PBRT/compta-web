import { Component } from "@angular/core";

import { ProfileService } from "../../services/profile/profile.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "compta";

  constructor(private profileService: ProfileService) {
    // Retrieve from local storage
    const lsName = localStorage.getItem("compta__name");
    const lsDob = localStorage.getItem("compta__dob");

    if (lsName != null) {
      profileService.setName(lsName);
    }
    if (lsDob != null) {
      profileService.setDob(new Date(lsDob));
    }
  }
}
