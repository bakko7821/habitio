interface HabitDTO {
  id: number
  name: string
  icon: {
    id: number
    url: string
    color: string
  }
  weeks: {
    name: string
    days: {
      date: string
      status: boolean
      value?: number
    }[]
  }[]
}
