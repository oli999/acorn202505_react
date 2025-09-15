// src/pages/ClientForm.jsx

import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ClientForm() {
    // route 이동을 위한 함수 
    const navigate = useNavigate();
    // 에러를 상태값으로 관리
    const [errors, setErrors] = useState({});
    
    //폼에 submit 이벤트가 일어 났을때 실행할 함수
    const handleSubmit = (e)=>{
        //폼 전송막기
        e.preventDefault();
        //이벤트가 일어난 바로 그요소(form)의 참조값
        const form = e.target;
        const formData = new FormData(form);
        //폼에 입력한 내용을 이용해서 object 얻어내기 
        const obj = Object.fromEntries(formData);
        console.log(obj);
        // axios.post(form.action, obj)
        axios[form.method](form.action, obj)
        .then(res=>{
            //client 정보 추가 성공!
            // res.data 는 방금 추가한 고객정보
            navigate(`/clients/${res.data.num}`, {
                state:{message:"고객 정보를 추가 했습니다"}
            });
        })
        .catch(err=>{
            //client 정보 추가 실패! (@Valid 위반)
            console.log(err);
            // @Valid 에러 객체를 state 에 넣어준다.
            setErrors(err.response.data.errors);
        });
    };

    return <>
		<h3>새 Client 등록 양식</h3>
		<form onSubmit={handleSubmit} action="/api/v1/clients" method="post" >
		    <div className="mb-3">
		      <label className="form-label" htmlFor="userName">userName <span className="text-danger">*</span></label>
		      <input name="userName" type="text" className="form-control"  placeholder="이름 입력" />
		      { errors.userName && <small className="text-danger">{errors.userName}</small> }
		    </div>
			<div className="mb-3">
				<label className="form-label" id="birthday">생일 (선택)</label>
				<input name="birthday" type="date" className="form-control" />
				<small className="form-text text-muted">나중에 입력 가능</small>
				{ errors.birthday && <small className="text-danger">{errors.birthday}</small>}
			</div>
			<button className="btn btn-success" type="submit">등록</button>
		</form>    
    </>
}

export default ClientForm;