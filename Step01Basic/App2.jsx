// src/App3.jsx

import { useState } from "react";

export default function App3(){
    //jsx 객체가 들어 있는 배열 
    const foods = [
        <li>김밥</li>,
        <li>라면</li>,
        <li>떡복기</li>
    ];

    //배열에 들어 있는 string 을 이용해서 
    const data = ["java", "jsp", "spring"]
    // li 요소 여러개가 들어 있는 jsx 의 배열을 만들어서 아래에서 렌더링하기 
    const programming1 = data.map((item)=>{
        return <li>{item}</li>;
    });
    //위의 code 를 줄여서 쓰면 아래와 같다 
    const programming2 = data.map(item => <li>{item}</li>);

    //상태값을 이용해서 렌더링을 해보자 
    const [state, setState] = useState([]); //초기값은 빈배열 

    return (
        <div className="container">
            
            <h1>음식 목록</h1>
            <ul>
                {foods}
            </ul>

            <h1>교육과정1</h1>
            <ul>
                {programming2}
            </ul>

            <h1>교육과정2</h1>
            <ul>
                {data.map(item => <li>{item}</li>)}
            </ul>


            <h1>교육과정3</h1>
            <button onClick={()=>{
                //원래는 빈배열[] 이였는데 새로운 배열로 상태값 변경하기 
                setState(data);
            }}>출력하기</button>
            <ul>
                {state.map(item => <li>{item}</li>)}
            </ul>
        </div>
    )
}
