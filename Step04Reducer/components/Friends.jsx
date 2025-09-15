// src/components/Friends.jsx

import { useReducer, useRef } from "react";

const reducer = (state, action)=>{
    let newState;
    if(action.type === "add"){
        //기존의 상태값 friends 에 새로운 name을 추가한 새로운 상태값을 대입한다 
        newState={
            ...state,
            friends:[...state.friends, action.payload]
        }
    }else if(action.type === "reset"){
        newState={
            ...state,
            friends:[]
        }
    }else{
        //만일 처리할수 없는 action type 이라면 원래 state 값을 리턴한다. 
        newState=state;
    }

    return newState;
}


function Friends(props) {

    //초기 상태값 
    const initState={
        userName:"김구라",
        friends:[]
    };

    // useReducer(reduce 함수, 초기 상태값)
    const [state, dispatch] = useReducer(reducer, initState);

    //특정 요소의 참조값을 관리하기 위한 hook
    const inputRef = useRef(); // {current:x} 구조의 object 

    return <>
        <p>로그인된 userName : <strong>{state.userName}</strong></p>
        {/* 
            ref={inputRef} 에서
            inputRef 는 {current:참조값} 구조의 object 인데
            이 컴포넌트가 다시 렌더링 되더라도 current 라는 방에는 항상 이 input 요소의 참조값이 
            들어 있다.
            따라서 어디에선가 input 요소의 참조값이 필요하면 inputRef.current 로 얻어낼수 있다. 
        */}
        <input ref={inputRef} type="text" placeholder="친구 이름 입력..." id="one"/>
        <button onClick={()=>{
            // input 요소에 입력한 value 값을 직접 읽어오고 싶다.
            // inputRef 는 object 인데 object 의 current 라는 방에 input 요소의 참조값이 들어있다.
            const name=inputRef.current.value;
            // 발행할 action 을 object 로 만든다
            // object 에는 동작의 type 과 payload(추가할 이름) 를 담는다.
            const action = {type:"add", payload:name};
            //action 발행하기
            dispatch(action);
            //입력창 초기화
            inputRef.current.value = "";
        }}>추가</button>
        <button onClick={()=>{
            const action={type:"reset"};
            dispatch(action);
        }}>Reset</button>
        <ul>
            {state.friends.map(item => <li>{item}</li>)}
        </ul>
    </>
}

export default Friends;