import { add, format, addDays, formatDistance, subDays } from "date-fns";

class CalculateDate {
    // currently only getting numb as a parameter
    static setDueDate(dueIn) {
        const today = new Date();
        const dueDate = format(addDays(today, dueIn), 'MM/dd/yyyy')
        return dueDate
    }
}

export default CalculateDate