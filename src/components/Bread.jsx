// src/components/Location.jsx

import { NavLink } from "react-router-dom";


// react bootstrap 의 BreadCrumb ui 를 구성해주는 component
function Bread({list}) {
    /*
        Bread({list}) 의 의미는
        props 로 전달되는 값 중에서 list 만 구조 분해 할당을 해서 담겠다는 의미
        
        <Bread list={["aaa","bbb","ccc"]} />  형식으로 사용한다면
        list 에는 ["aaa","bbb","ccc"] 이 배열이 들어 있다 
    */
    return <>
        <nav>
            <ol className="breadcrumb">
                <li className="breadcrumb-item">
                    <NavLink to="/">Home</NavLink>
                </li>
                {list.map(item=>
                    <li key={item.name} className={`breadcrumb-item ${item.to ? '':'active'}`}>
                        {item.to ? <NavLink to={item.to}>{item.name}</NavLink> : item.name }
                    </li>
                )}
            </ol>
        </nav>

    </>
}

export default Bread;