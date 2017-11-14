
import { EventEmitter,Output } from '@angular/core';

export class MessageAlertService{

    private errorEmitter = new EventEmitter<{}>();
    private successEmitter = new EventEmitter<{}>();

    getErrorEmitter(){
        return this.errorEmitter;
    } 
    getSuccessEmitter(){
        return this.successEmitter;
    }
    showErrorMessage(message: string) {
        this.errorEmitter.emit(message);
    }
    showSuccessMessage(message: string) {
        this.successEmitter.emit(message);
    }
}