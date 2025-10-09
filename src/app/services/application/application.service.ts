import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  constructor() { }

  public static AddAccessTokenToStorage(token: string): void {
    localStorage.setItem('eveAccessToken', token);
  }

  public static RemoveAccessTokenFromStorage(): void {
    localStorage.removeItem('eveAccessToken');
  }

  public static GetAccessTokenFromStorage(): string | null {
    return localStorage.getItem('eveAccessToken');
  }
}
