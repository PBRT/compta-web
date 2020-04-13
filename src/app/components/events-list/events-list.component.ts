import * as moment from "moment";
import { Component, Input, OnInit } from "@angular/core";
import { IEvent } from "../../services/events/events.service";

const DEFAULT_OFFSET = 10;

@Component({
  selector: "app-events-list",
  templateUrl: "./events-list.component.html",
  styleUrls: ["./events-list.component.css"]
})
export class EventsListComponent implements OnInit {
  @Input() events: IEvent[];
  offset = DEFAULT_OFFSET;

  constructor() {}

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
}
