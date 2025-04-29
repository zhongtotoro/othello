'use client';

import { useState } from 'react';
import styles from './page.module.css';
export default function Home() {
  const [board, setBoard] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 2, 0, 0, 0, 0],
    [0, 0, 0, 2, 0, 0, 0, 0],
    [0, 0, 2, 2, 0, 0, 0, 0],
    [0, 2, 1, 1, 0, 0, 2, 0],
    [0, 2, 1, 2, 0, 1, 2, 0],
    [0, 1, 2, 2, 0, 0, 1, 0],
    [0, 0, 1, 1, 2, 0, 0, 0],
  ]);
  const [turnColor, setTurnColor] = useState(1);

  const clickHundler = (x: number, y: number) => {
    if (board[y][x] !== 0) {
      //既に石が置いてあったらおけない
      return;
    }
    const newBoard = structuredClone(board);

    let dif = 0;
    let same = 0;
    while (true) {
      if (board[y + dif + 1] === undefined || board[y + dif + 1][x] === 0) {
        break; //盤外か空きマスだったら調査終わり
      }

      if (board[y + dif + 1][x] === turnColor) {
        same += 1;
        break; //自分と同じ色を見つけたら調査終わり
      }

      if (board[y + dif + 1][x] === 2 / turnColor) {
        dif += 1;
        continue; //違う色だったら調査続行
      }
    }

    if (0 < dif && 0 < same) {
      //自分と同じ色があり、かつ、一枚でも違う色があれば
      for (let i = 1; i <= dif; i++) {
        newBoard[y + i][x] = turnColor; //ひっくり返す
      }
      newBoard[y][x] = turnColor; //はじめて新しい石が置ける
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
