import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyBrl',
  standalone: true,
})
export class CurrencyBrlPipe implements PipeTransform {
  transform(value: number, showCents = false): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: showCents ? 2 : 0,
      maximumFractionDigits: showCents ? 2 : 0,
    }).format(value);
  }
}
