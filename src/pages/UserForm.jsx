// src/pages/UserForm.jsx

import { useEffect, useState } from "react";
import cn from 'classnames';
import api from "../api";
import { Alert } from "react-bootstrap";
import { useDispatch } from "react-redux";

function UserForm() {
    //폼에 입력한 내용을 상태값으로 관리
    const [state, setState]=useState({
        userName:"",
        password:"",
        pwd2:"",
        email:""
    });
    //폼 입력란의 유효성 여부 상태값 관리
    const [valid, setValid]=useState({
        userName:false,
        password:false,
        email:false
    });
    //폼 입력란 dirty 값 관리
    const [dirty, setDirty]=useState({
        userName:false,
        password:false,
        email:false
    });
    //에러 메세지를 상태값으로 관리 
    const [errorMsg, setErrorMsg]=useState(null);

    //userName 을 검증할 정규표현식
    const regUserName = /^[a-z].{4,9}$/;
    //비밀번호 정규 표현식
    const regPwd = /[\W]/;
    //이메일 정규 표현식
    const regEmail = /@/;

    //state 가 변경되었을때 실행할 함수 
    useEffect(()=>{
        setValid({
            userName: regUserName.test(state.userName),
            password: regPwd.test(state.password) && state.password === state.pwd2,
            email: regEmail.test(state.email)
        });
    }, [state]);

    const handleChange = (e)=>{
        setDirty({
            ...state,
            [e.target.name]:true
        });
        setState({
            ...state,
            [e.target.name]:e.target.value
        });
    };
    const dispatch=useDispatch();
    //폼에 submit 이벤트가 발생했을때 처리
    const handleSubmit = async (e)=>{
        e.preventDefault();

        //에러 메세지 초기화 
        setErrorMsg(null);
        //console.log(e.target.action);
        try{
            // 이미 가입된 아이디라면 여기서 예외가 발생한다. (catch 블럭이 실행됨)
            // axios 는 200 번대 응답이 아니면 무조건 예외를 발생시킨다 
            await api.post("/v1/user", state);
            //로그인창을 띄워준다.
            dispatch({
                type:"LOGIN_MODAL",
                payload:{title:"가입된 아이디로 로그인을 하세요", show:true, url:"/user"}
            });
        }catch(err){
            console.log(err);
            //에러 state 에 에러 메세지를 넣어준다 
            setErrorMsg(err.response.data);
        }
    };

    return <>
        <h1>회원 가입 양식</h1>

        {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}

        <form onSubmit={handleSubmit} action="/v1/user" method="post" noValidate>
			<div className="mb-2">
				<label className="form-label" htmlFor="userName">아이디</label>
				<input onChange={handleChange} 
                    className={cn("form-control", {"is-valid": valid.userName, "is-invalid": !valid.userName && dirty.userName})} 
                    type="text" name="userName" id="userName"/>
				<small className="form-text">영문자 소문자로 시작하고 5글자~10글자 이내로 입력하세요</small>
				<div className="valid-feedback">사용 가능한 아이디 입니다.</div>
				<div className="invalid-feedback">사용할 수 없는 아이디 입니다.</div>
			</div>
			<div className="mb-2">
				<label className="form-label" htmlFor="password">비밀번호</label>
				<input onChange={handleChange} 
                    className={cn("form-control", {"is-valid": valid.password, "is-invalid": !valid.password && dirty.password})} 
                    type="password" name="password" id="password"/>
				<small className="form-text">특수 문자를 하나 이상 조합하세요.</small>
				<div className="invalid-feedback">비밀 번호를 확인 하세요</div>
			</div>
			<div className="mb-2">
				<label className="form-label" htmlFor="pwd2">비밀번호 확인</label>
				<input onChange={handleChange} className="form-control" type="password" name="pwd2"  id="pwd2"/>
			</div>
			<div className="mb-2">
				<label className="form-label" for="email">이메일</label>
				<input onChange={handleChange} 
                    className={cn("form-control", {"is-valid": valid.email, "is-invalid": !valid.email && dirty.email})} 
                    type="email" name="email" id="email"/>
				<div className="invalid-feedback">이메일 형식에 맞게 입력하세요.</div>
			</div>
			<button disabled={!valid.userName || !valid.password || !valid.email}
                className="btn btn-primary btn-sm" type="submit">가입</button>
		</form>
    </>
}

export default UserForm;