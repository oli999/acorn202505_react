// src/App.jsx

import 'bootstrap/dist/css/bootstrap.css'
import { useOutlet } from 'react-router-dom';
import BsNavBar from './components/BsNavBar';
import LoginModal from './components/LoginModal';
import { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import api from './api';
import { useDispatch } from 'react-redux';


function App() {
    //React Router v6  에서 제공하는 hook
    //현재 경로에 맞는 자식 route compoent 를 반환 한다 
    const currentOutlet=useOutlet();

    const dispatch = useDispatch();

    //컴포넌트가 활성화 되는 시점에 토큰을 읽어와 본다
    useEffect(()=>{
        const token=localStorage.token;
        if(token){
            // 앞의 7자리 문자열 "Bearer " 를 제외한 뒤의 문자열을 디코딩한다.
            const decoded = jwtDecode(token.substring(7));
            //콘솔에 출력해보기
            console.log("토큰 정보!!!");
            console.log(decoded);
            
            api.get("/v1/ping")
            .then(res=>{
                //여기가 실행되면 사용가능한 토큰
                //발행할 action
                const action={type:"USER_INFO", payload:{
                    userName:decoded.sub,
                    role:decoded.role
                }};
                //액션 발행하기
                dispatch(action);
            })
            .catch(err=>{
                //여기가 실행되면 사용불가능한 토큰 
                delete localStorage.token;
            });
        }
    }, []);

    return <>
        <BsNavBar/>
        <div className="container" style={{marginTop:"60px"}}>
           {currentOutlet}
        </div>
        <LoginModal/>
    </>;
}

export default App;