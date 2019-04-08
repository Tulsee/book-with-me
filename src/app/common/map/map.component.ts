import { Component, OnInit, Input } from "@angular/core";
import { MapService } from "./map.service";

@Component({
  selector: "bwm-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.scss"]
})
export class MapComponent implements OnInit {
  @Input() location: string;
  isPostitionError: boolean = false;
  lat: number;
  lng: number;
  constructor(private mapService: MapService) {}

  ngOnInit() {}
  mapReadyHandler() {
    // let currentLocation = this.location;
    // if (Math.round(Math.random() * 10) > 5) {
    //   currentLocation = "fdfdvxcvdb435tdsr34fdf ";
    // }
    this.mapService.getGeoLocation(this.location).subscribe(
      coordinates => {
        this.lat = coordinates.lat;
        this.lng = coordinates.lng;
      },
      () => {
        this.isPostitionError = true;
      }
    );
  }
}
