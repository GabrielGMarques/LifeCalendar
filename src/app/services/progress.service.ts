import { EventEmitter, Output } from '@angular/core';

export class ProgressService {
    private progressEmitter = new EventEmitter<{}>();

    getProgressEmitter() {
        return this.progressEmitter;
    }

    showProgress() {
        this.progressEmitter.emit(true);
    }

    hideProgress() {
        this.progressEmitter.emit(false);
    }
}