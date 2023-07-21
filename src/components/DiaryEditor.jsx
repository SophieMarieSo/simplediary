import React, { useContext, useRef, useState } from 'react';
import { DiaryDispatchContext } from '../App';

function DiaryEditor() {
  const { onCreate } = useContext(DiaryDispatchContext);
  const [state, setState] = useState({
    author: '',
    content: '',
    emotion: 1,
  });
  const { author, content, emotion } = state;

  const authorInput = useRef();
  const contentInput = useRef();

  const handleChangeState = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (author.length < 1) {
      authorInput.current.focus();
      return;
    }
    if (content.length < 5) {
      contentInput.current.focus();
      return;
    }
    alert('SUCCESS');
    onCreate(author, content, emotion);
    setState({ author: '', content: '', emotion: 1 });
  };

  return (
    <div className='DiaryEditor'>
      <h2>오늘의 일기</h2>
      <div>
        <input
          ref={authorInput}
          name='author'
          type='text'
          value={author}
          onChange={handleChangeState}
        />
      </div>
      <div>
        <textarea
          ref={contentInput}
          name='content'
          cols='30'
          value={content}
          onChange={handleChangeState}
        ></textarea>
      </div>
      <div>
        <span>오늘의 감정점수 : </span>
        <select name='emotion' value={emotion} onChange={handleChangeState}>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
      </div>
      <div>
        <button onClick={handleSubmit}>일기 저장하기</button>
      </div>
    </div>
  );
}

export default React.memo(DiaryEditor);
