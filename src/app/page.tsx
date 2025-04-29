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

    let count = 0;

    // 1) 「相手色」が連続する限りカウント up
    while (true) {
      const ny = y + count + 1;
      // 盤外 or 空マスなら終了（ひっくり返し不成立扱い）
      if (board[ny][x] === undefined || board[ny][x] === 0) {
        count = 0;
        break;
      }
      // 相手色ならカウント増やして継続
      if (board[ny][x] === 3 - turnColor) {
        count += 1;
        continue;
      }
      // 自分の色なら成立
      if (board[ny][x] === turnColor) {
        break;
      }
    }

    // 2) count > 0 のときだけ裏返し
    if (count > 0) {
      for (let i = 1; i <= count; i++) {
        newBoard[y + i][x] = turnColor;
      }
      newBoard[y][x] = turnColor;
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
