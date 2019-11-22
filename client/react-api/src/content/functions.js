convertDateTimeFromSQL(date) {
    var str = date.split('-');
    var year = str[0];
    var month = str[1];
    var rest = str[2];
    var time = rest.split('T');
    var day = time[0];
    var restTime = time[1].split(':');
    var hour = restTime[0];
    var minute = restTime[1];
    return 'Time posted: ' + hour + ':' + minute + ', ' + day + '.' + month + '.' + year;
}

export default convertDateTimeFromSQL();