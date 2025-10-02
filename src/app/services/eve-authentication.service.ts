import { Injectable, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import { AuthorizeCharacterCallbackCodes, ExchangeAuthorizationCodeForTokensRequest, EveAuthenticationTokens, StartAuthorizeCharacterResponse } from '../interfaces/eve-authentication-objects';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';


@Injectable({
  providedIn: 'root'
})


export class EveAuthenticationService extends BaseService {

  eveAuthorizeCharacterCallbackCodes: WritableSignal<AuthorizeCharacterCallbackCodes | null> = signal(null);
  eveAuthenticationTokens: WritableSignal<EveAuthenticationTokens | null> = signal(null);

  constructor(private httpClient: HttpClient, private location: Location) {
    super();
  }

  public AuthorizeCharacter(): Observable<StartAuthorizeCharacterResponse> {
    return this.httpClient.get<StartAuthorizeCharacterResponse>(this.apiBaseUrl + 'eveauthentication/authorize/character')
  }

  public AuthorizeCharacterCallbackCode(): Observable<EveAuthenticationTokens | undefined> {
    if (this.eveAuthorizeCharacterCallbackCodes()?.authorizationCode && this.eveAuthorizeCharacterCallbackCodes()?.callbackCode == localStorage.getItem('apiCallbackCode')) {
      localStorage.removeItem('apiCallbackCode');
      let request: ExchangeAuthorizationCodeForTokensRequest = { authorizationCode: this.eveAuthorizeCharacterCallbackCodes()!.authorizationCode };
      return this.httpClient.post<EveAuthenticationTokens>(this.apiBaseUrl + 'eveauthentication/authorize/code', request);
    }
    return new Observable(undefined);
  }

  public ParseAuthorizeCharacterCallbackPath(): void {
    let codes: AuthorizeCharacterCallbackCodes;

    if (this.location.path().includes("code=") && this.location.path().includes("state=")) {
      codes = { authorizationCode: '', callbackCode: '' };
      
      this.location.path().replace(/^\?/, '').split('&').forEach(query => {
        if (query.includes("code")) {
          codes.authorizationCode = query.substring(query.indexOf('=') + 1);
        } else if (query.includes("state")) {
          codes.callbackCode = query.substring(query.indexOf('=') + 1);
        }
      })
      this.eveAuthorizeCharacterCallbackCodes.set(codes);
    } 
  }

}
