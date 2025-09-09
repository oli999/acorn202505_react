// src/pages/MemberDetail.jsx

import { useEffect, useState } from "react";
import { Alert, Button } from "react-bootstrap";
import { NavLink, useNavigate, useParams, useSearchParams } from "react-router-dom";
import Bread from "../components/Bread";
import ConfirmModal from "../components/ComfirmModal";

function MemberDetail() {
    //자세히 보여줄 회원의 번호를 읽어와서
    // react router 에서 제공해주는 hook 을 이용해서 
    // "/members/:num" 에서 num 에 해당하는 자세히 보여줄 회원의 번호를 얻어낸다.
    const {num} = useParams();

    // "/members/x?message=success"  에서 query 파라미터를 추출하기 위한 hook
    const [params] = useSearchParams();
    //console.log(params);
    // "success" or null 이다 
    //console.log(params.get("message"));

    //API 서버에 해당 회원 한명의 정보를 받아와서 ui 에 출력한다 
    const [dto, setDto] = useState({});
    //ConfirmModal 을 띄울지 여부를 상태값으로 관리한다.
    const [showModal, setShowModal] = useState(false);
   
    useEffect(()=>{
        fetch(`/api/v1/members/${num}`)
        .then(res=>res.json())
        .then(data=>setDto(data));
    }, []);

    const bread = [
        {name:"Members", to:"/members"},
        {name:"Detail"}
    ];

    const navigate = useNavigate();

    //삭제 확인을 눌렀을때 실행할 함수 
    const handleYes = ()=>{
        fetch(`/api/v1/members/${dto.num}`, {
            method:"delete"
        })
        .then(res=>res.json())
        .then(data=>{
            navigate("/members");
        });
    };

    return <>
        <Bread list={bread}/>
        { params.get("message") && <Alert className="m-4" variant="success">저장했습니다</Alert>}
        <h1>회원 자세히 보기</h1>
        <p>번호 : <strong>{dto.num}</strong></p>
        <p>이름 : <strong>{dto.name}</strong></p>
        <p>주소 : <strong>{dto.addr}</strong></p>
        {/* 
            여기에 수정, 삭제 버튼을 만들고 동작하도록 만들어 보세요 
            수정은 MemberUpdateForm.jsx 컴포넌트를 만들어서 동작하도록 하고
            삭제는 정말로 삭제 하시겠습니까? 라는 bootstrap Modal 을 띄워서 동작하도록 해 보세요.

            "/members/1/edit"  => 수정 routing 경로 

        */}
        <Button variant="success" as={NavLink} to={`/members/${dto.num}/edit`}>수정</Button>
        <Button variant="danger" className="ms-1" onClick={()=>setShowModal(true)}>삭제</Button>
        <ConfirmModal show={showModal} 
            message="삭제 하시겠습니까?" 
            onCancel={()=>setShowModal(false)}
            onYes={handleYes}/>
    </> 
}

export default MemberDetail;