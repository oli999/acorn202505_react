// src/components/PaginationBar.jsx

import { Pagination } from "react-bootstrap";

/*
    pageState 는 아래 모양의 object 
    {
        pageNum: 현재 페이지 번호,
        startPageNum: 시작 페이지번호,
        endPageNum: 끝 페이지 번호,
        totalPageCount: 전체 페이지의 갯수 
    }

    onMove 는 아래 모양의 함수 , num 은 이동할 페이지의 번호를 전달하면 된다.
    (num)=>{ }
*/
function PaginationBar({pageState, onMove}) {

    //페이징 UI 를 만들때 사용할 배열을 리턴해주는 함수 
    function range(start, end) {
        const result = [];
        for (let i = start; i <= end; i++) {
            result.push(i);
        }
        return result;
    }

    //페이지 번호를 출력할때 사용하는 숫자를 배열에 미리 준비한다 
    const pageArray = range(pageState.startPageNum, pageState.endPageNum);
        
    return <>
        <Pagination>
            <Pagination.Item 
                onClick={()=>onMove(pageState.startPageNum-1)}
                disabled={pageState.startPageNum===1}
            >
                Prev
            </Pagination.Item>
            {
                pageArray.map(num => 
                    <Pagination.Item 
                        onClick={()=>onMove(num)}
                        active={pageState.pageNum === num}
                        key={num}
                    >
                        {num}
                    </Pagination.Item>
                )
            }    
            <Pagination.Item
                onClick={()=>onMove(pageState.endPageNum+1)}
                disabled={pageState.endPageNum === pageState.totalPageCount}
            >
                Next
            </Pagination.Item>
        </Pagination>    
    </>
}

export default PaginationBar;