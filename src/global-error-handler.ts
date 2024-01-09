import { ErrorHandler, Injectable } from "@angular/core";

@Injectable()
export class GlobalErrorHandler implements ErrorHandler{
    handleError(e: any): void {
        console.log(e);
    }
    
}
