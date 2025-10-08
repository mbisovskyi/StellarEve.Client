import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { Observable } from 'rxjs';
import { AuthorizedCharacterInfoResponse } from '../../interfaces/eve-character-objects';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EveCharacterService extends BaseService {

  constructor(private httpClient: HttpClient) { 
    super();
  }

  public GetAuthorizedCharacterInfo(): Observable<AuthorizedCharacterInfoResponse> {
    return this.httpClient.get<AuthorizedCharacterInfoResponse>(this.apiBaseUrl + 'character/verify');
  }
}
