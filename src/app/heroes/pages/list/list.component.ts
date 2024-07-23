import { Component, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styles: [
  ]
})
export class ListComponent implements OnInit{

  constructor( private heroService:HeroesService ) { }

  public heroes : Hero[] = [];


  ngOnInit(): void {
    this.heroService.getHeroes()
      .subscribe( heroes => this.heroes = heroes );
  }

}
