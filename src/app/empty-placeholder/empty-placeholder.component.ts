import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-empty-placeholder',
  templateUrl: './empty-placeholder.component.html',
  styleUrls: ['./empty-placeholder.component.scss']
})
export class EmptyPlaceholderComponent implements OnInit {

  @Input() icon = 'fas fa-info-circle';
  @Input() text = '';

  constructor() {
  }

  ngOnInit() {
  }

}
