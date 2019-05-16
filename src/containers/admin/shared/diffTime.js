function diffTime(date) {
    const now = new Date();
    if (now.getFullYear() > date.getFullYear())
    {
        const diffYear = now.getFullYear() - date.getFullYear();
        if (diffYear == 1) {
            const diffMonth = now.getMonth() - date.getMonth();
            if (diffMonth < 0) {
                const disMonth = 12 + diffMonth;
                return (disMonth == 1) ? "1 month ago" : (disMonth + " months ago");
            }
            else {
                return "1 year ago";
            }
        }
        else {
            const diffMonth = now.getMonth() - date.getMonth();
            if (diffMonth < 0) {
                return (diffYear > 2) ? "More than " + (diffYear - 1) + " years ago" : "More than 1 year ago";
            }
            else {
                return diffYear + " years ago";
            }
        }
    }

    if (now.getMonth() > date.getMonth())
    {
        const diffMonth = now.getMonth() - date.getMonth();
        if (diffMonth == 1) {
            const diffDate = now.getDate() - date.getDate();
            if (diffDate < 0) {
                const diffTime = Math.abs(now.getTime() - date.getTime());
                const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
                return (diffDays == 1) ? "One day ago" : diffDays + " days ago";
            }
            else {
                return "1 month ago";
            }
        }
        else {
            const diffDate = now.getDate() - date.getDate();
            if (diffDate < 0) {
                return (diffMonth > 2) ? "More than " + (diffMonth - 1) + " months ago" : "More than 1 month ago";
            }
            else {
                return diffMonth + " months ago";
            }
        }
    }

    if (now.getDate() > date.getDate())
    {
        const diffDate = now.getDate() - date.getDate();
        if (diffDate == 1) {
            const diffHour = now.getHours() - date.getHours();
            if (diffHour < 0) {
                const disHour = 24 + diffHour;
                return (disHour == 1) ? "One hour ago" : disHour + " hours ago";
            }
            else {
                return "1 day ago";
            }
        }
        else {
            const diffHour = now.getHours() - date.getHours();
            if (diffHour < 0) {
                return (diffDate > 2) ? "More than " + (diffDate - 1) + " days ago" : "More than 1 day ago";
            }
            else {
                return diffDate + " days ago";
            }
        }
    }

    return "Today, at " + date.getHours() + ":" + date.getMinutes();

}

export default diffTime;