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
}
