// src/App.jsx

import 'bootstrap/dist/css/bootstrap.css'
import { useOutlet } from 'react-router-dom';
import BsNavbar from './components/BsNavbar';

function App() {
    //React Router v6  에서 제공하는 hook
    //현재 경로에 맞는 자식 route compoent 를 반환 한다 
    const currentOutlet=useOutlet();
    return <>
        <BsNavbar/>
        <div className="container pt-4" style={{marginTop:"50px"}}>
            {currentOutlet}
        </div>
    </>
}

export default App;