// src/App.jsx

import 'bootstrap/dist/css/bootstrap.css'
import Counter from './components/Counter';
import Friends from './components/Friends';

function App() {
    return (
        <div className="container">
            <h1>인덱스 페이지 입니다</h1>
            <div><Counter/></div>
            <div><Friends/></div>
        </div>
    );
}

export default App;