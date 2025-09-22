// src/pages/Home.jsx

import api from "../api";
import { useEffect, useState } from "react";
import ToastEditor from "../components/ToastEditor";

function Home() {
    
    //공지사항
    const [noticeList, setNoticeList] = useState([]);

    useEffect(()=>{
        api.get("/v1/notice")
        .then(res=>setNoticeList(res.data))
        .catch(err=>console.log(err));
    }, []);
    return (
        <>
            <h1>인덱스 페이지 입니다</h1>
            <h2>공지 사항</h2>
            <ul>
                {/* map() 함수에 전달한 함수에는 2번째 매개변수에 item 의 인덱스 값도 전달된다 */}
                {noticeList.map((item, index) => <li key={index}>{item}</li>)}
            </ul>
        </>
    );
}

export default Home;