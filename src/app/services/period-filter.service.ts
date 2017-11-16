import { EventEmitter } from '@angular/core';

export class PeriodFilterService{
    private periodFilterEmitter = new EventEmitter<number>();
    
    getFilterEmitter(){
        return this.periodFilterEmitter;//.subscribe(func);
    }

    updateLevel(level){
        this.periodFilterEmitter.emit(level);
    }


}