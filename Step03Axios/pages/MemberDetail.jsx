// src/pages/MemberDetail.jsx

import axios from "axios";
import { useEffect, useState } from "react";
import { Alert, Button } from "react-bootstrap";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";

function MemberDetail() {
    // location 은 object 인데 location 객체가 가지고 있는 정보를 확인할수 있다.
    //const location = useLocation();
    
    // location 객체에서 state 정보만 얻어낸다 (null 일수도 있음)
    const {state} = useLocation();

    // ui 에 출력할 회원 정보를 state 값으로 관리한다.
    const [dto, setDto] = useState({});

    // 경로 변수에 있는 값을 읽어내기 
    //  {path:"/members/:num", element:<MemberDetail/>}  라우팅 정보에서 :num 때문에 {num} 이다
    const {num} = useParams(); 

    //컴포넌트가 활성화 되는 시점에 자세히 보여줄 회원의 정보를 api 로 부터 얻어낸다.
    useEffect(()=>{
        /*
        axios.get(`/api/v1/members/${num}`)
        .then(res=>setDto(res.data))
        .catch(err=>console.log(err));
        */

        //비동기로 동작하는 함수를 만들어서 바로 호출하기 
        //함수안에 await 이 있으면 해당 함수에는 반드시 asnyc 를 붙여 주어야 한다. 
        ( async ()=>{
            try{
                // promise 가 해결(서버가 응답) 되면 res 에는 응답 객체가 대입된다.
                const res = await axios.get(`/api/v1/members/${num}`);
                //상태값 변경하기
                setDto(res.data);
            }catch(err){
                console.log(err);
            }
        })();

    }, []);

    const navigate = useNavigate();

    // 함수 내부에 await 이 있기때문에 asnyc 예약어를 함수에 붙여준다.
    const handleDelete = async ()=>{
        try{
            // axios 를 이용해서 삭제 요청을 한다 
            await axios.delete(`/api/v1/members/${dto.num}`);
            alert("삭제 했습니다.");
            navigate("/members");
        }catch(err){
            console.log(err);
        }
    }

    return <>
        { state && <Alert className="mt-3" variant="info">{state.message}</Alert>}
        <h1>회원 정보 자세히 보기</h1>
        <p> 번호 : <strong>{dto.num}</strong></p>
        <p> 이름 : <strong>{dto.name}</strong></p>
        <p> 주소 : <strong>{dto.addr}</strong></p>
        <Button variant="primary" as={NavLink} to={`/members/${dto.num}/edit`}>수정</Button>
        <Button variant="danger" onClick={handleDelete}>삭제</Button>
    </>
}

export default MemberDetail;