import { useEffect, useMemo, useRef, useState } from 'react';
import './App.css';
import DiaryEditor from './components/DiaryEditor';
import DiaryList from './components/DiaryList';

function App() {
  const [data, setData] = useState([]);
  const dataId = useRef(0);

  const getData = async () => {
    const res = await fetch(
      'https://jsonplaceholder.typicode.com/comments'
    ).then((res) => res.json());

    const initData = res.slice(0, 20).map((item) => {
      return {
        id: dataId.current++,
        author: item.email,
        content: item.body,
        emotion: Math.floor(Math.random() * 5) + 1,
        created_date: new Date().getTime(),
      };
    });

    setData(initData);
  };

  useEffect(() => {
    getData();
  }, []);

  const onCreate = (author, content, emotion) => {
    const created_date = new Date().getTime();
    const newItem = {
      id: dataId.current,
      author,
      content,
      emotion,
      created_date,
    };
    dataId.current++;
    setData([newItem, ...data]);
  };

  const onRemove = (id) => {
    const newDiaryList = data.filter((list) => list.id !== id);
    setData(newDiaryList);
  };

  const onEdit = (id, newContent) => {
    setData(
      data.map((item) =>
        item.id === id ? { ...item, content: newContent } : item
      )
    );
  };

  const getDiaryAnalsis = useMemo(() => {
    console.log('일기 분석 시작');

    const goodCount = data.filter((item) => item.emotion >= 3).length;
    const badCount = data.length - goodCount;
    const goodRatio = (goodCount / data.length) * 100;

    return { goodCount, badCount, goodRatio };
  }, [data.length]);

  const { goodCount, badCount, goodRatio } = getDiaryAnalsis;

  return (
    <div>
      <DiaryEditor onCreate={onCreate} />
      <div>전체 일기 : {data.length}</div>
      <div>기분 좋은 일기 개수 : {goodCount}</div>
      <div>기분 나쁜 일기 개수 : {badCount}</div>
      <div>기분 좋은 일기 비율 : {goodRatio}</div>
      <DiaryList diaryList={data} onRemove={onRemove} onEdit={onEdit} />
    </div>
  );
}

export default App;
