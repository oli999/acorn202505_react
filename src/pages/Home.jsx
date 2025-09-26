// src/pages/Home.jsx

import api from "../api";
import { useEffect, useState } from "react";
import ToastEditor from "../components/ToastEditor";
import { Button } from "react-bootstrap";
import cn from 'classnames';

function Home() {
    
    //공지사항
    const [noticeList, setNoticeList] = useState([]);

    useEffect(()=>{
        api.get("/v1/notice")
        .then(res=>setNoticeList(res.data))
        .catch(err=>console.log(err));
    }, []);
    //숨길지 여부를 hide state 값으로 관리 (초기값 false)
    const [hide, setHide]=useState(true);
    const handleHide= ()=>{
        // hide 가 true 면 false , hide 가 false 면 true 의 결과가 나온다
        const result = hide ? false : true;
        setHide(result);
    } ;

    // 그룹 토글 Set 객체를 상태값으로 관리한다 (초기값은 빈 Set)
    const [openGroups, setOpenGroups] = useState(new Set());

    const toggleGroups = (groupNum) =>{
        //기존 Set 객체에 저장된 내용을 이용해서 새로운 Set 객체 만들기
        const set = new Set(openGroups);
        if(set.has(groupNum)){//번호가 존재하면
            //Set 에서 번호 제거
            set.delete(groupNum);
        }else{//번호가 없으면
            //Set 에 번호 추가
            set.add(groupNum);
        }
        //업데이트된 Set 로 상태값 변경
        setOpenGroups(set);
    };

    return (
        <>
            <h1>인덱스 페이지 입니다</h1>
            <h2>공지 사항</h2>
            <Button variant="primary" onClick={handleHide}>
                {hide ? "보기" : "숨기기"}
            </Button>
            <ul className={cn({"d-none":hide})}>
                {/* map() 함수에 전달한 함수에는 2번째 매개변수에 item 의 인덱스 값도 전달된다 */}
                {noticeList.map((item, index) => <li key={index}>{item}</li>)}
            </ul>

            <h2>공지 사항1</h2>
            <Button onClick={()=>toggleGroups(1)}  variant="primary">
                {openGroups.has(1) ? "숨기기" : "보기"}
            </Button>
            <ul className={cn({"d-none": !openGroups.has(1)})}>
                {/* map() 함수에 전달한 함수에는 2번째 매개변수에 item 의 인덱스 값도 전달된다 */}
                {noticeList.map((item, index) => <li key={index}>{item}</li>)}
            </ul>

            <h2>공지 사항2</h2>
            <Button onClick={()=>toggleGroups(2)} variant="primary">
                {openGroups.has(2) ? "숨기기" : "보기"}
            </Button>
            <ul className={cn({"d-none": !openGroups.has(2)})}>
                {/* map() 함수에 전달한 함수에는 2번째 매개변수에 item 의 인덱스 값도 전달된다 */}
                {noticeList.map((item, index) => <li key={index}>{item}</li>)}
            </ul>
        </>
    );
}

export default Home;