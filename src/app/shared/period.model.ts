export class Period {
    constructor(name?:string,dateFrom?: Date,dateTo?: Date,dateFromLong?: number,dateToLong?: number,color?: string,level?: number) {
   this.dateFrom = dateFrom;
   this.dateTo = dateTo;
   this.dateFromLong = dateFromLong;
   this.dateToLong= dateToLong;
   this.color=color;
   this.level=level;
   this.name=name;
    
    }
    $key:string;
    dateFrom: Date;
    dateTo: Date;
    dateFromLong: number;
    dateToLong: number;
    name:string;
    color: string;
    level: number;
}