var permute = function (nums) {
  const result = []
  const path = []
  const backTrace = () => {
    if (path.length === nums.length) {
      return result.push([...path])
    }
    for (let i = 0; i < nums.length; i++) {
      if (path.includes(nums[i])) continue
      path.push(nums[i])
      backTrace()
      path.pop()
    }
  }
  backTrace()
  return result
}
