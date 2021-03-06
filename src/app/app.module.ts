import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./containers/app-routing/app-routing.module";
import { AppComponent } from "./containers/app/app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

// Components
import { NavbarComponent } from "./components/navbar/navbar.component";
import { EventsListComponent } from "./components/events-list/events-list.component";
import { DialogComponent } from "./components/dialog/dialog.component";

// Containers
import { DobComponent } from "./containers/dob/dob.component";
import { DashboardComponent } from "./containers/dashboard/dashboard.component";
import { MeComponent } from "./containers/me/me.component";

// UI
import { MatMenuModule } from "@angular/material/menu";
import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatTabsModule } from "@angular/material/tabs";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { MatInputModule } from "@angular/material/input";
import { ReactiveFormsModule } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatDividerModule } from "@angular/material/divider";
import { MatDialogModule } from "@angular/material/dialog";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DobComponent,
    DashboardComponent,
    EventsListComponent,
    DialogComponent,
    MeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    // Datepicker
    MatNativeDateModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    // UI
    MatMenuModule,
    MatButtonModule,
    MatToolbarModule,
    MatTabsModule,
    MatIconModule,
    MatListModule,
    MatDividerModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
