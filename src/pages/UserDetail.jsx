// src/pages/UserDetail.jsx

import { useEffect, useState } from "react";
import api from "../api";
import { NavLink } from "react-router-dom";

function UserDetail() {
    //사용자 정보를 상태값으로 관리
    const [dto, setDto] = useState({});
    
    useEffect(()=>{
        //api 에서 사용자 정보를 받아와서 상태값에 넣어준다.
        api.get("/v1/user")
        .then(res=>setDto(res.data))
        .catch(err=>console.log(err));
    }, []);

    return <>
        <h1>회원가입 정보</h1>
        <table className="table table-striped">
            <colgroup>
                <col className="col-3"/>
                <col className="col-9"/>
            </colgroup>   
            <tbody>
                <tr>
                    <th>아이디</th>
                    <td>{dto.userName}</td>
                </tr>
                <tr>
                    <th>비밀번호</th>
                    <td>
                        <NavLink to="/user/pwd-edit">수정</NavLink>
                    </td>
                </tr>
                <tr>
                    <th>이메일</th>
                    <td>{dto.email}</td>
                </tr>
                <tr>
                    <th>프로필 이미지</th>
                    <td>
                        {dto.profileImage ? 
                            <img src={`/upload/${dto.profileImage}`} alt="프로필 이미지" 
                                style={{width:"100px",height:"100px",borderRadius:"50%"}}/>
                            :
                            /*
                                npm install bootstrap-icons  해서 설치한다음
                                아래와 같이 import 해야 사용가능 
                                import 'bootstrap-icons/font/bootstrap-icons.css'
                            */
                            <i className="bi bi-person-circle" style={{fontSize:"100px"}}></i>
                        }
                    </td>
                </tr>
                <tr>
                    <th>최종 수정 날짜</th>
                    <td>{dto.updatedAt}</td>
                </tr>
                <tr>
                    <th>가입 날짜</th>
                    <td>{dto.createdAt}</td>
                </tr>
            </tbody>        
        </table>
    </>
}

export default UserDetail;