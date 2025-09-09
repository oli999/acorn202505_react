// src/pages/MemberUpdateForm.jsx

import { useNavigate, useParams } from 'react-router-dom';
import Bread from '../components/Bread'
import { useEffect, useState } from 'react';

function MemberUpdateForm() {

    //수정할 회원의 번호 얻어내기
    const {num} = useParams();
    // object 안에 빈값을 미리 넣어준다 
    const [dto, setDto] = useState({
        num:null,
        name:"",
        addr:""
    })
    //수정할 회원의 정보를 api 서버로 부터 받아와서 상태값으로 관리한다.
    useEffect(()=>{
        fetch(`/api/v1/members/${num}`)
        .then(res=>res.json())
        .then(data=>setDto(data));
    }, []);

    const bread=[
        {name:"Members", to:"/members"},
        {name:"Edit"}
    ];
    // input 요소에 change event 가 일어 났을때 실행할 함수 
    const handleChange = (e)=>{
        //입력한 value 값을 읽어온다.
        const value = e.target.value;
        //입력한 input 요소의 name 속성의 값을 읽어온다.
        const name = e.target.name;
        //입력한 내용을 이용해서 상태값을 변경한다.
        setDto({
            ...dto,
            [name]:value  //여기서 name 은 "name" 또는 "addr" 이 된다. 
        })
    };
    // route 이동을 위한 navigate함수를 hook 을 이용해서 얻어낸다.
    const navigate = useNavigate();

    //form 에 submit 이벤트가 일어났을때 실행할 함수 
    const handleSubmit = (e)=>{
        e.preventDefault();
        const form=e.target; //수정 form 요소의 참조값
        // put 방식 요청을 이용해서 회원 정보 수정 요청을 한다 
        fetch(form.action, {
            method:"put", // put 방식 
            headers:{"Content-Type":"application/json"}, // json 문자열을 보낸다고 알림
            body:JSON.stringify(dto) // 상태값으로 관리되는 member object 를 json 문자열로 변경
        })
        .then(res=>res.json())
        .then(data=>{
            navigate(`/members/${data.num}`)
        });
    }
    
    return <>
        <Bread list={bread}/>
        <h1> <i>{dto.num}</i>번 회원 수정 양식</h1>
        <form action={`/api/v1/members/${dto.num}`} onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">이름</label>
                <input onChange={handleChange}  type="text" name="name" id="name" value={dto.name}/>
            </div>
            <div>
                <label htmlFor="addr">주소</label>
                <input onChange={handleChange} type="text" name="addr" id="addr" value={dto.addr}/>
            </div>
            <button type="submit">수정확인</button>
        </form>
    </>
}

export default MemberUpdateForm;