function isValidSudoku(board) {
    // Helper function to check if an array contains all numbers from 1 to 9
    function isValidGroup(group) {
      const seen = new Set();
      for (let num of group) {
        if (num < 1 || num > 9 || seen.has(num)) {
          return false;
        }
        seen.add(num);
      }
      return seen.size === 9;
    }
  
    // Check all rows
    for (let row of board) {
      if (!isValidGroup(row)) {
        return false;
      }
    }
  
    // Check all columns
    for (let col = 0; col < 9; col++) {
      const column = [];
      for (let row = 0; row < 9; row++) {
        column.push(board[row][col]);
      }
      if (!isValidGroup(column)) {
        return false;
      }
    }
  
    // Check all 3x3 subgrids
    for (let row = 0; row < 9; row += 3) {
      for (let col = 0; col < 9; col += 3) {
        const subgrid = [];
        for (let r = 0; r < 3; r++) {
          for (let c = 0; c < 3; c++) {
            subgrid.push(board[row + r][col + c]);
          }
        }
        if (!isValidGroup(subgrid)) {
          return false;
        }
      }
    }
  
    return true;
}
  
// Example usage:
const sudoku = [
[5, 3, 4, 6, 7, 8, 9, 1, 2],
[6, 7, 2, 1, 9, 5, 3, 4, 8],
[1, 9, 8, 3, 4, 2, 5, 6, 7],
[8, 5, 9, 7, 6, 1, 4, 2, 3],
[4, 2, 6, 8, 5, 3, 7, 9, 1],
[7, 1, 3, 9, 2, 4, 8, 5, 6],
[9, 6, 1, 5, 3, 7, 2, 8, 4],
[2, 8, 7, 4, 1, 9, 6, 3, 5],
[3, 4, 5, 2, 8, 6, 1, 7, 9]
];

console.log(isValidSudoku(sudoku)); // Output: true