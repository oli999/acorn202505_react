// src/pages/MemberForm.jsx

import axios from "axios";
import { useState } from "react";
import { Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function MemberForm() {
    //필드 에러 정보를 상태값으로 관리 
    const [errors , setErrors] = useState({});

    //javascript 로 라우팅할수 있는 함수 얻어내기
    const navigate = useNavigate();
    //form 에 submit 이벤트가 발생했을때 실행할 함수
    const handleSubmit = (e)=>{
        //기본동작 막기(form 제출 막기)
        e.preventDefault();
        //이벤트가 발생한 요소의 참조값(form 요소의 참조값)
        const form=e.target;    
        //폼에 입력한 내용을 담고 있는 FormData 객체를 얻어낸다.
        const formData=new FormData(form);
        //폼에 입력한 내용을 object 로 변환
        const obj=Object.fromEntries(formData);
        // axios 를 이용해서 post 방식 요청하기
        axios.post("/api/v2/members", obj)
        .then(res=>{
            //res.data 는 방금 추가한 회원의 정보이다. 
            console.log(res.data);
            //추가한 회원 자세히 보기로 이동
            navigate(`/members/${res.data.num}`, {
                state:{
                    message:"새로 추가된 회원정보"
                }
            });
        })
        .catch(err => {
            //err 는 에러 정보를 담고 있는 object 이다 
            console.log(err);
            //필드 에러 객체를 상태값에 넣어준다 
            setErrors(err.response.data.errors);
        });
    };
   
    return <>
        
        <h1>회원 추가 양식</h1>
        <form action="/api/v1/members" method="post" onSubmit={handleSubmit}>
            <div className="mb-3">
                <label className="form-label" htmlFor="name">이름</label>
                <input className="form-control" type="text" name="name" id="name"/>
                {/* 필드 에러 객체에 name 에러 정보가 있으면 에러 정보를 출력한다 */}
                { errors.name && <p className="form-text text-danger">{errors.name}</p>}
            </div>
            <div className="mb-3">
                <label className="form-label" htmlFor="addr">주소</label>
                <input className="form-control" type="text" name="addr" id="addr"/>
                {/* 필드 에러 객체에 addr 에러 정보가 있으면 에러 정보를 출력한다 */}
                { errors.addr && <p className="form-text text-danger">{errors.addr}</p>}
            </div>
            <button className="btn btn-success" type="submit">저장</button>
        </form>
    </>
}

export default MemberForm;