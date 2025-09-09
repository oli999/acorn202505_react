// src/App5.jsx

import React from 'react';

function App5() {
    //친구 목록
    const names=["김구라","해골","원숭이"];

    return (
        <div className="container">
            <h1>ReactComponent 사용하기</h1>
            <Fortune/>
            <Fortune/>
            <Friends names={names}/>
            <Person person={"유재황"} color={"#00ff00"}/>
        </div>
    );
}
export default App5;

//부모 component 가 전달한 속성값을 object 의 구조 분해 할당 문법을 이용해서 추출할수 있다.
function Person({person, color}){
    return <>
        <p>오늘의 인물: <strong style={{backgroundColor:color}}>{person}</strong></p>
    </>
}

function Friends(args){ //args 는 부모 component 가 전달한 속성이 담겨 있는 object 이다 
    // args.names 는 출력할 이름이 들어 있는 배열이다.  
    return <>
        <h2>친구 목록</h2>
        <ul>
            {args.names.map(item=><li>{item}</li>)}
        </ul>
    </>
}

//다른 곳에서 불러서 쓸수 있는 함수형 ReactComponent
function Fortune(){
    const style={
        color:"red",
        backgroundColor:"#00ff00"
    }
    return <>
        <h2>오늘의 운세</h2>
        <p style={style}>동쪽으로 가면 귀인을 만나요</p>
    </>
}