export const dateConventer = (d) => {
    var a = new Date(d / 1000);
    var today = new Date();
    var yesterday = new Date(Date.now() - 86400000);
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    if (a.setHours(0, 0, 0, 0) === today.setHours(0, 0, 0, 0))
        return 'Today, ' + hour + ':' + min;
    else if (a.setHours(0, 0, 0, 0) === yesterday.setHours(0, 0, 0, 0))
        return 'Yesterday, ' + hour + ':' + min;
    else if (year === today.getFullYear())
        return date + ' ' + month + ', ' + hour + ':' + min;
    else
        return date + ' ' + month + ' ' + year + ', ' + hour + ':' + min;
}


export const timeConventer = (t) => {
    var h = Math.floor(t / 3600);
    var m = Math.floor(t % 3600 / 60);
    var s = Math.floor(t % 3600 % 60);

    var hDisplay = h > 0 ? h + (h === 1 ? " hour " : " hours ") : "";
    var mDisplay = m > 0 ? m + (m === 1 ? " minute " : " minutes ") : "";
    var sDisplay = s > 0 ? s + (s === 1 ? " second " : " seconds ") : "";
    return hDisplay + mDisplay + sDisplay;
}