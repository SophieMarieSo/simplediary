import React, { useRef, useState } from 'react';

function DiaryItem({
  id,
  author,
  content,
  emotion,
  created_date,
  onRemove,
  onEdit,
}) {
  const [isEdit, setIsEdit] = useState(false);
  const [text, setText] = useState(content);
  const textInput = useRef();

  const toggleIsEdit = () => setIsEdit(!isEdit);

  const handleRemove = () => {
    if (window.confirm(`${id + 1}번 째 일기를 정말 삭제하시겠습니까?`))
      onRemove(id);
  };

  const handleQuitEdit = () => {
    toggleIsEdit();
    setText(content);
  };

  const handleEdit = () => {
    if (text.length < 5) {
      textInput.current.focus();
      return;
    }

    if (window.confirm(`${id + 1}번 째 일기를 수정하시겠습니까?`)) {
      onEdit(id, text);
      toggleIsEdit();
    }
  };

  return (
    <div className='DiaryItem'>
      <div className='info'>
        <span className='author_info'>
          작성자 : {author} | 감정점수 : {emotion}
        </span>
        <br />
        <span className='date'>
          {new Date(created_date).toLocaleDateString()}
        </span>
      </div>
      <div className='content'>
        {isEdit ? (
          <textarea
            value={text}
            ref={textInput}
            onChange={(e) => setText(e.target.value)}
          />
        ) : (
          <>{content}</>
        )}
      </div>
      {isEdit ? (
        <>
          <button onClick={handleQuitEdit}>수정 취소</button>
          <button onClick={handleEdit}>수정 완료</button>
        </>
      ) : (
        <>
          <button onClick={handleRemove}>삭제하기</button>
          <button onClick={toggleIsEdit}>수정하기</button>
        </>
      )}
    </div>
  );
}

export default React.memo(DiaryItem);
