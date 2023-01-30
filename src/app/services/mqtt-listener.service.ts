import { Injectable } from '@angular/core';
import {MqttService} from 'ngx-mqtt';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MqttListenerService {
  constructor(private mqttService: MqttService) {}

  listenString(topic: string): Observable<string> {
    return this.mqttService.observeRetained(topic)
      .pipe(
        map(msg => msg.payload.toString())
      );
  }

  listenJSON<T>(topic: string): Observable<MqttMessage<T>> {
    return this.mqttService.observeRetained(topic)
      .pipe(
        map(msg => new MqttMessage<T>(msg.topic, JSON.parse(msg.payload.toString())))
      );
  }
}

export class MqttMessage<T> {
  topic: string;
  payload: T;

  constructor(topic: string, payload: T) {
    this.topic = topic;
    this.payload = payload;
  }
}
