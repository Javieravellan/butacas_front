import { format, parseISO } from "date-fns";

const formatDate = (dateString: string) => {
    try {
        return format(parseISO(dateString), 'dd/MMM/yyyy HH:mm');
    } catch {
        return dateString;
    }
};

const onlyHours = (dateString: string) => {
    try {
        return format(parseISO(dateString), 'HH:mm');
    } catch {
        return dateString;
    }
}

const showTodayOrDateDefault = (dateString: string) => {
    try {
        const date = parseISO(dateString);
        const now = new Date();
        
        const isToday = date.getDate() === now.getDate() &&
               date.getMonth() === now.getMonth() &&
               date.getFullYear() === now.getFullYear()
        return isToday ? 'Hoy a las ' + onlyHours(dateString)  : formatDate(dateString);
    } catch {
        return false;
    }
};

export { formatDate, onlyHours, showTodayOrDateDefault };