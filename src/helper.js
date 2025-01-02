const solve = (board, setBoard, n, missingTileCoords, startCoords, endCoords, time, result) => {
    if (n < 2) return

    let q = 0;
    if (missingTileCoords.y >= (startCoords.y + endCoords.y + 1)/2) {
        q += 2
    }
    else q += 1

    if (missingTileCoords.x >= (startCoords.x + endCoords.x + 1)/2) {
        q += 2
    }
    // alert(q)
    const firstQuadrantStartCoords = {...startCoords}
    const firstQuadrantEndCoords = {
        x : Math.floor((startCoords.x + endCoords.x) / 2),
        y : Math.floor((startCoords.y + endCoords.y) / 2)
    }
    const secondQuadrantStartCoords = {...startCoords, y : firstQuadrantEndCoords.y+1}
    const secondQuadrantEndCoords = {...endCoords, x : firstQuadrantEndCoords.x}

    const thirdQuadrantStartCoords = {...startCoords, x : firstQuadrantEndCoords.x+1}
    const thirdQuadrantEndCoords = {...endCoords, y : firstQuadrantEndCoords.y}

    const fourthQuadrantStartCoords = {x : firstQuadrantEndCoords.x+1, y : firstQuadrantEndCoords.y+1}
    const fourthQuadrantEndCoords = {...endCoords}

    if (q == 1) {
        solve(board, setBoard, Math.floor(n/2), missingTileCoords, firstQuadrantStartCoords, firstQuadrantEndCoords, time, result)
        result.push([
            {
                x : firstQuadrantEndCoords.x,
                y : firstQuadrantEndCoords.y+1
            },
            {
                x : firstQuadrantEndCoords.x+1,
                y : firstQuadrantEndCoords.y
            },
            {
                x : firstQuadrantEndCoords.x+1,
                y : firstQuadrantEndCoords.y+1
            }
        ])
        solve(board, setBoard, Math.floor(n/2), {x: firstQuadrantEndCoords.x, y : firstQuadrantEndCoords.y+1}, secondQuadrantStartCoords, secondQuadrantEndCoords, time, result);
        solve(board, setBoard, Math.floor(n/2), {x: firstQuadrantEndCoords.x+1, y : firstQuadrantEndCoords.y}, thirdQuadrantStartCoords, thirdQuadrantEndCoords, time, result);
        solve(board, setBoard, Math.floor(n/2), {x: firstQuadrantEndCoords.x+1, y : firstQuadrantEndCoords.y+1}, fourthQuadrantStartCoords, fourthQuadrantEndCoords, time, result);
    }
    else if (q == 2){
        solve(board, setBoard, Math.floor(n/2), missingTileCoords, secondQuadrantStartCoords, secondQuadrantEndCoords, time, result)
        result.push([
            {
                x : firstQuadrantEndCoords.x,
                y : firstQuadrantEndCoords.y
            },
            {
                x : firstQuadrantEndCoords.x+1,
                y : firstQuadrantEndCoords.y
            },
            {
                x : firstQuadrantEndCoords.x+1,
                y : firstQuadrantEndCoords.y+1
            }
        ])
        solve(board, setBoard, Math.floor(n/2), {x: firstQuadrantEndCoords.x, y : firstQuadrantEndCoords.y}, firstQuadrantStartCoords, firstQuadrantEndCoords, time, result);
        solve(board, setBoard, Math.floor(n/2), {x: firstQuadrantEndCoords.x+1, y : firstQuadrantEndCoords.y}, thirdQuadrantStartCoords, thirdQuadrantEndCoords, time, result);
        solve(board, setBoard, Math.floor(n/2), {x: firstQuadrantEndCoords.x+1, y : firstQuadrantEndCoords.y+1}, fourthQuadrantStartCoords, fourthQuadrantEndCoords, time, result);
    }
    else if (q == 3) {
        solve(board, setBoard, Math.floor(n/2), missingTileCoords, thirdQuadrantStartCoords, thirdQuadrantEndCoords, time, result)
        result.push([
            {
                x : firstQuadrantEndCoords.x,
                y : firstQuadrantEndCoords.y
            },
            {
                x : firstQuadrantEndCoords.x,
                y : firstQuadrantEndCoords.y+1
            },
            {
                x : firstQuadrantEndCoords.x+1,
                y : firstQuadrantEndCoords.y+1
            }
        ])
        solve(board, setBoard, Math.floor(n/2), {x: firstQuadrantEndCoords.x, y : firstQuadrantEndCoords.y}, firstQuadrantStartCoords, firstQuadrantEndCoords, time, result);
        solve(board, setBoard, Math.floor(n/2), {x: firstQuadrantEndCoords.x, y : firstQuadrantEndCoords.y+1}, secondQuadrantStartCoords, secondQuadrantEndCoords, time, result);
        solve(board, setBoard, Math.floor(n/2), {x: firstQuadrantEndCoords.x+1, y : firstQuadrantEndCoords.y+1}, fourthQuadrantStartCoords, fourthQuadrantEndCoords, time, result);
    }
    else {
        solve(board, setBoard, Math.floor(n/2), missingTileCoords, fourthQuadrantStartCoords, fourthQuadrantEndCoords, time, result)
        result.push([
            {
                x : firstQuadrantEndCoords.x,
                y : firstQuadrantEndCoords.y
            },
            {
                x : firstQuadrantEndCoords.x,
                y : firstQuadrantEndCoords.y+1
            },
            {
                x : firstQuadrantEndCoords.x+1,
                y : firstQuadrantEndCoords.y
            }
        ])
        solve(board, setBoard, Math.floor(n/2), {x: firstQuadrantEndCoords.x, y : firstQuadrantEndCoords.y}, firstQuadrantStartCoords, firstQuadrantEndCoords, time, result);
        solve(board, setBoard, Math.floor(n/2), {x: firstQuadrantEndCoords.x, y : firstQuadrantEndCoords.y+1}, secondQuadrantStartCoords, secondQuadrantEndCoords, time, result);
        solve(board, setBoard, Math.floor(n/2), {x: firstQuadrantEndCoords.x+1, y : firstQuadrantEndCoords.y}, thirdQuadrantStartCoords, thirdQuadrantEndCoords, time, result);
    }
}

export function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
}



export default solve;