import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxSpinnerModule } from "ngx-spinner";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home/home.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { GroceryListComponent } from './grocery-list/grocery-list.component';
import { ItemsComponent } from './items/items.component';
import { JwtInterceptor } from './_interceptors/jwt.interceptor';
import { NotificationsComponent } from './notifications/notifications.component';
import { SettingsMainComponent } from './settings/settings-main/settings-main.component';
import { ProfileSettingsComponent } from './settings/profile-settings/profile-settings.component';
import { AppSettingsComponent } from './settings/app-settings/app-settings.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FooterComponent } from './footer/footer.component';
import { YourPantriesMainComponent } from './your-pantries/your-pantries-main/your-pantries-main.component';
import { NewPantryComponent } from './your-pantries/new-pantry/new-pantry.component';
import { PantryComponent } from './your-pantries/pantry/pantry.component';
import { LoadingInterceptor } from './_interceptors/loading.interceptor';
import { PantryDetailComponent } from './your-pantries/pantry-detail/pantry-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent,
    NotFoundComponent,
    GroceryListComponent,
    ItemsComponent,
    NotificationsComponent,
    SettingsMainComponent,
    ProfileSettingsComponent,
    AppSettingsComponent,
    FooterComponent,
    YourPantriesMainComponent,
    NewPantryComponent,
    PantryComponent,
    PantryDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    NgxSpinnerModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
