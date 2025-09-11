// src/pages/Member.jsx

import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";

function Member() {
    //회원 목록을 상태값으로 관리 
    const [members, setMembers] = useState([]);

    useEffect(()=>{
        // npm install axios 로 설치한 axios 를 이용해서 api 요청해보기
        axios.get("/api/v1/members")
        .then(res => {
            console.log(res);
            //res.data 에 서버가 응답한 data 가 들어 있다.
            setMembers(res.data);
        })
        .catch(err => console.log(err));

    }, []);

    return <>
        <NavLink to="/members/new">회원추가</NavLink>
        <h1>회원 목록</h1>
        <table>
            <thead>
                <tr>
                    <th>번호</th>
                    <th>이름</th>
                    <th>주소</th>
                    <th>자세히</th>
                </tr>
            </thead>
            <tbody>
                {members.map(item=>
                    <tr key={item.num}>
                        <td>{item.num}</td>
                        <td>{item.name}</td>
                        <td>{item.addr}</td>
                        <td>
                            <NavLink  to={`/members/${item.num}`}>보기</NavLink>
                            <Button as={NavLink} to={`/members/${item.num}`}>보기</Button>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    </>
}

export default Member;
