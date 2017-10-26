export class Period {
    constructor(dateFrom?: Date,dateTo?: Date,dateFromLong?: number,dateToLong?: number,color?: string,level?: number) {
   this.dateFrom = dateFrom;
   this.dateTo = dateTo;
   this.dateFromLong = dateFromLong;
   this.dateToLong= dateToLong;
   this.color=color;
   this.level=level;
    
    }
    dateFrom: Date;
    dateTo: Date;
    dateFromLong: number;
    dateToLong: number;
    color: string;
    level: number;
}