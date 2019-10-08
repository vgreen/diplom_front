export const addDays = (date:any , numberOfDaysToAdd:number):Date => {
    return date.setDate(date.getDate() + numberOfDaysToAdd);
};

export const dateTransformer = (date: string): string => {
    return date.split('-').reverse().join('-')
};