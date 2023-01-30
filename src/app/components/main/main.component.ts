import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {MqttListenerService} from '../../services/mqtt-listener.service';
import {LightingObject} from '../../models/lighting-object';
import '@cds/core/icon/register.js';
import { ClarityIcons, sunIcon, moonIcon, banIcon } from '@cds/core/icon';
import {MqttService} from 'ngx-mqtt';

ClarityIcons.addIcons(sunIcon, moonIcon, banIcon);

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  lights: Map<string, LightingObject> = new Map();
  rooms: Map<string, Array<LightingObject>> = new Map();
  constructor(private cdr: ChangeDetectorRef, private mqttService: MqttService, private mqttListenerService: MqttListenerService) { }

  ngOnInit(): void {
    this.mqttListenerService.listenJSON<LightingObject>('housebridge/dimming_groups/+/info')
      .subscribe(a => {
        let namer = a.payload.name;
        if (!a.payload.name) {
          namer = 'Unknown | ' + a.topic
            .split('housebridge/dimming_groups/')[1]
            .split('/info')[0];
        }
        const segs = namer.split(' | ');
        const room = segs[0];
        const light = new LightingObject(a.payload.idx, segs[1], a.topic.split('/info')[0]);
        if (this.rooms.has(room)) {
          const lights = this.rooms.get(room);
          this.rooms.set(room, [...lights, light]);
        } else {
          this.rooms.set(room, [light]);
        }
        this.cdr.detectChanges();
      });
  }

  on(light: LightingObject): void {
    const topic = light.topic + '/level';
    this.doPub(topic, '1024');
  }

  dim(light: LightingObject): void {
    const topic = light.topic + '/level';
    this.doPub(topic, '10');
  }

  off(light: LightingObject): void {
    const topic = light.topic + '/level';
    this.doPub(topic, '0');
  }

  doPub(topic, message) {
    console.log('Setting \'' + topic + '\' to \'' + message + '\'');
    this.mqttService.publish(topic, message)
      .subscribe();
  }
  onRoom(lightingObjects: Array<LightingObject>) {
    lightingObjects.forEach(light => this.on(light));
  }

  dimRoom(lightingObjects: Array<LightingObject>) {
    lightingObjects.forEach(light => this.dim(light));
  }

  offRoom(lightingObjects: Array<LightingObject>) {
    lightingObjects.forEach(light => this.off(light));
  }


}
