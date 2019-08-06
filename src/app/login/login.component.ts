import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {filter} from 'rxjs/operators';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
  }

  ngOnInit() {
    this.authService.isLoggedIn().subscribe(isLoggedIn => {
      if (isLoggedIn) {
        this.router.navigate(['/home']);
      }
    });

    this.route.queryParams.pipe(
      filter(params => params.token),
      filter(params => params.refresh_token)
    ).subscribe(params => {
      this.authService.setTokenData(params.token, params.refresh_token);
      this.router.navigate(['/home']);
    });
    this.route.queryParams.pipe(
      filter(params => params.error)
    ).subscribe(params => {
      const error = params.error;
      console.error(error);
      // error message
    });
  }

}
