import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {GroupService} from '../group.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  groups = [];

  constructor(public groupService: GroupService) {
  }

  ngOnInit() {
    this.groupService.listGroups().subscribe(groups => this.groups = groups);
  }

}
