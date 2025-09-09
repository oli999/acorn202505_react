// src/App.jsx

import 'bootstrap/dist/css/bootstrap.css'
import { useOutlet } from 'react-router-dom';

function App() {
    //React Router v6  에서 제공하는 hook
    //현재 경로에 맞는 자식 route compoent 를 반환 한다 
    const currentOutlet=useOutlet();

    return (
        <div className="container">
           {currentOutlet}
        </div>
    );
}

export default App;