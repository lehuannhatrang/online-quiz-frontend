function getTextOfMonth(month) {
    const textMonth = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aus', 'Sep', 'Oct', 'Nov', 'Dec'];
    return textMonth[month];
}

function getRecentlyMonths(num) {
    const now = new Date();
    let curMonth = now.getMonth();                //0-11
    let curYear = now.getFullYear();

    let recents = [];

    for (let i = 0; i <= num; ++i) {
        if (curMonth < 0) {
            curYear--;
            curMonth += 12;
        }
        const val = getTextOfMonth(curMonth) + ' ' + curYear;
        recents.unshift(val);
        curMonth--;
    }

    return recents;
}

export default getRecentlyMonths;