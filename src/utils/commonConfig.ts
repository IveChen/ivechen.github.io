import dayjs from 'dayjs'

export const shortcuts = [
  {
    text: '今年',
    value: () => {
      const end = new Date()
      const start = new Date(new Date().getFullYear(), 0)
      return [start, end]
    }
  },
  {
    text: '7.33以前',
    value: () => {
      const start = dayjs('2022-6-6')
      const end = dayjs('2023-4-20')
      return [start, end]
    }
  },
  {
    text: '7.33',
    value: () => {
      const start = dayjs('2023-4-21')
      const end = new Date()
      return [start, end]
    }
  }
]
