// src/components/Comment.jsx

//클래스를 쉽게 제어하기 위한 유틸리티
import cn from 'classnames';
import { useSelector } from 'react-redux';

function Comment({category, parentNum, parentWriter, list}) {

    // redux store 로 부터 로그인 정보를 얻어낸다 
    let userInfo = useSelector(state=>state.userInfo);
    // 만일 로그인을 하지 않았으면 null 이기 때문에 빈 object 를 넣어준다.
    if(!userInfo)userInfo={};
    
    return <>
    	<div className="card my-3">
		  <div className="card-header bg-primary text-white">
		    댓글을 입력해 주세요
		  </div>
		  <div className="card-body">
		    <form action="/v1/comments" method="post">
		      <input type="hidden" name="parentNum" value={parentNum} />
		      <input type="hidden" name="targetWriter" value={parentWriter} />
		      <div className="mb-3">
		        <label htmlFor="commentContent" className="form-label">댓글 내용</label>
		        <textarea id="commentContent" name="content" rows="5" className="form-control" placeholder="댓글을 입력하세요"></textarea>
		      </div>
		      <button type="submit" className="btn btn-success">등록</button>
		    </form>
		  </div>
		</div>

        <div className="comments">
        {list.map(item=>
            <div key={item.num} className={cn("card","mb-3", {"ms-5 re-re d-none": item.num !== item.groupNum})}>
            { item.deleted === 'yes' && 
                <div className="card-body bg-light text-muted rounded">삭제된 댓글 입니다</div>
            }
            { item.deleted !== 'yes' &&
                <div className="card-body d-flex flex-column flex-sm-row position-relative">
                { item.replyCount !== 0 && item.num === item.groupNum && 
                    <button className="dropdown-btn btn btn-outline-secondary btn-sm position-absolute"
                        style={{bottom:"16px", right:"16px"}}>
                        <i className="bi bi-caret-down"></i>
                        답글 {item.replyCount} 개
	            	</button> 
                }
                { item.num !== item.groupNum &&
                    <i className="bi bi-arrow-return-right position-absolute" 
                        style={{top:0, right:"-30px"}}></i>       
                }
                { item.writer === userInfo.userName && 
                    <button data-num={item.num} 
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
                            <button className="btn btn-sm btn-outline-secondary edit-btn">수정</button>
                            <div className="d-none form-div">
                                <form action="" method="post">
                                    <input type="hidden" name="num" value={item.num}/>
                                    <input type="hidden" name="parentNum" value={parentNum}/>
                                    <textarea name="content" className="form-control mb-2" rows="2" >{item.content}</textarea>
                                    <button type="submit" className="btn btn-sm btn-success">수정 완료</button>
                                    <button type="reset" className="btn btn-sm btn-secondary cancel-edit-btn">취소</button>
                                </form>
                            </div>
                        </>
                        } 
                        { item.writer !== userInfo.userName &&
                        <>
                            <button className="btn btn-sm btn-outline-primary show-reply-btn">댓글</button>  
                            <div className="d-none form-div">
                                <form action="" method="post">
                                    <input type="hidden" name="parentNum" value={parentNum}/>
                                    <input type="hidden" name="targetWriter" value={item.writer}/>
                                    <input type="hidden" name="groupNum" value={item.groupNum}/>
                                    <textarea name="content" className="form-control mb-2" rows="2" 
                                        placeholder="댓글을 입력하세요..."></textarea>
                                    <button type="submit" className="btn btn-sm btn-success">등록</button>
                                    <button type="reset" className="btn btn-sm btn-secondary cancel-reply-btn">취소</button>
                                </form>
                            </div>                     
                        </>
                        } 
                    </div>
                </div>
            }
            </div>
        )}
        </div>
    </>
}

export default Comment;