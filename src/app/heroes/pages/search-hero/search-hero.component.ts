import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { FormControl } from '@angular/forms';
import { Hero } from '../../interfaces/hero.interface';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-search-hero',
  templateUrl: './search-hero.component.html',
  styles: [
  ]
})
export class SearchHeroComponent implements OnInit {

  public searchInput = new FormControl('');
  public heroes:Hero[] = [];
  public selectedHero:Hero | undefined;

  constructor( private heroesService:HeroesService ) { }

  ngOnInit(): void {
  }

  searchHero(){
    const query = this.searchInput.value || '';
   /*  console.log(query); */
    this.heroesService.getSuggestions(query)
      .subscribe( heroes => this.heroes = heroes );
  }

  onSelectionChange( event: MatAutocompleteSelectedEvent ){
    if(!event.option.value){
      this.selectedHero = undefined;
      return;
    }
    this.searchInput.setValue(event.option.value.superhero);
    this.selectedHero = event.option.value;
  }

}
