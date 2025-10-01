import { Component } from '@angular/core';
import { EveAuthenticationService } from '../../services/eve-authentication.service';
import { StartAuthorizeCharacterResponse } from '../../interfaces/eve-authentication-objects';
import { Router } from '@angular/router';

@Component({
  selector: 'app-eve-authentication-page',
  templateUrl: './eve-authentication-page.component.html',
  styleUrl: './eve-authentication-page.component.css'
})
export class EveAuthenticationPageComponent {

  private startAuthorizeCharacterResponse: StartAuthorizeCharacterResponse | null = null;

  constructor(private router: Router, private eveAuthenticationService: EveAuthenticationService) {}
  
  protected OnAuthorizeCharacterButtonClicked(): void {
    this.eveAuthenticationService.AuthorizeCharacter().subscribe({
      next: result => this.startAuthorizeCharacterResponse = result,
      error: error => console.error(error)
    });

    if (this.startAuthorizeCharacterResponse) {
      this.router.navigate(['/externalRedirect'], { queryParams: { target: this.startAuthorizeCharacterResponse.navigateToAddress } });
    }
  } 
}
