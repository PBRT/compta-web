import * as moment from "moment";
import { MatDialog } from "@angular/material/dialog";
import { Component, Input, OnInit } from "@angular/core";
import { IEvent } from "../../services/events/events.service";
import { DialogComponent } from "../../components/dialog/dialog.component";

const DEFAULT_OFFSET = 10;

@Component({
  selector: "app-events-list",
  templateUrl: "./events-list.component.html",
  styleUrls: ["./events-list.component.css"]
})
export class EventsListComponent implements OnInit {
  @Input() events: IEvent[];
  @Input() isPast: boolean;
  offset = DEFAULT_OFFSET;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  loadMore() {
    this.offset = this.offset + DEFAULT_OFFSET;
  }
  getEvents() {
    return this.events.slice(0, this.offset).map(event => ({
      ...event,
      formattedDate: moment(event.date).format("DD-MM-YYYY")
    }));
  }
  getAlertContent(event, isPast) {
    const currentDate = moment();
    const eventDate = moment(event.date);
    const value = moment.duration(currentDate.diff(eventDate)).humanize();
    return isPast ? `${value} ago` : `In ${value}`;
  }
  onEventClick(event) {
    this.dialog.open(DialogComponent, {
      width: "400px",
      data: {
        title: `Your ${event.name}`,
        content: this.getAlertContent(event, this.isPast)
      }
    });
  }
}
