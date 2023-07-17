import { useEffect, useRef, useState } from 'react';
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
    console.log(res);

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

  return (
    <div>
      <DiaryEditor onCreate={onCreate} />
      <DiaryList diaryList={data} onRemove={onRemove} onEdit={onEdit} />
    </div>
  );
}

export default App;
