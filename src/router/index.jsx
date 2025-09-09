/* 
    src/router/index.jsx 파일

    - 파일명을 index.js or index.jsx 로 작성하면 외부에서 
      router 폴더까지만 import 했을때 자동으로 index.js or index.jsx 
      파일에서 export default 된 자원을 사용할수 있다
    - index 는 약속된 파일명이다 
*/

import { createBrowserRouter, createHashRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Study from "../pages/Study";
import Play from "../pages/Play";
import Member from "../pages/Member";
import MemberDetail from "../pages/MemberDetail";
import MemberForm from "../pages/MemberForm";
import MemberUpdateForm from "../pages/MemberUpdateForm";

// 페이지 routing 정보를 배열에 미리 저장해 둔다.
const routes=[
    // spring boot 서버에 넣어서 실행하면 최초 로딩될때  /index.html 경로로 로딩된다.
    // 그럴때도  Home 컴포넌트가 활성화 될수 있도록 라우트 정보를 추가한다. 
    {path:"/index.html", element: <Home/>},
    {path:"/", element:<Home/>},
    {path:"/study", element:<Study/>},
    {path:"/play", element:<Play/>},
    {path:"/members", element:<Member/>},
    {path:"/members/:num", element:<MemberDetail/>},
    {path:"/members/new", element:<MemberForm/>},
    {path:"/members/:num/edit", element:<MemberUpdateForm/>}   
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

// # 없이 자연스러운 url 주소를 표시하고 싶으면 createBrowserRouter() 를 사용한다
// 단 클라이언트가 새로고침을 누르면 문제가 생긴다 
const router2 = createBrowserRouter([{
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