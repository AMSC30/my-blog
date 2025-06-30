function isGoodFriends(string1, string2) {
  // write code here
  if (string1.length !== string2.length) return false
  if (string1 === string2) return false
  let str1 = string1
    .split('')
    .sort((a, b) => a.charCodeAt(0) - b.charCodeAt(0))
    .join('')
  let str2 = string2
    .split('')
    .sort((a, b) => a.charCodeAt(0) - b.charCodeAt(0))
    .join('')

  return str1 === str2
}
