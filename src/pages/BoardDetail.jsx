// src/pages/BoardDetail.jsx

import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import api from "../api";
import Comment from "../components/Comment";

function BoardDetail() {
    //자세히 보여줄 글의 번호  /board/:num  에서 num 경로 변수 얻어내기 
    const {num} = useParams();
    //검색어가 있으면 추출하기 위해
    const [params] = useSearchParams();

    //글 하나의 정보를 상태값으로 관리
    const [dto, setDto] = useState({});
    //댓글 목록도 상태값으로 관리한다.
    const [commentList, setCommentList] = useState([]);

    useEffect(()=>{
        // params.toString() 하면 query 문자열이 리턴된다. 없으면 빈 문자열이 리턴된다.
        api.get(`/v1/board/${num}?${params.toString()}`)
        .then(res=>{
            setDto(res.data);
        })
        .catch(err=>console.log(err));

        //댓글 목록
        api.get(`/v1/board/${num}/comments`)
        .then(res=>setCommentList(res.data))
        .catch(err=>console.log(err));

    }, [num]); // 자세히 보여줄 댓글 번호가 변경되면 다시 로딩 되도록 

    const navigate = useNavigate();
    //이전, 다음글 이동 
    const handleMove = (targetNum)=>{
        navigate(`/board/${targetNum}${params.get("search") ? "?"+params.toString() : ""}`);
    };
   
    return <>
        <h1>게시글 상세보기</h1>
        <p className="alert alert-success p-3"></p>
		
        { params.get("search") && 
            <p className="alert alert-info px-3 py-2 rounded-3 shadow-sm">
                <i className="bi bi-search me-2"></i>
                <strong>{params.get("search")}</strong> 조건
                <strong>{params.get("keyword")}</strong> 검색 결과 입니다
            </p> 
        }

		<div className="btn-group mb-2">
            <button onClick={()=>handleMove(dto.prevNum)} 
                disabled={dto.prevNum === 0}
                className="btn btn-outline-secondary btn-sm">
                <i className="bi bi-arrow-left"></i>
                Prev
            </button>
			<button onClick={()=>handleMove(dto.nextNum)} 
                disabled={dto.nextNum === 0}
                className="btn btn-outline-secondary btn-sm">
                <i className="bi bi-arrow-right"></i>
                Next
            </button>
		</div>

		<table className="table table-striped">
			<colgroup>
				<col className="col-2"/>
				<col className="col"/>
			</colgroup>
			<tr>
				<th>글번호</th>
				<td>{dto.num}</td>
			</tr>
			<tr>
				<th>작성자</th>
				<td>
					{ !dto.profileImage && <i style={{fontSize:"100px"}} className="bi bi-person-circle"></i> }
					
                    { dto.profileImage && 
                        <img src={`/upload/${dto.profileImage}`} 
							style={{width:"100px", height:"100px", borderRadius:"50%"}}/> 
                    }
				</td>
			</tr>
			<tr>
				<th>제목</th>
				<td>{dto.title}</td>
			</tr>
			<tr>
				<th>조회수</th>
				<td>{dto.viewCount}</td>
			</tr>
			<tr>
				<th>작성일</th>
				<td>{dto.createdAt}</td>
			</tr>
		</table>
		<div className="card mt-4">
		  <div className="card-header bg-light">
		    <strong>본문 내용</strong>
		  </div>
		  <div className="card-body p-1" dangerouslySetInnerHTML={{__html:dto.content}}>
		    
		  </div>
		</div>
        <Comment category="board" parentNum={dto.num} parentWriter={dto.writer} list={commentList}/>              
    </>
}

export default BoardDetail;