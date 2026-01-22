interface DayItem {
  number: string;
  name: string;
  fullDate: string;
}

interface MonthDaysItem {
  name: string;
  days: {
    date: string;
  }[];
}

export const getToday = () => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
};

export const getLastMonthsDays = (
  monthsCount: number
): MonthDaysItem[] => {
  const result: MonthDaysItem[] = [];

  const monthNames = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december",
  ];

  const today = getToday()

  for (let i = monthsCount - 1; i >= 0; i--) {
    const baseDate = new Date(
      today.getFullYear(),
      today.getMonth() - i,
      1
    );

    const year = baseDate.getFullYear();
    const monthIndex = baseDate.getMonth();
    const monthName = monthNames[monthIndex];

    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
    const days: { date: string }[] = [];

    for (let d = 1; d <= daysInMonth; d++) {
      const day = String(d).padStart(2, "0");
      const month = String(monthIndex + 1).padStart(2, "0");

      days.push({
        date: `${day}-${month}-${year}`,
      });
    }

    result.push({
      name: monthName,
      days,
    });
  }

  return result;
};

export const getMonthStartOffset = (fullDate: string): number => {
  const [day, month, year] = fullDate.split("-").map(Number)

  const firstDayOfMonth = new Date(year, month - 1, 1).getDay()

  // делаем понедельник первым днём недели
  return (firstDayOfMonth + 6) % 7
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

    const today = getToday();

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
