import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { ProfileService } from "../../services/profile/profile.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  constructor(private router: Router, private profileService: ProfileService) {
    if (profileService.isEmpty()) {
      router.navigate(["/dob"]);
    }
  }

  ngOnInit(): void {}
}
