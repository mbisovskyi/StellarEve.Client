import { Component, OnInit } from '@angular/core';
import { EveAuthenticationService } from '../../services/eve-authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-eve-authentication-page',
  templateUrl: './eve-authentication-page.component.html',
  styleUrl: './eve-authentication-page.component.css'
})
export class EveAuthenticationPageComponent implements OnInit {

  constructor(private router: Router, private eveAuthenticationService: EveAuthenticationService) {}

  public ngOnInit(): void {
    this.ContinueCharacterAuthorization();
  }
  
  protected OnAuthorizeCharacterButtonClicked(): void {
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
        }
      }
    })
  }
}
