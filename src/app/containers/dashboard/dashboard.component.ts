import { interval } from "rxjs";
import * as moment from "moment";
import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ProfileService } from "../../services/profile/profile.service";
import { EventsService } from "../../services/events/events.service";
import { DialogComponent } from "../../components/dialog/dialog.component";

const GAP = 300000; // 5 minutes in ms

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  eventDialogShown = false;
  constructor(
    private router: Router,
    private profileService: ProfileService,
    private eventsService: EventsService,
    public dialog: MatDialog
  ) {
    if (profileService.isEmpty()) {
      router.navigate(["/dob"]);
    }
  }

  ngOnInit(): void {
    this.getEvents();
    const observable = interval(5000);
    const subscription = observable.subscribe(() => this.handleEventDialog());
  }

  handleEventDialog() {
    const currentDate = new Date();
    const { upcomingEvents } = this.getEvents();
    if (
      upcomingEvents.length > 0 &&
      Math.abs(upcomingEvents[0].date.getTime() - currentDate.getTime()) <
        GAP &&
      this.eventDialogShown === false
    ) {
      this.dialog.open(DialogComponent, {
        width: "400px",
        data: {
          title: `Congratulations 👏`,
          content: `You just passed your ${upcomingEvents[0].name} at ${moment(
            upcomingEvents[0].date
          ).format("DD-MM-YYYY, HH:mm")}`
        }
      });
      this.eventDialogShown = true;
    }
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
