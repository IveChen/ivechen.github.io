// const isFounded = arr1.some(ai => arr2.includes(ai))
// const allFounded = arr2.every(ai => arr1.includes(ai))

export const getOpponentTeamIndex = (code) => {
  if (code === 0) return 1
  if (code === 1) return 0
  return null
}

// 链接：https://juejin.cn/post/6959102042279247909
/** 组合 */
export const combination = (arr, size) => {
  const allResult = []
  const comb = (arr, size, result) => {
    const arrLen = arr.length
    if (size > arrLen) {
      return
    }
    if (size === arrLen) {
      allResult.push([].concat(result, arr))
    } else {
      for (let i = 0; i < arrLen; i++) {
        const newResult = [].concat(result)
        newResult.push(arr[i])

        if (size === 1) {
          allResult.push(newResult)
        } else {
          const newArr = [].concat(arr)
          newArr.splice(0, i + 1)
          // eslint-disable-next-line no-caller
          comb(newArr, size - 1, newResult)
        }
      }
    }
  }
  comb(arr, size, [])

  return allResult
}
