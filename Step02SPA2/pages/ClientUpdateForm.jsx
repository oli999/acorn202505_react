// src/pages/ClientUpdateForm.jsx

import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


function ClientUpdateForm() {
    // "/clients/:num/edit" 에서 num 에 전달된값 읽어내기 
    const {num} = useParams();
    // 수정할 고객의 정보를 상태값으로 관리하기
    const [dto, setDto] = useState({
        userName:"",
        birthday:""
    });
    //원본 dto 값을 상태값으로 관리 
    const [originalDto, setOriginalDto] = useState({}); 

    //필드 에러 정보를 상태값으로 관리 
    const [errors , setErrors] = useState({});

    useEffect(()=>{
        axios.get(`/api/v1/clients/${num}`)
        .then(res=>{
            setDto(res.data);
            setOriginalDto(res.data);
        });
    }, []);

    // input 요소에 입력한 값을 이용해서 상태값에 반영하기 위한 함수 
    const handleChange = (e)=>{
        setDto({
            ...dto,
            [e.target.name]:e.target.value
        });
    };

    const navigate = useNavigate();

    // form 에 submit 이벤트가 발생했을때 실행할 함수
    const handleSubmit = async (e)=>{
        e.preventDefault();
        try{
            await axios.put(e.target.action, dto);
            alert("수정했습니다.");
            navigate(`/clients/${num}`, {
                state:{message:"수정된 고객정보 입니다"}
            });
        }catch(err){
            console.log(err);
            //필드 에러 객체를 상태값에 넣어준다 
            setErrors(err.response.data.errors);
        }
    };

    return <>
		<h3>고객 정보 수정 양식</h3>
		<form  action={`/api/v1/clients/${num}`} onSubmit={handleSubmit}>
			<div className="mb-3">
				<label className="form-label" htmlFor="userName">이름</label>
				<input onChange={handleChange}  value={dto.userName} name="userName" className="form-control" type="text" />
				{ errors.userName && <small className="text-danger">{errors.userName}</small>}
			</div>
			<div className="mb-3">
				<label className="form-label" htmlFor="birthday">생일</label>
				<input onChange={handleChange} value={dto.birthday} name="birthday" className="form-control" type="date" />
				{ errors.birthday && <small className="text-danger">{errors.birthday}</small>}
			</div>
			<button className="btn btn-primary" type="submit">수정확인</button>
			<button onClick={()=>setDto(originalDto)} className="ms-1 btn btn-secondary" type="reset">취소</button>
		</form>    
    </>
}

export default ClientUpdateForm;