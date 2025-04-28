'use client';

import { useState } from 'react';
import styles from './page.module.css';
export default function Home() {
  const [board, setBoard] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 2, 0, 0, 0, 0],
    [0, 0, 0, 2, 0, 0, 0, 0],
    [0, 0, 2, 2, 0, 0, 0, 0],
    [0, 0, 1, 1, 0, 0, 2, 0],
    [0, 2, 1, 2, 0, 1, 2, 0],
    [0, 1, 2, 2, 0, 0, 1, 0],
    [0, 0, 1, 1, 2, 0, 0, 0],
  ]);
  const [turnColor, setTurnColor] = useState(1);

  const clickHundler = (x: number, y: number) => {
    const newBoard = structuredClone(board);

    let number = 1;

    while (number < 8) {
      number += 1;
      if (board[y + number] !== undefined && board[y + number][x] === 2 / turnColor) {
        console.log(number);
      } else {
        if (board[y + number] !== undefined && board[y + number][x] === turnColor) {
          break;
        }
      }
    }

    for (let i = 0; i < number; i++) {
      newBoard[y][x] = turnColor;
      newBoard[y + i][x] = turnColor;
    }
    setTurnColor(3 - turnColor);
    setBoard(newBoard);
  };

  return (
    <div className={styles.container}>
      <div className={styles.board}>
        {board.map((row, y) =>
          row.map((color, x) => (
            <div className={styles.cell} key={`${x}-${y}`} onClick={() => clickHundler(x, y)}>
              {board[y][x] !== 0 && (
                <div
                  className={styles.stone}
                  style={{ background: color === 1 ? '#000' : '#FFF' }}
                />
              )}
            </div>
          )),
        )}
      </div>
    </div>
  );
}
