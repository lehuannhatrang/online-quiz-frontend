const dateForMoment = (date) => {
    return date.getFullYear() + (date.getMonth() + 1) + date.getDay();
};

export default dateForMoment;