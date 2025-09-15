// src/pages/Home.jsx

// npm install classnames 된 모듈을 import 해서 cn 이라는 이름으로 사용하기 
// cn 은 function type 이다 따라서  cn() 형식으로 사용한다 
import cn from 'classnames';
import { useState } from 'react';

function Home() {
    const classArray=["btn", "btn-primary"];
    const classObject={"btn":true, "btn-primary":true};
    
    //체크박스의 체크 상태는 boolean type 으로 관리 할수 있다.
    const [checked, setChecked] = useState(false);
    const handleChange = (e)=>{
        //체크 박스 체크 여부를 알아내서 
        const isChecked = e.target.checked;
        //상태값에 반영한다 
        setChecked(isChecked);
    };
    //특정 메세지의 style 을 object 로 관리하기
    const [messageStyle, setMessagStyle] = useState({
        "bg-info":false,
        "text-danger":false
    });

    const handleChange2 = (e)=>{
        const value = e.target.value; // checkbox 의 value 값 "bg-info" or "text-danger"
        const isChecked = e.target.checked; // 체크여부 true or false
        //상태값 변경하기
        setMessagStyle({
            ...messageStyle,
            [value]:isChecked
        });
    };

    return (
        <>
            <h1>인덱스 페이지 입니다</h1>
            <button className="btn btn-primary">버튼1</button>
            <button className={cn("btn", "btn-primary")}>버튼2</button>
            <button className={cn(["btn","btn-primary"])}>버튼3</button>
            <button className={cn(classArray)}>버튼4</button>
            <button className={cn({"btn":true, "btn-primary":true})}>버튼5</button>
            <button className={cn(classObject)}>버튼6</button>
            <button className={cn("btn-lg", classObject)}>버튼7</button>
            <hr />
            
            <h3>checkbox 의 체크상태를 state 로 관리</h3>
            <label>
                <input onChange={handleChange} type="checkbox" checked={checked}/> 체크해보셈
            </label>
            <p className={cn({"bg-info":checked})}>어쩌구.. 저쩌구..</p>

            <h3>checkbox 의 value 도 같이 사용해 보기</h3>
            <label>
                <input onChange={handleChange2} type="checkbox" value="bg-info"/> 하늘색 배경
            </label>
            <label>
                <input onChange={handleChange2} type="checkbox" value="text-danger"/> 빨간색 글자
            </label>
            <p className={cn(messageStyle)}>어쩌구.. 저쩌구...</p>

        </>
    );
}

export default Home;