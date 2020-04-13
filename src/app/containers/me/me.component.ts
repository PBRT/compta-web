import * as moment from "moment";
import { Component, OnInit } from "@angular/core";
import { EventsService } from "../../services/events/events.service";
import { ProfileService } from "../../services/profile/profile.service";

@Component({
  selector: "app-me",
  templateUrl: "./me.component.html",
  styleUrls: ["./me.component.css"]
})
export class MeComponent implements OnInit {
  constructor(
    private eventsService: EventsService,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {}

  getEvents() {
    const currentDateMoment = moment();
    const dobMoment = moment(this.profileService.getDob());
    return this.eventsService.getUnits().map(unit => ({
      unit,
      value: currentDateMoment.diff(dobMoment, unit.unit)
    }));
  }

  getEventLabel(event) {
    return `${event.value} ${event.unit.name.toLowerCase()}`;
  }

  onEventClick(event) {
    console.log("clic");
    // this.dialog.open(DialogComponent, {
    //   width: "400px",
    //   data: {
    //     title: `Your ${event.name}`,
    //     content: this.getAlertContent(event, this.isPast)
    //   }
    // });
  }
}
