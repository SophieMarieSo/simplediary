import { useRef, useState } from 'react';
import './App.css';
import DiaryEditor from './components/DiaryEditor';
import DiaryList from './components/DiaryList';

function App() {
  const [data, setData] = useState([]);
  const dataId = useRef(0);

  const onCreate = (author, content, emotion) => {
    const create_date = new Date().getTime();
    const newItem = {
      id: dataId.current,
      author,
      content,
      emotion,
      create_date,
    };
    dataId.current++;
    setData([newItem, ...data]);
  };

  const onDelete = (id) => {
    const newDiaryList = data.filter((list) => list.id !== id);
    setData(newDiaryList);
  };

  return (
    <div>
      <DiaryEditor onCreate={onCreate} />
      <DiaryList diaryList={data} onDelete={onDelete} />
    </div>
  );
}

export default App;
