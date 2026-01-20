interface DayItem {
    number: string; // "20"
    name: string;   // "Tuesday"
    fullDate: string; // "20-01-2026" (удобно для логов)
}

export const getLastDays = (daysCount: number): DayItem[] => {
    const result: DayItem[] = [];

    const weekDays = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];

    const today = new Date();

    for (let i = 0; i < daysCount; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);

        const dayNumber = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();

        result.push({
            number: dayNumber,
            name: weekDays[date.getDay()],
            fullDate: `${dayNumber}-${month}-${year}`,
        });
    }

    return result;
};


export default function dateToPath() {
    const now = new Date()

    const day = String(now.getDate()).padStart(2, '0')
    const month = String(now.getMonth() + 1).padStart(2, '0')

    return `${day}-${month}`
}

export const formatDayMonth = (
  value: string,
  locale: string = 'en-US'
): string => {
  const [day, month] = value.split('-').map(Number)

  const date = new Date(2026, month - 1, day)

  return new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'long',
  }).format(date)
}

export const shiftDay = (
  current: string,
  offset: number
): string => {
  const [day, month] = current.split("-").map(Number)

  const date = new Date(2026, month - 1, day)
  date.setDate(date.getDate() + offset)

  const newDay = String(date.getDate()).padStart(2, "0")
  const newMonth = String(date.getMonth() + 1).padStart(2, "0")

  return `${newDay}-${newMonth}`
}
