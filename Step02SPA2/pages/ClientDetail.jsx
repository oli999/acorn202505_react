// src/pages/ClientDetail.jsx

import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { NavLink, useLocation, useParams } from "react-router-dom";

function ClientDetail() {

    // location 객체에 state 라는 키값으로 담긴 내용을 읽어오기 위한 hook
    const {state} = useLocation();
    
    // "/clients/:num"  에서 num 을 읽어내기 위한 hook
    const {num} = useParams();
    // 회원 1명의 정보는 state 값으로 관리
    const [dto, setDto] = useState({});

    useEffect(()=>{
        //이름이 없는 화살표 함수를 만들자 마자 call() 하는 구조 
        (async ()=>{
            try{
                const res = await axios.get(`/api/v1/clients/${num}`);
                //회원 한명의 정보를 상태값으로 넣어준다.
                setDto(res.data);
            }catch(err){
                console.log(err);
            }
        })();

    }, []);

    return <>
		{ state && <p class="alert alert-success">{state.message}</p>}
		<h3>고객 상세 정보</h3>
		<table class="table table-bordered">
			<tbody>
				<tr>
					<th>번호</th>
					<td>{dto.num}</td>
				</tr>
				<tr>
					<th>이름</th>
					<td>{dto.userName}</td>
				</tr>
				<tr>
					<th>생일</th>
					{/* 생일을 단순히 출력할때는 formattedBirthday 를 출력한다 */}
					<td>{dto.formattedBirthday}</td>
				</tr>
				<tr>
					<th>수정일</th>
					<td>{dto.updatedAt}</td>
				</tr>
				<tr>
					<th>등록일</th>
					<td>{dto.createdAt}</td>
				</tr>
			</tbody>
		</table>
		<div className="mt-3">
            <Button variant="primary" as={NavLink} to="/clients">목록으로</Button>
            <Button className="ms-1" variant="warning" as={NavLink} to={`/clients/${num}/edit`}>수정</Button>
		</div>    
    </>
}

export default ClientDetail;