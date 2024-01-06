import React, { useEffect, useState } from 'react';
import './App.css';
import Input from "./Components/Input";
import List from "./Components/List";
import requets from "./utilits/request";



type ItemTest = {
  id: number,
  name: string,
  site: string,
  siteId: string,
  status: string,
  type: string,
}

type Data = {
  tests: ItemTest[] | [],
  loading: boolean,
  error: boolean | string,
}
function App() {
  const [searchStr, setSearchStr] = useState<string>("");
  const [data, setData] = useState<Data>({
    tests: [],
    loading: false,
    error: false,
  }); 
  useEffect(() => {
    requets(data, setData);
  }, []);
  const {tests, loading, error} = data;
  return (
    <div className="App">
      <h1>Dashboard</h1>
      <Input setSearchStr={setSearchStr} total={tests.length} searchStr={searchStr}/>
      {loading && <div className="loading">Loading...</div>}
      {error && <div className="error">Error. Try later</div>}
      {tests.length === 0 ? false : <List setSearchStr={setSearchStr} list={tests.filter(item => item.name.toLocaleLowerCase().includes(searchStr.toLocaleLowerCase()))}/>}
    </div>
  );
}

export default App;
