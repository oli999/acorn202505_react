// src/App.jsx

import 'bootstrap/dist/css/bootstrap.css'
import { useOutlet } from 'react-router-dom';
import BsNavBar from './components/BsNavBar';
import LoginModal from './components/LoginModal';


function App() {
    //React Router v6  에서 제공하는 hook
    //현재 경로에 맞는 자식 route compoent 를 반환 한다 
    const currentOutlet=useOutlet();

    return <>
        <BsNavBar/>
        <div className="container" style={{marginTop:"60px"}}>
           {currentOutlet}
        </div>
        <LoginModal/>
    </>;
}

export default App;