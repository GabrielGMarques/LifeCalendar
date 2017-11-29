
import { Period } from '../shared/period.model';

export class UtilService {
    formatDate(date):string {

        var day = date.getDate();
        var monthIndex = date.getMonth() + 1;
        var year = date.getFullYear();

        day = day <= 9 ? `0${day}` : day;
        monthIndex = monthIndex <= 9 ? `0${monthIndex}` : monthIndex;

        return `${day}/${monthIndex}/${year}`;
    }
    parseDate(date) {

        var dateArray = date.split('/');
        var day = dateArray[0];
        var month = dateArray[1];
        var year = dateArray[2];

        var dateParsed = new Date(year, month, day);
        return dateParsed;
    }
    formatPeriodsToHashArray(periods: Period[]):{ color: string, dateHash: string }[] {
        
        var result: { color: string, dateHash: string }[] = [];

        periods.forEach(period => {

            var dateFrom = new Date(period.dateFromLong);
            var dateTo = new Date(period.dateToLong);

            while (dateFrom <= dateTo) {
                
                var dateHash = this.formatLongToDateStringHash(dateFrom.getTime());

                // if(!result.find(item=>item.dateHash == dateHash)){
                    result.push({color:period.color, dateHash:dateHash});
                // }

                dateFrom.setDate(dateFrom.getDate() + 1);
            }

        });

        return result;
    }
    formatLongToDateStringHash(millis:number):string {
        var date = new Date(millis);
        return `${date.getDate()}_${date.getMonth()}_${date.getFullYear()}`;

    }

}