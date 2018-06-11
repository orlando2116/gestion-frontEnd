import { RequestOptions } from '@angular/http';

export interface IOpcionesHttp {
  getOptions(): RequestOptions;
  getOptionsBy(parameter: any): RequestOptions;
}
