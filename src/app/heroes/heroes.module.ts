import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeroesRoutingModule } from './heroes-routing.module';
import { HeroComponent } from './pages/hero/hero.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { ListComponent } from './pages/list/list.component';
import { NewHeroComponent } from './pages/new-hero/new-hero.component';
import { SearchHeroComponent } from './pages/search-hero/search-hero.component';


@NgModule({
  declarations: [
    HeroComponent,
    LayoutComponent,
    ListComponent,
    NewHeroComponent,
    SearchHeroComponent
  ],
  imports: [
    CommonModule,
    HeroesRoutingModule
  ]
})
export class HeroesModule { }
