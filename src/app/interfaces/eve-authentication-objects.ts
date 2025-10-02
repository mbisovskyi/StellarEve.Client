import { BaseResponse } from "./base-objects";

export interface StartAuthorizeCharacterResponse extends BaseResponse {
    navigateToAddress: string;
    callbackCode: string;
}

export interface AuthorizeCharacterCallbackCodes {
    authorizationCode: string;
    callbackCode: string;
}

export interface ExchangeAuthorizationCodeForTokensRequest {
    authorizationCode: string;
}

export interface EveAuthenticationTokens extends BaseResponse {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
    tokenType: string;
}