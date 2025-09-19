// src/pages/UserPwdUpdateForm.jsx

import { useRef } from "react";
import api from "../api";

function UserPwdUpdateForm() {
    // input 요소의 참조값을 얻어오기 위한 hook
    const pwdRef = useRef();
    const newPwdRef = useRef();
    const newPwdRef2 = useRef();

    const handleSubmit = (e)=>{
        e.preventDefault();
        //기존 비밀번호  pwdRef.current 은 비밀번호 입력 input 요소의 참조값이다 
        const pwd = pwdRef.current.value;
        //새 비밀번호
        const newPwd = newPwdRef.current.value;
        //새 비밀번호 확인
        const newPwd2 = newPwdRef2.current.value;
        if(pwd.trim() == ""){ // 문자열에서 공백제거(좌우 공백)해서 비교 
            alert("기존 비밀번호를 입력하세요!");
            return;
        }else if(newPwd.trim() == ""){
            alert("새 비밀번호를 입력하세요!");
            return;
        }else if(newPwd.trim() != newPwd2.trim()){
            alert("새 비밀번호를 확인란과 동일하게 입력하세요!");
            return;
        }
        // e.target 은 form 요소, e.target.action 은 form 요소의 action 속성값
        api.patch(e.target.action, {
            password:pwd,
            newPassword:newPwd
        })
        .then(res=>{})
        .catch(err=>{});
    };

    return <>
    	<h1>비밀번호 수정 양식</h1>	
		<p className="alert alert-danger"></p>	

		<form onSubmit={handleSubmit} action="/v1/user/password" >
			<div className="mb-2">
				<label className="form-label" htmlFor="password">기존 비밀번호</label>
				<input ref={pwdRef} className="form-control" type="password" name="password" id="password"/>
			</div>
			<div className="mb-2">
				<label className="form-label" htmlFor="newPassword">새 비밀번호</label>
				<input ref={newPwdRef} className="form-control" type="password" name="newPassword" id="newPassword"/>
			</div>
			<div className="mb-2">
				<label className="form-label" htmlFor="newPassword2">새 비밀번호 확인</label>
				<input ref={newPwdRef2} className="form-control" type="password" id="newPassword2"/>
			</div>
			<button className="btn btn-sm btn-success" type="submit">수정하기</button>
		</form>
    </>
}

export default UserPwdUpdateForm;