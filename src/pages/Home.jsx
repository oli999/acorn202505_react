// src/pages/Home.jsx

import { NavLink } from "react-router-dom";
import ToastEditorRaw from "../../Step01Basic/components/ToastEditorRaw";

function Home() {
    return (
        <>
            <h1>인덱스 페이지 입니다</h1>
            <ul>
                <li>
                   <NavLink to="/study">공부하기</NavLink>
                </li>
                <li>
                   <NavLink to="/play">놀러가기</NavLink>
                </li>
            </ul>
        </>
    );
}

export default Home;