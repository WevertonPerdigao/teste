export class Constants {

  static readonly ATIVO = 1;

  static readonly INATIVO = 2;

  static readonly EM_ANDAMENTO = 3;

  static readonly CONCLUIDO = 4;

  static readonly APROVADO = 'APROVADO';

  static readonly RECUSADO = 'RECUSADO';

  static readonly PENDENTE = 'PENDENTE';

  static readonly EMAIL_PATTERN = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  static readonly NUMBER_PATTER = /^[0-9]*$/;

  static readonly DECIMAL_PATTERN = /^[0-9]+(.[0-9]{0,2})?$/;

  // static readonly DATE_PATTERN = /^(((((((0?[13578])|(1[02]))[\.\-/]?((0?[1-9])|([12]\d)|(3[01])))|(((0?[469])|(11))[\.\-/]?((0?[1-9])|([12]\d)|(30)))|((0?2)[\.\-/]?((0?[1-9])|(1\d)|(2[0-8]))))[\.\-/]?((\d{2})?([\d][\d]))))|((0?2)[\.\-/]?(29)[\.\-/]?(((19)|(20))?(([02468][048])|([13579][26])))))$/;

}
