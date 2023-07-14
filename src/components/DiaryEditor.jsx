import React, { useState } from 'react';

export default function DiaryEditor() {
  const [state, setState] = useState({
    author: '',
    content: '',
    emotion: 1,
  });
  const { author, content, emotion } = state;

  const handleChangeState = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('SUCCESS');
    setState({ author: '', content: '', emotion: 1 });
  };

  return (
    <div className='DiaryEditor'>
      <h2>오늘의 일기</h2>
      <div>
        <input
          name='author'
          type='text'
          value={author}
          onChange={handleChangeState}
        />
      </div>
      <div>
        <textarea
          name='content'
          cols='30'
          value={content}
          onChange={handleChangeState}
        ></textarea>
      </div>
      <div>
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
