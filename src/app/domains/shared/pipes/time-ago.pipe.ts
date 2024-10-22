import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeAgo',
  standalone: true
})
export class TimeAgoPipe implements PipeTransform {

  transform(creationDate: string): string {
    const creationDateInstance = new Date(creationDate);
    const diffInMs = Math.abs(Date.now() - creationDateInstance.getTime()); // Diferencia en milisegundos

    const seconds = Math.floor(diffInMs / 1000);
    const minutes = Math.floor(diffInMs / (1000 * 60));
    const hours = Math.floor(diffInMs / (1000 * 60 * 60));
    const days = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    const months = Math.floor(diffInMs / (1000 * 60 * 60 * 24 * 30));
    const years = Math.floor(diffInMs / (1000 * 60 * 60 * 24 * 365));

    let elapsedTime = '';
    if (seconds < 60) {
      elapsedTime = `${seconds} segundos`;
    } else if (minutes < 60) {
      elapsedTime = `${minutes} minutos`;
    } else if (hours < 24) {
      elapsedTime = `${hours} horas`;
    } else if (days < 30) {
      elapsedTime = `${days} días`;
    } else if (months < 12) {
      elapsedTime = `${months} meses`;
    } else {
      elapsedTime = `${years} años`;
    }

    return `Creado hace ${elapsedTime}`;
  }

}
