
export class UtilService {
    formatDate(date) {

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

}