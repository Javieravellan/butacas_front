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

export { formatDate, onlyHours };