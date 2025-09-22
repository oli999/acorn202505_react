// src/components/ToastEditor.jsx

import '@toast-ui/editor/dist/toastui-editor.css';
import Editor from '@toast-ui/editor';
import { useEffect, useRef } from 'react';
/*
    value, height, onChange 라는 props 를 전달할수 있다.

    value : 초기값
    height : 높이 (기본 400px)
    onChange : change 이벤트가 일어 났을때 실행할 함수 

    Toast UI Editor 가 필요한 컴포넌트에서 import 해서 사용하면 된다.

    <ToastEditor value={초기값} height="500px" onChange={()=>{}}/>
*/
export default function ToastEditor({ value = '', height='400px', onChange }) {
  const elRef = useRef(null);
  const instRef = useRef(null);

  useEffect(() => {
    if (!elRef.current) return;
    instRef.current = new Editor({
      el: elRef.current,
      height:height,
      initialEditType: 'wysiwyg',
      previewStyle: 'vertical',
      initialValue: value,
      events: {
        change: () => {
          //만일 props 로 전달된 함수가 있으면
          if(onChange){
            //해당 함수 호출하면서 현재까지 작성한 내용을 얻어와서 전달한다
            onChange(instRef.current.getHTML());
          }
        }
      },
    });
    return () => instRef.current?.destroy();
  }, []);

  return <div ref={elRef} />;
}

