// src/pages/MemberUpdateForm.jsx

import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function MemberUpdateForm() {

    // "/members/:num/edit" 에서 num 에 전달된값 읽어내기 
    const {num} = useParams();
    // 수정할 회원의 정보를 상태값으로 관리하기
    const [dto, setDto] = useState({
        name:"",
        addr:""
    });

    //필드 에러 정보를 상태값으로 관리 
    const [errors , setErrors] = useState({});

    useEffect(()=>{
        axios.get(`/api/v1/members/${num}`)
        .then(res=>setDto(res.data));
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
        //폼 제출 막기
        e.preventDefault();
        //e.target 은 form 요소
        //e.target.action 은 form 요소에 작성한 action 속성의 값 
        // axios.put("요청 url", object )   object 를 전달하면 자동으로 json 으로 변경
        try{
            await axios.put(e.target.action, dto);
            alert("수정했습니다.");
            navigate(`/members/${num}`, {
                state:{message:"수정된 회원정보 입니다"}
            });
        }catch(err){
            console.log(err);
            //필드 에러 객체를 상태값에 넣어준다 
            setErrors(err.response.data.errors);
        }
    };

    return <>
        <h1>회원정보 수정 양식</h1>
        <form action={`/api/v2/members/${dto.num}`} onSubmit={handleSubmit}>
            <div>
                <label className="form-label" htmlFor="name">이름</label>
                <input className="form-control" onChange={handleChange} type="text" name="name" id="name" value={dto.name}/>
                { errors.name && <p className="form-text text-danger">{errors.name}</p>}
            </div>
            <div>
                <label className="form-label" htmlFor="addr">주소</label>
                <input className="form-control" onChange={handleChange} type="text" name="addr" id="addr" value={dto.addr}/>
                { errors.addr && <p className="form-text text-danger">{errors.addr}</p>}
            </div>
            <button className="btn btn-success" type="submit">수정확인</button>
        </form>
    </>
}

export default MemberUpdateForm;