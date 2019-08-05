import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {filter} from 'rxjs/operators';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private route: ActivatedRoute, private authService: AuthService) {
  }

  ngOnInit() {
    this.route.queryParams.pipe(
      filter(params => params.token),
      filter(params => params.refresh_token)
    ).subscribe(params => {
      this.authService.setTokenData(params.token, params.refresh_token);
    });
    this.route.queryParams.pipe(
      filter(params => params.error)
    ).subscribe(params => {
      const error = params.error;
      // erro message
    });
  }

}
