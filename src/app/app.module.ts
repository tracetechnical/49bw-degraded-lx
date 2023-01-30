import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {RouterModule, Routes} from '@angular/router';
import {ClarityModule} from '@clr/angular';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {IMqttServiceOptions, MqttModule} from 'ngx-mqtt';
import {MainComponent} from './components/main/main.component';

const routes: Routes = [
  {path: 'home', component: MainComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'}, // redirect to `first-component`
];

const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
  hostname: 'housebridge',
  port: 8083,
  protocol: 'ws',
  path: '/mqtt',
};

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
  ],
  imports: [
    ClarityModule,
    BrowserModule,
    FormsModule,
    NoopAnimationsModule,
    FontAwesomeModule,
    RouterModule.forRoot(routes, {relativeLinkResolution: 'legacy'}),
    MqttModule.forRoot(MQTT_SERVICE_OPTIONS),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
