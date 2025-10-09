import { Component, OnInit } from '@angular/core';
import { EveAuthenticationService } from '../../services/eve/eve-authentication.service';
import { Router } from '@angular/router';
import { ApplicationService } from '../../services/application/application.service';
import { AuthorizeCharacterResponse } from '../../interfaces/eve-authentication-objects';

@Component({
  selector: 'app-authorize-character',
  templateUrl: './authorize-character.component.html',
  styleUrl: './authorize-character.component.css'
})
export class AuthorizeCharacterComponent implements OnInit {

  constructor(private router: Router, private eveAuthenticationService: EveAuthenticationService) {}
  
    protected eveCharacterAuthorized: boolean = false;
    protected eveAuthorizedCharacterData: AuthorizeCharacterResponse | null = null;

    public ngOnInit(): void {
      this.AuthorizeCharacter();
      this.CheckEveCharacterAuthorized();
    }
    
    protected OnAuthorizeCharacterButtonClicked(): void {
      ApplicationService.RemoveAccessTokenFromStorage();
      this.eveAuthenticationService.GetEveAuthorizationCodes().subscribe({
        next: (result) => {
          if (result.navigateToAddress != null && result.callbackCode != null) {
            localStorage.setItem('apiCallbackCode', result.callbackCode);
            this.router.navigate(['/externalRedirect'], { queryParams: { target: result.navigateToAddress } });
          }
        }
      });
    }
    
    private AuthorizeCharacter(): void {
      this.eveAuthenticationService.ParseAuthorizeCharacterCallbackPath()
      this.eveAuthenticationService.AuthorizeCharacter().subscribe({
        next: (result) => {
          if (result) {
            localStorage.setItem("eveAuthorizedCharacterData", JSON.stringify(result));

            if (result.success) {
              this.eveCharacterAuthorized = true;
              this.eveAuthorizedCharacterData = result;
              this.eveAuthenticationService.eveAuthorizedCharacterData.set(result);
            }
          }
        }
      })
    }

    private CheckEveCharacterAuthorized(): void {
      this.eveAuthorizedCharacterData = JSON.parse(localStorage.getItem("eveAuthorizedCharacterData") ?? "");
      if (this.eveAuthorizedCharacterData) {
        const expiresOnDate: Date = new Date(this.eveAuthorizedCharacterData.expiresOn);
        const expiresOnMilliseconds: number = expiresOnDate.getTime();
        this.eveCharacterAuthorized = expiresOnMilliseconds > Date.now();
      }
    }

    protected UnathorizeCharacter(): void {
      this.eveCharacterAuthorized = false;
      localStorage.removeItem("eveAuthorizedCharacterData");
    }
}
