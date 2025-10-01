import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

export class BaseService {

  protected apiBaseUrl: string;

  constructor()
  {
    this.apiBaseUrl = environment.apiBaseUrl;
  }
}
