// src/pages/Home.jsx

import { NavLink } from "react-router-dom";

function Home() {
    return (
        <>
            <h1>인덱스 페이지 입니다</h1>
            <ul>
                <li>
                    <NavLink to="/members">회원목록</NavLink>
                </li>
            </ul>
        </>
    );
}

export default Home;