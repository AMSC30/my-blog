var transform = function (board) {
  return board.map(item => {
    return item.join('')
  })
}
var isValid = function (row, col, board, n) {
  // 纵向
  for (let i = 0; i < board.length; i++) {
    if (board[i][col] === 'Q') return false
  }

  // 左上
  for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
    if (board[i][j] === 'Q') return false
  }

  // 右上
  for (let i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) {
    if (board[i][j] === 'Q') return false
  }
  return true
}

var solveNQueens = function (board) {
  const result = []

  const backTrace = (row, board) => {
    if (row === n) {
      result.push(transform(board))
      return
    }
    for (let col = 0; col < n; col++) {
      if (isValid(row, col, board, n)) {
        board[row][col] = 'Q'
        backTrace(row + 1, board)
        board[row][col] = '.'
      }
    }
  }

  backTrace(0, board)
  return result
}
