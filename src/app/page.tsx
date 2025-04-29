'use client';

import { useState } from 'react';
import styles from './page.module.css';
export default function Home() {
  const [board, setBoard] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 2, 0, 0, 0],
    [0, 0, 0, 2, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ]);
  const [turnColor, setTurnColor] = useState(1);

  const clickHundler = (x: number, y: number) => {
    if (board[y][x] !== 0) {
      //既に石が置いてあったらおけない
      return;
    }
    const newBoard = structuredClone(board);

    let updif = 0; //↑検証下における動く
    let upsame = 0;

    while (true) {
      if (board[y - updif - 1] === undefined || board[y - updif - 1][x] === 0) {
        break; //盤外か空きマスだったら調査終わり
      }

      if (board[y - updif - 1][x] === turnColor) {
        upsame += 1;
        break; //自分と同じ色を見つけたら調査終わり
      }

      if (board[y - updif - 1][x] === 2 / turnColor) {
        updif += 1;
        continue; //違う色だったら調査続行
      }
    }

    if (0 < updif && 0 < upsame) {
      //自分と同じ色があり、かつ、一枚でも違う色があれば
      for (let i = 1; i <= updif; i++) {
        newBoard[y - i][x] = turnColor; //ひっくり返す
        console.log(y, x);
      }
      newBoard[y][x] = turnColor; //はじめて新しい石が置ける
    } //↑検証終わり*/

    let downdif = 0; //↓検証、上における動く
    let downsame = 0;
    while (true) {
      if (board[y + downdif + 1] === undefined || board[y + downdif + 1][x] === 0) {
        break; //盤外か空きマスだったら調査終わり
      }

      if (board[y + downdif + 1][x] === turnColor) {
        downsame += 1;
        break; //自分と同じ色を見つけたら調査終わり
      }

      if (board[y + downdif + 1][x] === 2 / turnColor) {
        downdif += 1;
        continue; //違う色だったら調査続行
      }
    }

    if (0 < downdif && 0 < downsame) {
      //自分と同じ色があり、かつ、一枚でも違う色があれば
      for (let i = 1; i <= downdif; i++) {
        newBoard[y + i][x] = turnColor; //ひっくり返す
      }
      newBoard[y][x] = turnColor; //はじめて新しい石が置ける
    } //↓検証終わり */

    let rightdif = 0; //→検証左における動く
    let rightsame = 0;
    while (true) {
      if (board[x + rightdif + 1] === undefined || board[y][x + rightdif + 1] === 0) {
        break; //盤外か空きマスだったら調査終わり
      }

      if (board[y][x + rightdif + 1] === turnColor) {
        rightsame += 1;
        break; //自分と同じ色を見つけたら調査終わり
      }

      if (board[y][x + rightdif + 1] === 2 / turnColor) {
        rightdif += 1;
        continue; //違う色だったら調査続行
      }
    }

    if (0 < rightdif && 0 < rightsame) {
      //自分と同じ色があり、かつ、一枚でも違う色があれば
      for (let i = 1; i <= rightdif; i++) {
        newBoard[y][x + i] = turnColor; //ひっくり返す
      }
      newBoard[y][x] = turnColor; //はじめて新しい石が置ける
    } //→検証終わり*/

    let leftdif = 0; //←検証、右における、動いた！！
    let leftsame = 0;
    while (true) {
      if (board[x - leftdif - 1] === undefined || board[y][x - leftdif - 1] === 0) {
        break; //盤外か空きマスだったら調査終わり
      }

      if (board[y][x - leftdif - 1] === turnColor) {
        leftsame += 1;
        break; //自分と同じ色を見つけたら調査終わり
      }

      if (board[y][x - leftdif - 1] === 2 / turnColor) {
        leftdif += 1;
        continue; //違う色だったら調査続行
      }
    }

    if (0 < leftdif && 0 < leftsame) {
      //自分と同じ色があり、かつ、一枚でも違う色があれば
      for (let i = 1; i <= leftdif; i++) {
        newBoard[y][x - i] = turnColor; //ひっくり返す
      }
      newBoard[y][x] = turnColor; //はじめて新しい石が置ける
    } //←検証終わり*/

    let rdowndif = 0; //↘検証,左上における,動く
    let rdownsame = 0;

    while (true) {
      if (
        board[y + rdowndif + 1][x + rdowndif + 1] === undefined ||
        board[y + rdowndif + 1][x + rdowndif + 1] === 0
      ) {
        break; //盤外か空きマスだったら調査終わり
      }

      if (board[y + rdowndif + 1][x + rdowndif + 1] === turnColor) {
        rdownsame += 1;
        break; //自分と同じ色を見つけたら調査終わり
      }

      if (board[y + rdowndif + 1][x + rdowndif + 1] === 2 / turnColor) {
        rdowndif += 1;
        continue; //違う色だったら調査続行
      }
    }

    if (0 < rdowndif && 0 < rdownsame) {
      //自分と同じ色があり、かつ、一枚でも違う色があれば
      for (let i = 1; i <= rdowndif; i++) {
        newBoard[y + i][x + i] = turnColor; //ひっくり返す
      }
      newBoard[y][x] = turnColor; //はじめて新しい石が置ける
    } //↘検証終わり*/

    let ldowndif = 0; //↙検証,右上における動いた！！！
    let ldownsame = 0;
    while (true) {
      if (
        board[y + ldowndif + 1][x - ldowndif - 1] === undefined ||
        board[y + ldowndif + 1][x - ldowndif - 1] === 0
      ) {
        break; //盤外か空きマスだったら調査終わり
      }

      if (board[y + ldowndif + 1][x - ldowndif - 1] === turnColor) {
        ldownsame += 1;
        break; //自分と同じ色を見つけたら調査終わり
      }

      if (board[y + ldowndif + 1][x - ldowndif - 1] === 2 / turnColor) {
        ldowndif += 1;
        continue; //違う色だったら調査続行
      }
    }

    if (0 < ldowndif && 0 < ldownsame) {
      //自分と同じ色があり、かつ、一枚でも違う色があれば
      for (let i = 1; i <= ldowndif; i++) {
        newBoard[y + i][x - i] = turnColor; //ひっくり返す
      }
      newBoard[y][x] = turnColor; //はじめて新しい石が置ける
    } //↙検証終わり*/

    let lupdif = 0; //↖↖検証右下に置く動いた！！
    let lupsame = 0;
    while (true) {
      if (
        board[y - lupdif - 1][x - lupdif - 1] === undefined ||
        board[y - lupdif - 1][x - lupdif - 1] === 0
      ) {
        break; //盤外か空きマスだったら調査終わり
      }

      if (board[y - lupdif - 1][x - lupdif - 1] === turnColor) {
        lupsame += 1;
        break; //自分と同じ色を見つけたら調査終わり
      }

      if (board[y - lupdif - 1][x - lupdif - 1] === 2 / turnColor) {
        lupdif += 1;
        continue; //違う色だったら調査続行
      }
    }

    if (0 < lupdif && 0 < lupsame) {
      //自分と同じ色があり、かつ、一枚でも違う色があれば
      for (let i = 1; i <= lupdif; i++) {
        newBoard[y - i][x - i] = turnColor; //ひっくり返す
      }
      newBoard[y][x] = turnColor; //はじめて新しい石が置ける
    } //↖検証終わり*/

    let rupdif = 0; //↗検証左下における、動いた！！
    let rupsame = 0;
    while (true) {
      //↗検証
      if (
        board[y - rupdif - 1][x + rupdif + 1] === undefined ||
        board[y - rupdif - 1][x + rupdif + 1] === 0
      ) {
        break; //盤外か空きマスだったら調査終わり
      }

      if (board[y - rupdif - 1][x + rupdif + 1] === turnColor) {
        rupsame += 1;
        break; //自分と同じ色を見つけたら調査終わり
      }

      if (board[y - rupdif - 1][x + rupdif + 1] === 2 / turnColor) {
        rupdif += 1;
        continue; //違う色だったら調査続行
      }
    }

    if (0 < rupdif && 0 < rupsame) {
      //自分と同じ色があり、かつ、一枚でも違う色があれば
      for (let i = 1; i <= rupdif; i++) {
        newBoard[y - i][x + i] = turnColor; //ひっくり返す
      }
      newBoard[y][x] = turnColor; //はじめて新しい石が置ける
    } //↗↗検証終わり*/

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
