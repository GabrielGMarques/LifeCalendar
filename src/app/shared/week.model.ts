import { Period } from '../shared/period.model';

export class Week {
    periodColor: string;
    index: number;
    isCurrentWeek: boolean;
    isBeforeCurrent:boolean;
    dateTo: Date;
    dateFrom: Date;
    dateToSt: string;
    dateFromSt: string;
    colors?:string[];
    periods?:Period[];
    labelTooltip?:string;

}