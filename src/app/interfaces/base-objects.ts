export interface BaseResponse {
    success: boolean;
    error: string | null;
    stackTrace: string | null;
}