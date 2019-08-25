import {Component, OnInit} from '@angular/core';
import {ImazsakService} from '../imazsak.service';

@Component({
  selector: 'app-my-prayers',
  templateUrl: './my-prayers.component.html',
  styleUrls: ['./my-prayers.component.scss']
})
export class MyPrayersComponent implements OnInit {

  groups = [];
  myPrayers = [];

  constructor(public imazsak: ImazsakService) {
  }

  ngOnInit() {
    this.imazsak.listGroups().subscribe(groups => this.groups = groups);
    this.imazsak.listMyPrayers().subscribe(myPrayers => this.myPrayers = myPrayers);
  }

}
