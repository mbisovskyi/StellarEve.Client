import { BaseResponse } from "./base-objects";

export interface EveAuthorizationCodesResponse extends BaseResponse {
    navigateToAddress: string;
    callbackCode: string;
}

export interface EveAuthorizationCodes {
    authorizationCode: string;
    callbackCode: string;
}

export interface AuthorizeCharacterRequest {
    authorizationCode: string;
}

export interface AuthorizeCharacterResponse extends BaseResponse {
    characterId: number;
    characterName: string;
    accessToken: string;
    tokenType: string;
    refreshToken: string;
    expiresOn: Date;
}