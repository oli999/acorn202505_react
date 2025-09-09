// ToastEditorRaw.jsx
import '@toast-ui/editor/dist/toastui-editor.css';
import Editor from '@toast-ui/editor';
import { useEffect, useRef } from 'react';

export default function ToastEditorRaw({ value = '', onChange }) {
  const elRef = useRef(null);
  const instRef = useRef(null);

  useEffect(() => {
    if (!elRef.current) return;
    instRef.current = new Editor({
      el: elRef.current,
      height: '420px',
      initialEditType: 'wysiwyg',
      previewStyle: 'vertical',
      initialValue: value,
      events: {
        change: () => onChange?.(instRef.current.getMarkdown()),
      },
    });
    return () => instRef.current?.destroy();
  }, []);

  return <div ref={elRef} />;
}
