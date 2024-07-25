import { Component } from '@angular/core';

@Component({
  selector: 'app-new-hero',
  templateUrl: './new-hero.component.html',
  styles: [
  ]
})
export class NewHeroComponent {


  public publishers = [
    { id: 'DC Comics', desc: 'DC - Comics' },
    { id: 'Marvel Comics', desc: 'Marvel - Comics' },
  ];

}
