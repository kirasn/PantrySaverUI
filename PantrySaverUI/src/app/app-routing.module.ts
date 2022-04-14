import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroceryListComponent } from './grocery-list/grocery-list.component';
import { HomeComponent } from './home/home.component';
import { ItemsComponent } from './items/items.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { SettingsComponent } from './settings/settings.component';
import { YourPantriesComponent } from './your-pantries/your-pantries.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  {
    path: 'authentication', loadChildren: () => import('./Authentication/authentication.module')
      .then(m => m.AuthenticationModule)
  },
  { path: 'yourpantries', component: YourPantriesComponent },
  { path: 'grocerylist', component: GroceryListComponent },
  { path: 'items', component: ItemsComponent },
  { path: 'notifications', component: NotificationsComponent },
  { path: 'settings', component: SettingsComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '/404', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
