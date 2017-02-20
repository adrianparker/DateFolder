"use strict";

exports.convertToYYYYMMDD = function(date){
    if(!date) throw new Error('Needs non-null date');
    if(!(typeof date.getDate ==='function' && typeof date.getMonth ==='function' && typeof date.getFullYear ==='function')) throw new Error('Not a date object');

    var mm = date.getMonth() + 1,
        dd = date.getDate();
    return [date.getFullYear(), (mm > 9 ? '' : '0') + mm, (dd > 9 ? '' : '0') + dd].join('');
}
