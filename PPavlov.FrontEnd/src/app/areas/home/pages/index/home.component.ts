import { Component, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  public isExpanded: boolean;

  @ViewChild(MatDrawer)
  public drawer: MatDrawer;

  public onMouserEnter($event: MouseEvent) {
    this.isExpanded = true;
  }

  public onMouseLeave($event: MouseEvent) {
    this.isExpanded = false;
  }
}