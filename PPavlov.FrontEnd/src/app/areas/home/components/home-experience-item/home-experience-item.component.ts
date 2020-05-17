import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-home-experience-item',
  templateUrl: './home-experience-item.component.html',
  styleUrls: ['./home-experience-item.component.scss']
})
export class HomeExperienceItemComponent {
  @Input() public timeline: string;
  @Input() public logoSrc: string;
  @Input() public logoAlt: string;
  @Input() public description: string;
  @Input() public announcement: string;
  @Input() public announcementHref: string;
}
