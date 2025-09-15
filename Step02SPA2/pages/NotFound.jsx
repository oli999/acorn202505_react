// src/pages/NotFound.jsx

import { Button } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";

function NotFound() {

    const navigate = useNavigate();

    return <>
        <h1>404</h1>
        <p>페이지를 찾을수 없습니다</p>
        <p>주소가 잘못 되었거나, 페이지가 이동/삭제 되었을 수 있어요.</p>
        <Button variant="primary" as={NavLink} to="/">홈으로</Button>
        <Button variant="warning" className="ms-1" onClick={()=>navigate(-1)}>이전 페이지</Button>
    </>
}

export default NotFound;