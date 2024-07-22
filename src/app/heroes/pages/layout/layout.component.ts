import { Component } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styles: [
  ]
})
export class LayoutComponent {

  public sidebarItems = [
    { label: 'Listado', icon:'label', link: './list' },
    { label: 'Agregar', icon:'add', link: './new' },
    { label: 'Buscar', icon:'search', link: './search' },
  ]

}
