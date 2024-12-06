const fs = require("fs");
const data = fs.readFileSync('input.txt').toString().trim().split('\n');
const rows = data.length;
const cols = data[0].length;

const directions = [
    [0, 1],   // right
    [1, 0],   // down
    [1, 1],   // down-right
    [1, -1],  // down-left
    [0, -1],  // left
    [-1, 0],  // up
    [-1, -1], // up-left
    [-1, 1]   // up-right
];

// if "XMAS" exists starting from (x, y) in the direction (dx, dy)
const checkWord = (x, y, xDir, yDir) => {
    const needle = "XMAS";
    for (let i = 0; i < needle.length; i++) {
        const nextX = x + i * xDir; 
        const nextY = y + i * yDir; 

        // Check if the new position is out of bounds or the character does not match
        if (
            nextX < 0 || 
            nextY < 0 || 
            nextX >= rows || 
            nextY >= cols || 
            data[nextY][nextX] !== needle[i]) {
            return false;
        }
    }
    return true;
}

const getCount = () => {
    let count = 0;
    // Iterate over each cell in the grid
    for (let x = 0; x < rows; x++) {
        for (let y = 0; y < cols; y++) {
            // Check each direction from the current cell
            for (const [xDir, yDir] of directions) {
                if (checkWord(x, y, xDir, yDir)) {
                    count++;
                }
            }
        }
    }
    return count;
}

console.log(getCount());
