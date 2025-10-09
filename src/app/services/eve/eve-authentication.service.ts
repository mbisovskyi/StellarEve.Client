import { Injectable, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../base.service';
import { EveAuthorizationCodes, AuthorizeCharacterRequest, AuthorizeCharacterResponse, EveAuthorizationCodesResponse } from '../../interfaces/eve-authentication-objects';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';


@Injectable({
  providedIn: 'root'
})


export class EveAuthenticationService extends BaseService {

  eveAuthorizationCodes: WritableSignal<EveAuthorizationCodes | null> = signal(null);
  eveAuthorizedCharacterData: WritableSignal<AuthorizeCharacterResponse | null> = signal(null);

  constructor(private httpClient: HttpClient, private location: Location) {
    super();
  }

  public GetEveAuthorizationCodes(): Observable<EveAuthorizationCodesResponse> {
    return this.httpClient.get<EveAuthorizationCodesResponse>(this.apiBaseUrl + 'eveauthentication/authorization_codes')
  }

  public AuthorizeCharacter(): Observable<AuthorizeCharacterResponse | undefined> {
    if (this.eveAuthorizationCodes()?.authorizationCode && this.eveAuthorizationCodes()?.callbackCode == localStorage.getItem('apiCallbackCode')) {
      localStorage.removeItem('apiCallbackCode');
      let request: AuthorizeCharacterRequest = { authorizationCode: this.eveAuthorizationCodes()!.authorizationCode };
      return this.httpClient.post<AuthorizeCharacterResponse>(this.apiBaseUrl + 'eveauthentication/authorize_character', request);
    }
    return new Observable(undefined);
  }

  public ParseAuthorizeCharacterCallbackPath(): void {
    let codes: EveAuthorizationCodes;

    if (this.location.path().includes("code=") && this.location.path().includes("state=")) {
      codes = { authorizationCode: '', callbackCode: '' };
      
      this.location.path().replace(/^\?/, '').split('&').forEach(query => {
        if (query.includes("code")) {
          codes.authorizationCode = query.substring(query.indexOf('=') + 1);
        } else if (query.includes("state")) {
          codes.callbackCode = query.substring(query.indexOf('=') + 1);
        }
      })
      this.eveAuthorizationCodes.set(codes);
    } 
  }

}
