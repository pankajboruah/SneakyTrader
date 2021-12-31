import logo from './logo.svg';
import { Card, Input } from "antd";
import './sass/index.scss';
import './App.scss';

function App() {
  return (
    <div >
      <header >
        <Card title="card">
          Scaffold
          <Input placeholder="enter"/>
        </Card>
      </header>
    </div>
  );
}

export default App;
