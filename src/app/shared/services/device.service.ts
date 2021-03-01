import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Device } from '../interface';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  constructor(private http: HttpClient){}

  getAll(): Observable<Device[]> {
    return this.http.post(
      `${environment.nUrl}/device/metering_devices`,
      {
        "page":1,
        "last_page":0,
        "sort_field":"id",
        "sort":"desc",
        "search_string":null,
        "device_state":"all",
        "is_archived":false,
        "paginate":true,
        "append_fields":[
          "active_polling",
          "attributes",
          "tied_point"
        ],
        "per_page":10
      })
    .pipe(
      map((response: any) => {
        console.log(response)
        const metering_devices = response.data.metering_devices.data
        return metering_devices.map((device)=>({
          id: device.id,
          name: device.name,
          last_active: new Date(device.last_active)
        }))
      })
    )
  }
}
