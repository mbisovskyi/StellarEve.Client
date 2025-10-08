import { BaseResponse } from "./base-objects";

export interface AuthorizedCharacterInfoResponse extends BaseResponse {
    characterID: number;
    characterName: string;
    expiresOn: Date;
}