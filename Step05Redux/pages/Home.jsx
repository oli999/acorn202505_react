// src/pages/Home.jsx

import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

function Home() {
    /*
        아래의 로그인 버튼을 눌렀을때 LoginModal 을 띄워 보세요
        
        모달의 title 은  "로그인 폼 입니다" 로 
    */

    //action 을 발행하기 위한 dispatch 함수
    const dispatch = useDispatch();
    //로그인 정보를 읽어오기 ( redux store 로 부터 )
    const userInfo = useSelector(state=>state.userInfo);

    const handleLogin = ()=>{
        //로그인 모달을 띄울 action 객체를 만들어서 
        const action={
            type:"LOGIN_MODAL", 
            payload:{
                title:"로그인 폼 입니다", 
                show:true
            }
        };
        //action 을 발행한다 
        dispatch(action);
    };
    const handleLogout = ()=>{
        //토큰을 삭제
        //delete localStorage.fakeToken;
        delete localStorage.token;
        //store 에서 관리되는 userInfo 를 null 로 변경한다.
        const action={type:"USER_INFO", payload:null};
        dispatch(action);
    };

    return (
        <>
            <h1>인덱스 페이지 입니다</h1>
            { !userInfo && <button onClick={handleLogin}>로그인</button>}
            { userInfo && <p> 
                    <strong>{userInfo.userName}</strong> 님 로그인중... 
                    <button onClick={handleLogout}>로그아웃</button>
                </p>
            }
            <hr />
            { userInfo ?
                <p> 
                    <strong>{userInfo.userName}</strong> 님 로그인중... 
                    <button onClick={handleLogout}>로그아웃</button>
                </p>    
              :
                <button onClick={handleLogin}>로그인</button>
            }
            <h3>회원전용 링크</h3>
            <NavLink to="/member">이동</NavLink>
            <br />
            <NavLink to="/game">Game</NavLink>

            <h3>Authorization 을 추가한 요청</h3>
            <button onClick={()=>{
                axios.get("/api/v1/ping", {
                    headers:{
                        Authorization: localStorage.token
                    }
                })
                .then(res=>{
                    alert(res.data);
                })
                .catch(err=>{
                    alert("토큰이 없어서 응답불가");
                });
            }}>요청 보내기</button>
        </>
    );
}

export default Home;