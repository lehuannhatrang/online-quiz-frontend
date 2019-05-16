const dateForMoment = (date) => {
    const m = date.getMonth() + 1;
    const sm = m < 10 ? '0' + m : m.toString();
    const d = date.getDate();
    const sd = d < 10 ? '0' + d : d.toString();
    return date.getFullYear().toString() + sm + sd;
};

export default dateForMoment;