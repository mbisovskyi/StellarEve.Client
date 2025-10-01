import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import { StartAuthorizeCharacterResponse } from '../interfaces/eve-authentication-objects';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})


export class EveAuthenticationService extends BaseService {

  constructor(private httpClient: HttpClient) {
    super();
  }

  public AuthorizeCharacter(): Observable<StartAuthorizeCharacterResponse> {
    return this.httpClient.get<StartAuthorizeCharacterResponse>(this.apiBaseUrl + 'eveauthentication/authorize/character')
  }
}
