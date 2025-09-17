// src/pages/Game.jsx

import { NavLink } from "react-router-dom";

function Game() {
    return <>
        <h1>Game 페이지 입니다</h1>
        <p>로그인된 회원만 게임할수 있어요</p>
        <NavLink to="/">인덱스로</NavLink>
    </>
}

export default Game;