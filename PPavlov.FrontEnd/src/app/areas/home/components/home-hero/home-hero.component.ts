import { Component, OnInit } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faFacebookF, faInstagram, faTwitter, faGithub, faLinkedinIn } from '@fortawesome/free-brands-svg-icons'

@Component({
  selector: 'app-home-hero',
  templateUrl: './home-hero.component.html',
  styleUrls: ['./home-hero.component.scss']
})
export class HomeHeroComponent implements OnInit {

  constructor(private _library: FaIconLibrary) {
    _library.addIcons(faFacebookF, faInstagram, faTwitter, faGithub, faLinkedinIn);
   }

  ngOnInit(): void {
  }
}
