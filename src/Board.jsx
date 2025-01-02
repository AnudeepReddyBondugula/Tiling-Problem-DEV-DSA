import {useEffect, useState} from 'react'
import solve, {getRandomHexColor} from './helper';
function Board({n, setDisable, setN}) {

    const [board, setBoard] = useState(null);
    const [missingTileCoords, setMissingTileCoords] = useState(-1);
    const [startButtonPressed, setStartButtonPressed] = useState(false);

    const handleMissingTile = (e) => {
        if (startButtonPressed) return
        const newEle = e.target;
        const newCoords = Number(newEle.id)
        setMissingTileCoords(newCoords)
        const tempBoard = board;
        tempBoard[Math.floor(newCoords/n)][newCoords%n].color = "#000000"
        if (missingTileCoords != -1)
            tempBoard[Math.floor(missingTileCoords/n)][missingTileCoords%n].color = "#ffffff"
        setBoard(tempBoard)
    }

    const createBoard = (n) => {
        let result = []
        for(let i = 0; i < n; i++){
            let row = []
            for(let j = 0; j < n; j++){
                row.push({
                    value : i*n + j,
                    color : "#ffffff"
                })
            }
            result.push(row);
        }
        return result;
    }

    const isNumber = (n) => {
        return !isNaN(n) && n !== null && n !== '' && typeof n !== 'boolean';
    }
    const isPowerofTwo = (n) => {
        return n > 0 && n <= 32 && (n & (n - 1)) === 0
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setMissingTileCoords(-1)
        if (!isNumber(n)){
            alert("Please enter a valid Number")
            return;
        }
        setN(Number(n))
        if (!isPowerofTwo(n)) {
            alert("Make sure the number is greater than 0 and less than 2048 and a power of 2");
            return
        }
        setDisable(true)
        const b = createBoard(n);
        setBoard(b);
        setStartButtonPressed(false)
        
    }

    const handleStart = () => {
        // MAIN LOGIC
        if (missingTileCoords == -1){
            alert("Please select the missing tile")
            return
        }
        setStartButtonPressed(true)
        const startCoords = {
            x : 0,
            y : 0
        }
        const endCoords = {
            x : n-1,
            y : n-1
        }
        const result = []
        solve(board, setBoard, n, {x : Math.floor(missingTileCoords/n), y : missingTileCoords%n}, startCoords, endCoords, 2000, result);
        // console.log(result)
        let i = 0;
        const intervalId = setInterval(() => {
            if (i == result.length){
                clearInterval(intervalId);
                return
            }
            const tile = result[i++]
            const color = getRandomHexColor();
            board[tile[0].x][tile[0].y].color = color
            board[tile[1].x][tile[1].y].color = color
            board[tile[2].x][tile[2].y].color = color
            setBoard(b => [...b])
        }, 250)
    }

    const handleReset = () => {
        setDisable(false);
        setN(0);
        setBoard(null)
        setMissingTileCoords(-1)
        setStartButtonPressed(false)
    }

    return (
        <div className="flex-col w-full p-5 justify-items-center">
            <div className="pb-5 flex gap-10">
                <button onClick={handleReset} className="border-black border rounded py-1 px-3"> Reset </button>
                <button onClick={handleSubmit} className="border-black border rounded py-1 px-3"> Submit </button>
                <button onClick={handleStart} className="border-black border rounded py-1 px-3"> Start </button>
            </div>
            <div className="flex-col justify-items-center">
                <p>Select the missing tile and click on Start</p>
                <div className="p-0 m-5">
                    {board && board.map((row, index) => {
                        return <div className='p-0 flex' key={"row-" + index}>
                            {row && row.map(cell => {
                                let result = <div style={{
                                    backgroundColor : cell.color
                                }}
                                key={cell.value} 
                                onClick={handleMissingTile} 
                                id={cell.value} 
                                className='p-3 border border-black'></div>
                                return result
                            })}
                        </div>
                    })}
                </div>
            </div>
        </div>
    )
}

export default Board