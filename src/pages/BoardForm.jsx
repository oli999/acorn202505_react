// src/pages/BoardForm.jsx

import { useState } from "react";
import ToastEditor from "../components/ToastEditor";
import api from '../api';
import { useNavigate } from "react-router-dom";

function BoardForm() {

    //작성한 글 제목과 내용을 상태값으로 관리 
    const [state, setState] = useState({
        title:"",
        content:""
    });
    //제목을 수정했을때 실행할 함수 
    const handleTitleChange = (e)=>{
        //함수형 setState 를 이용해서 상태값을 변경하자 
        setState(prev => ({
            ...prev,
            title:e.target.value
        }));
    };
    //내용을 작성했을때 실행할 함수 (작성한 내용을 함수의 매개변수에 전달 받도록 한다)
    const handleContentChange = (content)=>{
        setState(prev => ({
            ...prev,
            content
        }));
        //테스트로 실제 content 가 잘 들어오는지 확인하기
        //console.log(content);
    };

    const navigate = useNavigate();

    //폼 제출 버튼을 눌렀을때 실행할 함수
    const handleSubmit = async (e)=>{
        e.preventDefault();
        //현재 state 를 콘솔에 출력하기 
        console.log(state);
        try{
            const res = await api.post("/v1/board", state);
            alert("글을 저장했습니다");
            //글 자세히 보기로 이동
            navigate(`/board`);
        }catch(err){
            console.log(err);
        }
    };

    return <>
		<h1>게시글 작성 양식</h1>
		<form onSubmit={handleSubmit} action="/v1/board" method="post">
			<div className="mb-2">
				<label className="form-label" htmlFor="title">제목</label>
				<input onChange={handleTitleChange} className="form-control" type="text" id="title"/>
			</div>
			<div className="mb-2">
				<label className="form-label" htmlFor="editor">내용</label>
                <ToastEditor onChange={handleContentChange}/>
			</div>
			<button className="btn btn-success btn-sm" type="submit">저장</button>
		</form>    
    </>
}

export default BoardForm;