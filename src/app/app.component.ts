import {ChangeDetectionStrategy, Component} from '@angular/core';
import {
  faBath,
  faBoltLightning,
  faHome,
  faHotTub,
  faLightbulb,
  faMusic,
  faPersonShelter,
  faTv,
  faVideo
} from '@fortawesome/free-solid-svg-icons';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'House App';
  lightbulb = faLightbulb;
  musicNote = faMusic;
  display = faTv;
  home = faHome;
  hotTub = faHotTub;
  bath = faBath;
  activeRoute: ActivatedRoute;
  faCctv = faVideo;
  faLight = faLightbulb;
  faRoom = faPersonShelter;
  collapsed = true;
  faLightning = faBoltLightning;


  constructor() {
  }
}
