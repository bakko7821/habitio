export const toISODate = (date: string) => {
    const [day, month] = date.split("-")
    const year = new Date().getFullYear()

    return new Date(
      Number(year),
      Number(month) - 1, // месяцы с 0
      Number(day)
    ).toISOString()
  }

export const formatDateTitle = (date: string) => {
    const [day, month] = date.split("-")
    const year = new Date().getFullYear()

    const parsedDate = new Date(
        year,
        Number(month) - 1,
        Number(day)
    )

    return parsedDate.toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
    })
}

export const parsePathDate = (date: string) => {
  const [day, month] = date.split("-")
  const year = new Date().getFullYear()

  return new Date(year, Number(month) - 1, Number(day))
}

export const formatToPathDate = (date: Date) => {
  const day = String(date.getDate()).padStart(2, "0")
  const month = String(date.getMonth() + 1).padStart(2, "0")
  return `${day}-${month}`
}

export const shiftPathDate = (date: string, diff: number) => {
  const d = parsePathDate(date)
  d.setDate(d.getDate() + diff)
  return formatToPathDate(d)
}
