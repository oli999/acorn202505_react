// src/components/Comment.jsx

//클래스를 쉽게 제어하기 위한 유틸리티
import cn from 'classnames';
import { useSelector } from 'react-redux';
import api from '../api'
import { useState } from 'react';
import PaginationBar from './PaginationBar';

/*
    Comment 의 props 로 전달되는 commentListResponse 는 아래의 구조이다
    {
        list: 댓글목록[],
        pageNum: 현재 페이지,
        startPageNum: 시작 페이지 번호,
        endPageNum: 끝 페이지 번호,
        totalPageCount: 전체 페이지 갯수
    }
    onMove 는 아래의 구조이다 (이동할 댓글의 pageNum 을 전달 받는 함수)
    (num)=>{ }
*/
function Comment({category, parentNum, parentWriter, commentListResponse, onRefresh, onMove}) {

    // redux store 로 부터 로그인 정보를 얻어낸다 
    let userInfo = useSelector(state=>state.userInfo);
    // 만일 로그인을 하지 않았으면 null 이기 때문에 빈 object 를 넣어준다.
    if(!userInfo)userInfo={};
    
    // 대댓글이 펼쳐진 상태면 댓글의 그룹번호를 추가하고
    // 대댓글이 숨겨진 상태면 댓글의 그룹번호를 제거할 Set 객체를 state 로 관리한다
    // 초기값은 어떤 번호도 추가 되지 않은 상태이다 
    const [openGroups, setOpenGroups] = useState(new Set());
    // 대댓글 폼 펼침 상태관리
    const [openFormGroups, setOpenFormGroups] = useState(new Set());
    // 댓글 수정 폼 펼침 상태 관리
    const [openUpdateFormGroups, setOpenUpdateFormGroups] = useState(new Set());

    //대댓글 보기 버튼을 눌렀을때 실행할 함수 
    const handleReplyCountBtn = (groupNum)=>{
        //기존 Set 객체에 저장된 내용을 이용해서 새로운 Set 객체 만들기
        const set = new Set(openGroups);
        if(set.has(groupNum)){//번호가 존재하면
            //Set 에서 번호 제거
            set.delete(groupNum);
        }else{//번호가 없으면
            //Set 에 번호 추가
            set.add(groupNum);
        }
        //업데이트된 Set 로 상태값 변경
        setOpenGroups(set);
    };

    const handleFormToggle = (action, num)=>{
        //기존 Set 를 이용해서 새로운 Set 객체 생성
        const set = new Set(openFormGroups);
        // action 은 "add" or "remove" 가 전달될 예정, num 은 댓글의 글번호
        set[action](num);
        //새로운 Set 객체로 상태값을 변경한다.
        setOpenFormGroups(set);
    };

    const handleUpdateFormToggle = (action, num)=>{
        //기존 Set 를 이용해서 새로운 Set 객체 생성
        const set = new Set(openUpdateFormGroups);
        // action 은 "add" or "delete" 가 전달될 예정, num 은 댓글의 글번호
        set[action](num);
        //새로운 Set 객체로 상태값을 변경한다.
        setOpenUpdateFormGroups(set);
    };

    //댓글 등록 버튼을 눌렀을때 실행할 함수 
    const handleSubmit = async (e)=>{
        e.preventDefault();

        const form=e.target; //submit 이벤트가 발행한 form 의 참조값
        //폼에 입력한 내용을 FormData 객체로 얻어내서 
        const formData=new FormData(form);
        //Object 로 변환
        const obj = Object.fromEntries(formData);
        try{
            await api.post("/v1/comments", obj);
            //댓글 목록을 refresh 한다
            onRefresh();
            //만일 대댓글 폼이라면 접어야 한다
            if(obj.groupNum){
                //submit 이벤트가 일어난 form 요소의 data-num="x"  x 값을 읽어오기 
                console.log(e.target.dataset.num);
                //댓글폼이 속해 있는 댓글의 번호 
                const num=Number(e.target.dataset.num);
                const set=new Set(openFormGroups);
                set.delete(num);
                setOpenFormGroups(set);
            }
        }catch(err){
            console.log(err);
        }
    }

    //댓글 삭제 버튼을 눌렀을때 실행할 함수 
    const handleDelete = async (num)=>{
        const isDelete = confirm("댓글을 삭제 하시겠습니까?");
        try{
            if(isDelete){
                await api.delete(`/v1/comments/${num}`);
                onRefresh();
            }
        }catch(err){
            console.log(err);
        }
    };

    //댓글 수정폼에 submit 이벤트가 발생했을때 실행할 함수 
    const handleUpdateSubmit = async (e)=>{
        e.preventDefault();
        const form=e.target; //submit 이벤트가 발행한 form 의 참조값
        //폼에 입력한 내용을 FormData 객체로 얻어내서 
        const formData=new FormData(form);
        //Object 로 변환
        const obj = Object.fromEntries(formData);
        console.log(obj);
        try{
            await api.patch(`/v1/comments/${obj.num}`, obj);
            //댓글 목록을 refresh 한다
            onRefresh();
            //댓글 수정 form 접기
            const set = new Set(openUpdateFormGroups);
            // obj.num 은 string type 이기 때문에 숫자로 변경해서 함수에 전달한다.
            set.delete(Number(obj.num));
            setOpenUpdateFormGroups(set);
        }catch(err){
            console.log(err);
        }
    };
    return <>
    	<div className="card my-3">
		  <div className="card-header bg-primary text-white">
		    댓글을 입력해 주세요
		  </div>
		  <div className="card-body">
		    <form onSubmit={handleSubmit} action="/v1/comments" method="post">
		      <input type="hidden" name="parentNum" value={parentNum} />
		      <input type="hidden" name="targetWriter" value={parentWriter} />
		      <div className="mb-3">
		        <label htmlFor="commentContent" className="form-label">댓글 내용</label>
		        <textarea id="commentContent" name="content" rows="5" className="form-control" 
                    placeholder={userInfo.userName ? '댓글을 입력하세요' : '댓글 작성을 위해 로그인이 필요합니다'}
                    disabled={userInfo.userName ? false : true}></textarea>
		      </div>
		      <button disabled={userInfo.userName ? false : true} type="submit" className="btn btn-success">등록</button>
		    </form>
		  </div>
		</div>

        <div className="comments">
        {commentListResponse.list.map(item=>{
            //대댓글인지 여부 
            const isReRe = item.num !== item.groupNum;
            //대댓글이 open 되어 있는지 여부
            const isOpen = openGroups.has(item.groupNum);  

            return <div key={item.num} className={cn("card","mb-3", {"ms-5": isReRe, "d-none": isReRe && !isOpen})}>
            { item.deleted === 'yes' && 
                <div className="card-body bg-light text-muted rounded">삭제된 댓글 입니다</div>
            }
            { item.deleted !== 'yes' &&
                <div className="card-body d-flex flex-column flex-sm-row position-relative">
                { item.replyCount !== 0 && !isReRe && 
                    <button onClick={()=>handleReplyCountBtn(item.groupNum)} className="dropdown-btn btn btn-outline-secondary btn-sm position-absolute"
                        style={{bottom:"16px", right:"16px"}}>
                        <i className={cn("bi", {"bi-caret-down":!isOpen , "bi-caret-up":isOpen})}></i>
                        답글 {item.replyCount} 개
	            	</button> 
                }
                { isReRe &&
                    <i className="bi bi-arrow-return-right position-absolute" 
                        style={{top:0, left:"-30px"}}></i>       
                }
                { item.writer === userInfo.userName && 
                    <button onClick={()=>handleDelete(item.num)} 
		            	className="btn-close position-absolute top-0 end-0 m-1"></button>
                }
                { item.profileImage === null ?
                    <i style={{fontSize:"50px"}} className="bi bi-person-circle me-3 align-self-center"></i>
                :
                    <img className="rounded-circle me-3 align-self-center" 
                        src={`/upload/${item.profileImage}`}
                        alt="프로필 이미지"
                        style={{width:"50px", height:"50px"}} />
                }
                    <div className="flex-grow-1">
                        <div className="d-flex justify-content-between">
                            <div>
                                <strong>{item.writer}</strong>
                                <span>@{item.targetWriter}</span>
                                <small className="text-muted">{item.createdAt}</small>
                            </div>
                        </div>
                        <pre>{item.content}</pre>
                        { item.writer === userInfo.userName &&  
                        <>
                            <button className="btn btn-sm btn-outline-secondary"
                                onClick={()=>handleUpdateFormToggle("add", item.num)}>수정</button>
                            <div className={cn({"d-none":!openUpdateFormGroups.has(item.num)})}>
                                <form onSubmit={handleUpdateSubmit} method="post">
                                    <input type="hidden" name="num" value={item.num}/>
                                    <input type="hidden" name="parentNum" value={parentNum}/>
                                    <textarea name="content" className="form-control mb-2" rows="2" defaultValue={item.content}></textarea>
                                    <button type="submit" className="btn btn-sm btn-success">수정 완료</button>
                                    <button type="reset" className="btn btn-sm btn-secondary"
                                        onClick={()=>handleUpdateFormToggle("delete", item.num)}>취소</button>
                                </form>
                            </div>
                        </>
                        } 
                        { item.writer !== userInfo.userName &&
                        <>
                            <button className="btn btn-sm btn-outline-primary" 
                                onClick={()=>handleFormToggle("add", item.num)}>댓글</button>  
                            <div className={cn({"d-none":!openFormGroups.has(item.num)})}>
                                <form onSubmit={handleSubmit} action="/v1/comments" method="post" data-num={item.num}>
                                    <input type="hidden" name="parentNum" value={parentNum}/>
                                    <input type="hidden" name="targetWriter" value={item.writer}/>
                                    <input type="hidden" name="groupNum" value={item.groupNum}/>
                                    <textarea name="content" className="form-control mb-2" rows="2" 
                                        placeholder={userInfo.userName ? '댓글을 입력하세요' : '댓글 작성을 위해 로그인이 필요합니다'}
                                        disabled={userInfo.userName ? false : true}></textarea>
                                    <button disabled={userInfo.userName ? false : true} type="submit" className="btn btn-sm btn-success">등록</button>
                                    <button disabled={userInfo.userName ? false : true} type="reset" className="btn btn-sm btn-secondary cancel-reply-btn"
                                        onClick={()=>handleFormToggle("delete", item.num)}>취소</button>
                                </form>
                            </div>                     
                        </>
                        } 
                    </div>
                </div>
            }
            </div>
        })}
        </div>
        <PaginationBar pageState={{...commentListResponse, list:undefined}} onMove={onMove}/>
    </>
}

export default Comment;