import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() title: string;
  isAdmin = false;

  constructor(public authService: AuthService) {
  }

  ngOnInit() {
    this.authService.isAdmin().subscribe(isAdmin => this.isAdmin = isAdmin);
  }

}
