import { DeviceService } from './../shared/services/device.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { Device } from '../shared/interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.scss']
})
export class DeviceListComponent implements OnInit {

  devices: Device[]
  pSub: Subscription

  constructor(
    private router: Router,
    private auth: AuthService,
    private deviceService: DeviceService
  ) { }

  ngOnInit(): void {
    this.pSub = this.deviceService.getAll().subscribe((device)=>{
      this.devices = device
    })
  }

  ngOnDestroy(): void {
    if (this.pSub) {
      this.pSub.unsubscribe()
    }
  }

  logout(event: Event) {
    event.preventDefault();
    this.auth.logout();
    this.router.navigate(['/']);
  }

}
