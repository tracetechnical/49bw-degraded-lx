const mainUrl = 'http://cctv.io.home/';
const apiKey = 'crzrY5Q2q8QIc27dWtAZ8ByChKQZKV';
export class CameraList {
  static streamRoot = mainUrl + apiKey + '/mp4/cctv/';
  static mjpegRoot = mainUrl + apiKey + '/mjpeg/cctv/';
  static cameras = [
    {name: 'Front Camera', url: CameraList.streamRoot + 'frontCamera/s.mp4'},
    {name: 'Rear Camera',  url: CameraList.streamRoot + 'rearCamera/s.mp4'},
    {name: 'Garage Camera',  url: CameraList.mjpegRoot + 'garageOutsideCamera'},
  ];
}
