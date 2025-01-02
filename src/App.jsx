import { useState } from 'react'
import './App.css'
import Board from './Board';

function App() {
  const [n, setN] = useState(0);
  const [disable, setDisable] = useState(false);

  return (
    <>
    <h1 className='text-center text-3xl bold underline  '> The Tiling Problem </h1>
    <p className='p-5 text-center'>{"Given a n by n board where n is of form 2k where k >= 1 (Basically n is a power of 2 with minimum value as 2). The board has one missing cell (of size 1 x 1). Fill the board using L shaped tiles. A L shaped tile is a 2 x 2 square with one cell of size 1×1 missing."}</p>
    <div className='flex justify-center align-baseline'>
      <p className='my-auto'>Enter N:</p>
      <input
        type="text"
        placeholder="Enter value of N"
        className="p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
        onChange={(e)=>setN(e.target.value)}
        value={n}
        disabled={disable}/>
    </div>
    <Board n={n} setDisable={setDisable} setN={setN}></Board>
    </>
  )
}

export default App
