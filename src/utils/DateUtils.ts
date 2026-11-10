export const formatJourneyDate = (date: Date) => {
    const weekday = date.toLocaleDateString('en-US', {weekday: 'short'});
    const month = date.toLocaleDateString('en-US', {month: 'short'});
    const day = String(date.getDate()).padStart(2, '0');
    return `${weekday} ${month} ${day} ${date.getFullYear()}`;
};