// src/pages/Board.jsx

import { useEffect, useState } from "react";
import api from "../api";
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import { Pagination } from "react-bootstrap";

function Board() {
    // "/board?pageNum=x" 에서 pageNum 을 추출하기 위해 
    const [params] = useSearchParams();

    //글 정보를 pageInfo 로 관리
    const [pageInfo, setPageInfo] = useState({
        list:[],
        pageNum:0,
        startPageNum:0,
        endPageNum:0,
        totalPageCount:0
    });
    //컴포넌트 활성화 되는 시점에 page 정보 얻어오기
    useEffect(()=>{
        // params 정보를 읽어온다.
        const pageNum=params.get("pageNum"); // null 일수 있음
        const search=params.get("search"); // null 일수 있음 
        const keyword=params.get("keyword"); // null 일수 있음
        
        //api 서버에 요청할 query 문자열 구성
        const qs = new URLSearchParams(); //객체 생성후에 하나씩 setting
        if(pageNum){
            qs.set("pageNum", pageNum);
        } 
        if(keyword){
            qs.set("search", search);
            qs.set("keyword", keyword); 
        }
        console.log(qs.toString());

        api.get(`/v1/board?${qs.toString()}`)
        .then(res=>{
            setPageInfo(res.data)
        })
        .catch(err=>{
            console.log(err);
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
    const pageArray = range(pageInfo.startPageNum, pageInfo.endPageNum);
    //이동을 하기위한 hook
    const navigate = useNavigate();

    // 페이지를 이동하는 함수
    const pageMove = (num)=>{
       
        //현재 URLSearchParams 를 복사하고
        const qs = new URLSearchParams(params);
        // pageNum 만 교체 한다.
        qs.set("pageNum", num);

        navigate(`/board?${qs.toString()}`);
    };

    //검색조건과 검색 키워드를 상태값으로 관리하기
    const [search, setSearch] = useState({
        search:"title_content", //제목+내용 검색이 초기값
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
        // {condition:"title_content", keyword:"kim"} => search=title_content&keyword=kim
        const query = new URLSearchParams(search).toString();

        // "/board?search=title_content&keyword=kim"  이런형식으로 주소창이 변경된다.
        navigate(`/board?${query}`);
    }

    //새로 고침을 눌렀을때 
    const handleRefreshClick = ()=>{
        //검색 상태값을 초기 상태로 변경하고 
        setSearch({
            search:"title_content",
            keyword:""
        });
        //1page 로 이동 
        navigate("/board");
    };

    // 검색 쿼리가 있다면 해당 문자열을 리턴해주는 함수(없으면 빈 문자열을 리턴한다)
    const getQuery = ()=>{
        let query="";
        if(pageInfo.keyword){
            query=`?search=${pageInfo.search}&keyword=${pageInfo.keyword}`;
        }
        return query;
    };

    return <>
        <NavLink to="/board/new">새글 작성</NavLink>
        
        <h1>게시글 목록 입니다.</h1>
    
        <div className="row my-3">
			<div className="col-md-6 ms-auto">
				
                <div className="input-group">
                    
                    <select onChange={handleSearchChange} value={search.search} name="search" className="form-select">
                        <option value="title_content">제목+내용</option>
                        <option value="title">제목</option>
                        <option value="writer">작성자</option>
                    </select>
                    <input onChange={handleSearchChange} value={search.keyword} type="text" name="keyword" className="form-control" placeholder="검색어 입력..."/>
                    <button onClick={handleSearchClick} className="btn btn-outline-secondary">
                        <i className="bi bi-search"></i>
                        <span className="visually-hidden">검색</span>
                    </button>
                    <button onClick={handleRefreshClick} className="btn btn-outline-danger">
                        <i className="bi bi-arrow-clockwise"></i>
                        <span className="visually-hidden">새로고침</span>
                    </button>
                </div>
				
			</div>
		</div>
		{ pageInfo.keyword && <p className="alert alert-success">
			<strong>{pageInfo.keyword}</strong> 에 대한 검색결과 
			<strong>{pageInfo.totalRow}</strong> 개 
		</p>}
        <table className="table table-bordered">
			<thead>
				<tr>
					<th>글번호</th>
					<th>작성자</th>
					<th>제목</th>
					<th>조회수</th>
					<th>작성일</th>
				</tr>
			</thead>
			<tbody>
            {pageInfo.list.map(item => 
                <tr key={item.num}>
                    <td>{item.num}</td>
                    <td>{item.writer}</td>
                    <td>
                        <NavLink to={`/board/${item.num}${getQuery()}`}>{item.title}</NavLink>
                    </td>
                    <td>{item.viewCount}</td>
                    <td>{item.createdAt}</td>
                </tr>
            )}
			</tbody>
		</table>
        <Pagination>
            <Pagination.Item 
                onClick={()=>pageMove(pageInfo.startPageNum-1)}
                disabled={pageInfo.startPageNum===1}
            >
                Prev
            </Pagination.Item>
            {
                pageArray.map(num => 
                    <Pagination.Item 
                        onClick={()=>pageMove(num)}
                        active={pageInfo.pageNum === num}
                        key={num}
                    >
                        {num}
                    </Pagination.Item>
                )
            }    
            <Pagination.Item
                onClick={()=>pageMove(pageInfo.endPageNum+1)}
                disabled={pageInfo.endPageNum === pageInfo.totalPageCount}
            >
                Next
            </Pagination.Item>
        </Pagination>
    </>
}

export default Board;