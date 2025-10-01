import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class ExternalRedirectResolver implements Resolve<void> {
  resolve(route: ActivatedRouteSnapshot): void {
    const url = route.queryParamMap.get('target');
    if (url) {
      window.location.href = url;
    }
  }
}