import {Month} from '../models/mes.model';
import {FormGroup} from '@angular/forms';

export class Utils {

  /**
   * Função que retorna quantidade de dias entre duas datas
   */
  public static getQtdDayByDtinicialAndDtFinal(dataInicial: Date, dataFinal: Date): number {

    const start = new Date(dataInicial);
    const end = new Date(dataFinal);
    return parseInt(((end.getTime() - start.getTime()) / 1000 / 60 / 60 / 24).toFixed(2));
  }


  /**
   * Calcula percentual de um valor em relação ao seu total
   */
  public static getPercent(partValue: number, totalValue: number): number {
    return parseInt(((partValue * 100) / totalValue).toFixed(2));
  }

  /**
   * Reduz nome completo para nome e sobrenome
   */
  public static resumeName(name: String): string {
    const nomes = name.split(' ');
    return nomes[0] + ' ' + nomes[nomes.length - 1];
  }


  /**
   * Função que retorna o Lista de anos desde 2015 até 2 anos posteriores a ano atual
   */
  public static getListYear(): string[] {

    const years: number[] = [];


    const yearRange = 2 + new Date().getFullYear() - 2015;


    for (let _i = 0; _i <= yearRange; _i++) {
      years.push(2015 + _i);
    }
    return years.map(String);
  }

  /**
   * Retorna a descrição do mês de acordo com o valor referênte
   */
  public static getMesByReferencia(mesRef: number): string {
    switch (mesRef) {
      case 1:
        return 'Janeiro';
      case 2:
        return 'Fevereiro';
      case 3:
        return 'Março';
      case 4:
        return 'Abril';
      case 5:
        return 'Maio';
      case 6:
        return 'Junho';
      case 7:
        return 'Julho';
      case 8:
        return 'Agosto';
      case 9:
        return 'Setembro';
      case 10:
        return 'Outubro';
      case 11:
        return 'Novembro';
      case 12:
        return 'Dezembro';
    }
  }


  public static validateAllFormFields(form: FormGroup) {
    Object.keys(form.controls).forEach(field => {
      const control = form.get(field);
      control.markAsTouched({onlySelf: true});
    });
  }

  public static getMeses(): Month[] {
    const mes: Month[] = [
      new Month('01', 'Janeiro'),
      (new Month('02', 'Fevereiro')),
      (new Month('03', 'Março')),
      (new Month('04', 'Abril')),
      (new Month('05', 'Maio')),
      (new Month('06', 'Junho')),
      (new Month('07', 'Julho')),
      (new Month('08', 'Agosto')),
      (new Month('09', 'Setembro')),
      (new Month('10', 'Outubro')),
      (new Month('11', 'Novembro')),
      (new Month('12', 'Dezembro'))];

    return mes;
  }
}
