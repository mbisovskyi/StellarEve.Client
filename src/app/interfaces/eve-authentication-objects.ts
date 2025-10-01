import { BaseResponse } from "./base-objects";

export interface StartAuthorizeCharacterResponse extends BaseResponse {
    navigateToAddress: string;
    callbackCode: string;
}