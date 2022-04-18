import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home/home.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { YourPantriesComponent } from './your-pantries/your-pantries.component';
import { GroceryListComponent } from './grocery-list/grocery-list.component';
import { ItemsComponent } from './items/items.component';
import { JwtInterceptor } from './_interceptors/jwt.interceptor';
import { NotificationsComponent } from './notifications/notifications.component';
import { SettingsMainComponent } from './settings/settings-main/settings-main.component';
import { ProfileSettingsComponent } from './settings/profile-settings/profile-settings.component';
import { AppSettingsComponent } from './settings/app-settings/app-settings.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent,
    NotFoundComponent,
    YourPantriesComponent,
    GroceryListComponent,
    ItemsComponent,
    NotificationsComponent,
    SettingsMainComponent,
    ProfileSettingsComponent,
    AppSettingsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
