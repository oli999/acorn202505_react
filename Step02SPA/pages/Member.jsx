// src/pages/Member.jsx

import { useEffect, useState } from "react";
import { Pagination } from "react-bootstrap";
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";

function Member() {
    // "/members?pageNum=x" 에서 pageNum 을 추출하기 위해 
    const [params] = useSearchParams();

    //서버에서 응답받은 데이터를 상태값으로 관리한다.
    const [state, setState] = useState({
        list:[],
        pageNum:0,
        startPageNum:0,
        endPageNum:0,
        totalPageCount:0
    });

    //컴포넌트가 활성화 될때 회원 목록 받아오기 + params 가 변경되었을때도 다시 받아오기 
    useEffect(()=>{
        // params 정보를 읽어온다.
        const pageNum=params.get("pageNum"); // null 일수 있음
        const condition=params.get("condition"); // null 일수 있음 
        const keyword=params.get("keyword"); // null 일수 있음
        
        //api 서버에 요청할 query 문자열 구성
        const qs = new URLSearchParams(); //객체 생성후에 하나씩 setting
        if(pageNum){
            qs.set("pageNum", pageNum);
        } 
        if(keyword){
            qs.set("condition", condition);
            qs.set("keyword", keyword); 
        }
        console.log(qs.toString());

        fetch(`/api/v2/members?${qs.toString()}`)
        .then(res=>res.json())
        .then(data=>{
            // data 는 {list:[], pageNum:1, totalPageCount:x} 형식의 object 이다.
            setState(data);
        });

    }, [params]);

    //페이징 UI 를 만들때 사용할 배열을 리턴해주는 함수 
    function range(start, end) {
        const result = [];
        for (let i = start; i <= end; i++) {
            result.push(i);
        }
        return result;
    }

    //페이지 번호를 출력할때 사용하는 숫자를 배열에 미리 준비한다 
    const pageArray = range(state.startPageNum, state.endPageNum);

    //이동을 하기위한 hook
    const navigate = useNavigate();

    // 페이지를 이동하는 함수
    const pageMove = (num)=>{
       
        //현재 URLSearchParams 를 복사하고
        const qs = new URLSearchParams(params);
        // pageNum 만 교체 한다.
        qs.set("pageNum", num);

        navigate(`/members?${qs.toString()}`);
    };

    //검색조건과 검색 키워드를 상태값으로 관리하기
    const [search, setSearch] = useState({
        condition:"name_addr",
        keyword:""
    });
    //검색조건에 변화가 생겼을때 호출할 함수
    const handleSearchChange = (e)=>{
        setSearch({
            ...search,
            [e.target.name]:e.target.value
        });
    };
    //검색버튼을 눌렀을때 호출할 함수 
    const handleSearchClick = ()=>{
        // search 상태값 object 에 저장된 내용을 query 문자열로 변경한다
        // {condition:"name_addr", keyword:"kim"} => condition=name_addr&keyword=kim
        const query = new URLSearchParams(search).toString();

        // "/members?condition=name_addr&keyword=kim"  이런형식으로 주소창이 변경된다.
        navigate(`/members?${query}`);
    }

    return <>
        <NavLink to="/members/new">회원추가</NavLink>
        <h1>회원 목록입니다</h1>

        <label htmlFor="condition">검색조건</label>
        <select onChange={handleSearchChange} value={search.condition} name="condition" id="condition">
            <option value="name_addr">이름 + 주소</option>
            <option value="name">이름</option>
            <option value="addr">주소</option>
        </select>
        <input onChange={handleSearchChange} value={search.keyword} type="text" name="keyword" placeholder="검색어..."/>
        <button onClick={handleSearchClick}>검색</button>

        <table className="table table-striped">
            <thead>
                <tr>
                    <th>번호</th>
                    <th>이름</th>
                    <th>자세히</th>
                </tr>
            </thead>
            <tbody>
                {state.list.map(item => 
                    <tr key={item.num}>
                        <td>{item.num}</td>
                        <td>{item.name}</td>
                        <td>
                            <NavLink to={`/members/${item.num}`}>보기</NavLink>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
        <Pagination>
            <Pagination.Item 
                onClick={()=>pageMove(state.startPageNum-1)}
                disabled={state.startPageNum===1}
            >
                Prev
            </Pagination.Item>
            {
                pageArray.map(num => 
                    <Pagination.Item 
                        onClick={()=>pageMove(num)}
                        active={state.pageNum === num}
                        key={num}
                    >
                        {num}
                    </Pagination.Item>
                )
            }    
            <Pagination.Item
                onClick={()=>pageMove(state.endPageNum+1)}
                disabled={state.endPageNum === state.totalPageCount}
            >
                Next
            </Pagination.Item>
        </Pagination>
    </>
}

export default Member;