import { NotFoundComponent } from '@/info/pages/not-found/not-found.component';
import { HeaderComponent } from '@/shared/components/header/header.component';
import { Component, inject } from '@angular/core';
import { Router, RouterOutlet, RouterLink, RouterModule, ActivationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, RouterLink, RouterModule],
  // template: '<router-outlet></router-outlet>', // Only if template is very small
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'e-commerce';
  // showHeader: boolean = true;
  // router = inject(Router);

  /**** Para obtener datos del router *****/
  // ngOnInit(): void {
  //   // Escuchar eventos de activación de rutas
  //   this.router.events
  //     .pipe(
  //       filter(event => event instanceof ActivationEnd)
  //     )
  //     .subscribe((event: ActivationEnd) => {
  //       // Verificar si el componente activado es NotFoundComponent
  //       this.showHeader = event.snapshot.component !== NotFoundComponent;
  //       // console.log('Mostrar header: ', this.showHeader);
  //     });
  // }

}
