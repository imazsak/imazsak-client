import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ThemePalette} from '@angular/material';

@Component({
  selector: 'app-top-right-button',
  templateUrl: './top-right-button.component.html',
  styleUrls: ['./top-right-button.component.scss']
})
export class TopRightButtonComponent implements OnInit {

  @Input() color: ThemePalette = 'primary';
  @Input() icon: string;
  @Output() click = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

}
