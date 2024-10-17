import { Component, Input, signal, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css'
})
export class CounterComponent {
  @Input({ required: true }) message: string = '';
  @Input({ required: true }) duration: number = 0;
  counter = signal(0);
  counterRef: number | undefined;

  constructor() {
    //Corre antes de renderizar el componente
    //Sólo se ejecuta una vez
    //No es aconsejable ejecutar código asíncrono
    console.log('constructor');
    console.log('-'.repeat(10));
  }

  ngOnChanges(changes: SimpleChanges) {
    //Se ejecuta antes y durante el renderizado (cuando hay cambios)
    //Sirve para hacer seguimiento de cambios
    console.log('ngOnChanges');
    console.log('-'.repeat(10));
    console.log(changes);
    // const duration = changes['duration'];
    // console.log(duration);
    if(changes.hasOwnProperty('duration')) {
      this.doSomething();
    }
  }

  ngOnInit() {
    //Se ejecuta después del renderizado
    //Sólo se ejecuta una vez
    //Ideal para ejecutar lógica asíncrona
    console.log('ngOnInit');
    console.log('-'.repeat(10));
    console.log('Message => ', this.message);
    console.log('Duration => ', this.duration);
    this.counterRef = window.setInterval(() => {
      console.log('Run interval');
      this.counter.update(value => value + 1);
    }, 1000);
  }

  ngAfterViewInit() {
    //Se ejecuta después de que se inicializa la vista del componente y la de sus hijos (renderizados)
    //Sólo se ejecuta una vez
    console.log('ngAfterViewInit-counter');
    console.log('-'.repeat(10));
  }

  ngOnDestroy() {
    //Se ejecuta justo antes de que se destruya el componente
    //Cancela la suscripción a Observables y desvincula los manejadores de eventos
    console.log('ngOnDestroy');
    console.log('-'.repeat(10));
    window.clearInterval(this.counterRef); //Detener el intervalo cuando el componente es destruido
  }

  doSomething() {
    //Se puede ejecutar lógica asíncrona
    console.log('Duration has changed');
  }
}
