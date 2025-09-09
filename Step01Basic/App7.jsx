// src/App7.jsx

// react bootstrap 을 사용하기 위해서는 css 를 먼저 import 하고
import 'bootstrap/dist/css/bootstrap.css'
import { useState } from 'react';
// 원하는 component 를 react-bootstrap 으로 부터 import 해서 사용한다 
import { Alert, Button } from 'react-bootstrap';
import MyModal from './components/MyModal';
import AlertModal from './components/AlertModal';

function App7() {
    const btnColor="warning";

    //알림을 띄울지 말지를 상태값으로 관리하기
    const [show, setShow] = useState(false);

    return (
        <div className='container'>
            <h1>react bootstrap 컴포넌트</h1>
            <Button variant='primary'>버튼1</Button>
            <Button variant='success'>버튼2</Button>
            <Button variant={"info"}>버튼3</Button>
            <Button variant={btnColor}>버튼4</Button>
            {/* jsx 안에서 주석은 javascript 영역을 만들어 놓고 주석을 작성한다 */} 

            {/* 취소 가능한 Alert 출력하기 */}
            <Alert variant="danger"  dismissible>
                <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                <p>
                Change this and that and try again. Duis mollis, est non commodo
                luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.
                Cras mattis consectetur purus sit amet fermentum.
                </p>
            </Alert>

            <Button variant='danger' onClick={()=>setShow(true)}>알림 띄우기</Button>
            { show && 
                <Alert variant="danger"  dismissible>
                    <Alert.Heading>알림</Alert.Heading>
                    <p>삭제 실패 했습니다!</p>
                </Alert>
            }
            <MyModal/>
            <AlertModal show={show} message={"안녕하세요"} onYes={()=>{
                setShow(false)
            }}/>
        </div>
    );
}

export default App7;