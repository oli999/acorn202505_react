/* 
    src/router/index.jsx 파일

    - 파일명을 index.js or index.jsx 로 작성하면 외부에서 
      router 폴더까지만 import 했을때 자동으로 index.js or index.jsx 
      파일에서 export default 된 자원을 사용할수 있다
    - index 는 약속된 파일명이다 
*/

import { createHashRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import ProtectedRoute from "../components/ProtectedRoute";
import UserDetail from "../pages/UserDetail";
import UserPwdUpdateForm from "../pages/UserPwdUpdateForm";
import UserForm from "../pages/UserForm";
import UserUpdateForm from "../pages/UserUpdateForm";
import Board from "../pages/Board";
import BoardForm from "../pages/BoardForm";
import BoardDetail from "../pages/BoardDetail";

// 페이지 routing 정보를 배열에 미리 저장해 둔다.
const routes=[
    // spring boot 서버에 넣어서 실행하면 최초 로딩될때  /index.html 경로로 로딩된다.
    // 그럴때도  Home 컴포넌트가 활성화 될수 있도록 라우트 정보를 추가한다. 
    {path:"/index.html", element: <Home/>},
    {path:"/", element:<Home/>},
    {path:"/user", element:<ProtectedRoute><UserDetail/></ProtectedRoute>},
    {path:"/user/pwd-edit", element:<ProtectedRoute><UserPwdUpdateForm/></ProtectedRoute>},
    {path:"/user/new", element:<UserForm/>},
    {path:"/user/edit", element:<ProtectedRoute><UserUpdateForm/></ProtectedRoute>},
    {path:"/board", element:<Board/>},
    {path:"/board/new", element:<ProtectedRoute><BoardForm/></ProtectedRoute>},
    {path:"/board/:num", element:<BoardDetail/>}  
];

//export 해줄 router 객체를 만든다
const router = createHashRouter([{
    path:"/",
    element:<App/>,
    children: routes.map((route)=>{
        return {
            index: route.path === "/", //자식의 path 가 "/" 면 index 페이지 역활을 하게 하기 
            path: route.path === "/" ? undefined : route.path, // path 에 "/" 두개가 표시되지 않게  
            element: route.element //어떤 컴포넌트를 활성화 할것인지 
        }
    })
}]);

export default router;