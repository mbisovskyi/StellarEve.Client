import { Component, OnInit } from '@angular/core';
import { EveAuthenticationService } from '../../services/eve/eve-authentication.service';
import { Router } from '@angular/router';
import { AuthorizationService } from '../../services/application/authorization.service';
import { AuthorizedCharacterInfoResponse } from '../../interfaces/eve-character-objects';
import { EveCharacterService } from '../../services/eve/eve-character.service';


@Component({
  selector: 'app-authorize-character',
  templateUrl: './authorize-character.component.html',
  styleUrl: './authorize-character.component.css'
})
export class AuthorizeCharacterComponent implements OnInit {
  authorizedCharacterData: AuthorizedCharacterInfoResponse | null = null;

  constructor(private router: Router, private eveAuthenticationService: EveAuthenticationService, private eveCharacterService: EveCharacterService) {}
  
    public ngOnInit(): void {
      this.ProcessOnInitSteps();
    }

    private ProcessOnInitSteps(): void {
      if (!AuthorizationService.GetAccessTokenFromStorage()) {
        this.ContinueCharacterAuthorization();
      } else {
        this.eveCharacterService.GetAuthorizedCharacterInfo().subscribe({
          next: (result) => {this.authorizedCharacterData = result, this.router.navigate(['/'])},
          
        });
      }
    }    
    
    protected OnAuthorizeCharacterButtonClicked(): void {
      AuthorizationService.RemoveAccessTokenFromStorage();
      this.eveAuthenticationService.AuthorizeCharacter().subscribe({
        next: (result) => {
          if (result.navigateToAddress != null && result.callbackCode != null) {
            localStorage.setItem('apiCallbackCode', result.callbackCode);
            this.router.navigate(['/externalRedirect'], { queryParams: { target: result.navigateToAddress } });
          }
        }
      });
    }
  
    private ContinueCharacterAuthorization(): void {
      this.eveAuthenticationService.ParseAuthorizeCharacterCallbackPath()
      this.eveAuthenticationService.AuthorizeCharacterCallbackCode().subscribe({
        next: (result) => {
          if (result) {
            this.eveAuthenticationService.eveAuthenticationTokens.set(result);
            AuthorizationService.AddAccessTokenToStorage(result.accessToken);

            this.ProcessOnInitSteps();
          }
        }
      })
    }

    protected UnathorizeCharacter(): void {
      AuthorizationService.RemoveAccessTokenFromStorage();
      this.authorizedCharacterData = null;

      this.ProcessOnInitSteps();
    }
}
