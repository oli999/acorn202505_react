// src/components/AlertModal.jsx

import { Button, Modal } from "react-bootstrap";

/*
    3 개의 props 를 전달받아서 동작하는 react bootstrap 의 Modal

    show : boolean type 모달을 띄울지 여부
    message : Modal 에 띄울 메세지
    onYes : function type "확인" 버튼을 눌렀을때 실행할 함수 
*/
function AlertModal({show, message, onYes}) {
    return (
        <Modal show={show}>
            <Modal.Header>알림</Modal.Header>
            <Modal.Body>{message}</Modal.Body>
            <Modal.Footer>
                <Button variant="success" onClick={onYes}>확인</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AlertModal;