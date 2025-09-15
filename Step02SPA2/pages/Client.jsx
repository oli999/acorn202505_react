// src/pages/Client.jsx

import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

function Client() {
    
    //고객 목록을 상태값으로 관리한다.
    const [list, setList] = useState([]);

    //컴포넌트가 활성화 되는 시점에 
    useEffect(()=>{
        // api 서버로 부터 고객목록을 얻어와서 
        axios.get("/api/v1/clients")
        .then(res=>{
            //상태값으로 넣어준다.
            setList(res.data);
        });
    }, []);

    return <>
		<div class="d-flex justify-content-between mb-3">
			<h3>고객 목록</h3>
			<NavLink to="/clients/new">신규등록</NavLink>
		</div>
		<table class="table table-hover">
			<thead>
				<tr>
					<th>번호</th>
					<th>이름</th>
					<th>생일</th>
					<th>등록일</th>
					<th>자세히</th>
				</tr>
			</thead>
			<tbody>
				{list.map(item => 
                    <tr>
                        <td>{item.num}</td>
                        <td>{item.userName}</td>
                        <td>{item.formattedBirthday}</td>
                        <td>{item.createdAt}</td>
                        <td>
                            <NavLink to={`/clients/${item.num}`}>보기</NavLink>
                        </td>
                    </tr>
                )}
			</tbody>
		</table>
    </>
}

export default Client;