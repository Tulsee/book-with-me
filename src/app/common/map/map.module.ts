import { NgModule } from "@angular/core";
import { MapComponent } from "./map.component";
import { AgmCoreModule } from "@agm/core";
import { MapService } from "./map.service";
import { CamelizePipe } from "ngx-pipes";

@NgModule({
  declarations: [MapComponent],
  imports: [
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyC8ERVkND2Lrrd-OvTlueHhZq2liTShthc"
      //apiKey: "AIzaSyCW9YfF1gVRFmpIPI00Ok52s9HgqNXd9_8"
    })
  ],
  exports: [MapComponent],
  providers: [MapService, CamelizePipe]
})
export class MapModule {}
