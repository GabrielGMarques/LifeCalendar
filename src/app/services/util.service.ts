
import { Period } from '../shared/period.model';

export class UtilService {
    formatDate(date): string {

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

        var dateParsed = new Date(year, month - 1, day);
        return dateParsed;
    }
    formatPeriodsToHashArray(periods: Period[]): { color: string, dateHash: string }[] {

        var result: { color: string, dateHash: string }[] = [];

        periods.forEach(period => {

            var dateFrom = new Date(period.dateFromLong);
            var dateTo = new Date(period.dateToLong);

            while (dateFrom <= dateTo) {

                var dateHash = this.formatLongToDateStringHash(dateFrom.getTime());

                // if(!result.find(item=>item.dateHash == dateHash)){
                result.push({ color: period.color, dateHash: dateHash });
                // }

                dateFrom.setDate(dateFrom.getDate() + 1);
            }

        });

        return result;
    }

    formatLongToDateStringHash(millis: number): string {
        var date = new Date(millis);
        return `${date.getDate()}_${date.getMonth()}_${date.getFullYear()}`;
    }

    calcPeriodProgress(period: Period) {
        let total = period.tasks.map(x => x.complexity || 0).reduce((accumulator, x) => accumulator + x);
        let completedTasks = period.tasks.filter(x => x.completed);
        let completedValue = (completedTasks.length > 0 ? completedTasks.map(x => x.complexity || 0) : [0]).reduce((accumulator, x) => accumulator + x);

        period.progress = completedValue ? Math.floor(((completedValue / total) * 100)) : 0;
    }

    getTimeLeft(periodTimestamp): { days: string, hours: string, minutes: string, seconds: string } {
        let periodFinalDate = new Date(periodTimestamp);
        let date = new Date();
        var timeDiff = Math.abs(periodFinalDate.getTime() - date.getTime());

        //take out milliseconds
        timeDiff = timeDiff / 1000;
        var seconds = Math.floor(timeDiff % 60);
        timeDiff = timeDiff / 60;
        var minutes = Math.floor(timeDiff % 60);
        timeDiff = timeDiff / 60;
        var hours = Math.floor(timeDiff % 24);
        var days = Math.floor(timeDiff / 24);

        // return days + ' days, ' + hours + ' hours, ' + minutes + ' minutes, and ' + seconds + ' seconds';
        return { days: this.formatDecimal(days), hours: this.formatDecimal(hours), minutes: this.formatDecimal(minutes), seconds: this.formatDecimal(seconds) };
    }

    formatDecimal(value) {
        return value < 10 ? `0${value}` : value;
    }

}