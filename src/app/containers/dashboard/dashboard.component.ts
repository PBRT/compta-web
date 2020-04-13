import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { ProfileService } from "../../services/profile/profile.service";
import { EventsService } from "../../services/events/events.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  constructor(
    private router: Router,
    private profileService: ProfileService,
    private eventsService: EventsService
  ) {
    if (profileService.isEmpty()) {
      router.navigate(["/dob"]);
    }
  }

  ngOnInit(): void {
    this.getEvents();
  }

  getEvents() {
    const currentDate = new Date();
    const dob = this.profileService.getDob();
    const computedEvents = this.eventsService
      .getUnits()
      .reduce((acc, i) => acc.concat(i.events), [])
      .map(item => Object.assign({}, item, { date: item.getTimeTo(dob) }))
      .sort((a, b) => a.date - b.date);

    const upcomingEvents = [];
    const pastEvents = [];
    for (const ev of computedEvents) {
      if (ev.date > currentDate) {
        upcomingEvents.push(ev);
      } else {
        pastEvents.push(ev);
      }
    }

    return {
      upcomingEvents,
      pastEvents
    };
  }
}
