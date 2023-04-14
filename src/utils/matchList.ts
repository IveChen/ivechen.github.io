import dayjs from 'dayjs'
import md5 from 'md5'

const files = require.context('../dataSource', true, /\.json$/)

const matchList = []
files.keys().forEach((key) => {
  const id = md5(key)
  const data = files(key)
  data.id = id
  matchList.push(data)
})
// 日期从小到大排列
matchList.sort((a, b) => {
  return dayjs(a.matchDate) > dayjs(b.matchDate) ? 1 : -1
})
export default () => {
  // 深复制，防止修改
  return JSON.parse(JSON.stringify(matchList))
}
