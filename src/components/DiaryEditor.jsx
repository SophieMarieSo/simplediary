import React, { useState } from 'react';

export default function DiaryEditor() {
  const [state, setState] = useState({
    author: '',
    content: '',
  });
  const { author, content } = state;

  const handleChangeState = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
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
          rows='10'
          value={content}
          onChange={handleChangeState}
        ></textarea>
      </div>
    </div>
  );
}
