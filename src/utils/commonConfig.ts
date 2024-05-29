import dayjs from 'dayjs'

export const shortcuts = [
  {
    text: '今年',
    value: () => {
      const start = new Date(new Date().getFullYear(), 0)
      const end = new Date()
      return [start, end]
    }
  },
  {
    text: '"改地图"以前',
    value: () => {
      const start = dayjs('2022-6-6')
      const end = dayjs('2023-4-20')
      return [start, end]
    }
  },
  {
    text: '"改地图"以后',
    value: () => {
      const start = dayjs('2023-4-21')
      const end = new Date()
      return [start, end]
    }
  },
  {
    text: '"改地图"后 - "命石"前',
    value: () => {
      const start = dayjs('2023-4-21')
      const end = dayjs('2024-5-23')
      return [start, end]
    }
  },
  {
    text: '"命石"以前',
    value: () => {
      const start = dayjs('2022-6-6')
      const end = dayjs('2024-5-23')
      return [start, end]
    }
  },
  {
    text: '"命石"以后',
    value: () => {
      const start = dayjs('2024-5-24')
      const end = new Date()
      return [start, end]
    }
  }
  // {
  //   text: '7.34',
  //   value: () => {
  //     const start = dayjs('2023-8-9')
  //     const end = new Date()
  //     return [start, end]
  //   }
  // }
]
