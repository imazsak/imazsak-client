import {Component, OnInit} from '@angular/core';
import {ImazsakService} from '../imazsak.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  groups = [];

  constructor(public imazsak: ImazsakService) {
  }

  ngOnInit() {
    this.imazsak.listGroups().subscribe(groups => this.groups = groups);
  }

}
