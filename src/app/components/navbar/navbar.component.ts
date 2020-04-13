import { Component, OnInit } from "@angular/core";
import { ProfileService } from "../../services/profile/profile.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit {
  constructor(public profileService: ProfileService) {}

  ngOnInit(): void {}
}
