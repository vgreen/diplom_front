export const addDays = (date:any , numberOfDaysToAdd:number):Date => {
    return date.setDate(date.getDate() + numberOfDaysToAdd);
};