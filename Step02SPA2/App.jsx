// src/App.jsx

import 'bootstrap/dist/css/bootstrap.css'
import { Nav } from 'react-bootstrap';
import { NavLink, useOutlet } from 'react-router-dom';

// app.module.css 를 import 해서 styles 라는 이름으로 사용하기 
// css 파일명을  xxx.module.css 로 지으면 반드시 어떤 이름으로 import 해서 사용해야 한다.
// 여기서 styles 는 object 이다 
import  styles from './css/app.module.css';

function App() {
    //React Router v6  에서 제공하는 hook
    //현재 경로에 맞는 자식 route compoent 를 반환 한다 
    const currentOutlet=useOutlet();

    // styles object 의 구조 확인!
    console.log(styles);

    return (
        <div className="container">
            <Nav className={styles["my-bg"]}>
                <Nav.Item>
                    <Nav.Link as={NavLink} to="/">Home</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link as={NavLink} to="/game">Game</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link as={NavLink} to="/study">Study</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link as={NavLink} to="/clients">고객목록</Nav.Link>
                </Nav.Item>
            </Nav>
            {currentOutlet}
        </div>
    );
}

export default App;