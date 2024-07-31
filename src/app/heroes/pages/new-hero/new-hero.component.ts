import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';

import { Hero, Publisher } from '../../interfaces/hero.interface';
import { filter, switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
@Component({
  selector: 'app-new-hero',
  templateUrl: './new-hero.component.html',
  styles: [
  ]
})
export class NewHeroComponent implements OnInit {


  constructor(
    private heroService: HeroesService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    if(!this.router.url.includes('edit')) return;

    this.activateRoute.params
      .pipe(
         switchMap( ({id}) => this.heroService.getHeroById(id) ),
      ).subscribe( hero => {

        if(!hero) return this.router.navigateByUrl('/');
        this.heroForm.reset(hero);
        return;
      } );

  }

  public heroForm = new FormGroup({

    id:               new FormControl<string>(''),
    superhero:        new FormControl<string>('',{ nonNullable: true }),
    publisher:        new FormControl<Publisher>( Publisher.DCComics ),
    alter_ego:        new FormControl(''),
    first_appearance: new FormControl(''),
    characters:       new FormControl(''),
    alt_img:          new FormControl(''),

  });


  public publishers = [
    { id: 'DC Comics', desc: 'DC - Comics' },
    { id: 'Marvel Comics', desc: 'Marvel - Comics' },
  ];


  get currentHero():Hero{
    const hero = this.heroForm.value as Hero;
    return hero;
  }


  onSubmit(){
   
    if(!this.heroForm.valid) return;

    if(this.currentHero.id){
      this.heroService.updateHero(this.currentHero)
        .subscribe( hero => {
          this.showSnackbar(`Hero ${hero.superhero} was updated`);
        });
    }else{
      this.heroService.addNewHero(this.currentHero)
        .subscribe( hero => {
          this.showSnackbar(`Hero ${hero.superhero} was created`);
          this.router.navigateByUrl(`/heroes/edit/${hero.id}`);
        });
    }

  }

  deleteHero(){
     
    if (!this.currentHero.id) return;

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        data : this.heroForm.value
    });

    /* dialogRef.afterClosed().subscribe( result =>{
        
        if(result){
          this.heroService.deleteHero(this.currentHero.id!)
            .subscribe( resp => {
              this.router.navigateByUrl('/heroes');
              this.showSnackbar(`Hero ${this.currentHero.superhero} was deleted`);
            });
          }
     }) */

        
    dialogRef.afterClosed().pipe(
      filter( (res:boolean) => res ),
      switchMap( () => this.heroService.deleteHero(this.currentHero.id!) ),
      filter( (res:boolean) => res )
    )
    .subscribe( () => {
      this.router.navigateByUrl('/heroes');
      this.showSnackbar(`Hero ${this.currentHero.superhero} was deleted`);
    });

  }

  showSnackbar(message: string){
    this.snackbar.open(message, 'ok!', {
      duration: 2500,
    })
  }


}
