import './App.css';
import Body from './components/Body';
import Header from './components/Header';
import ViewBook from './components/ViewBook';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
          <Route path="/" element={<Body/>} />
          <Route path="/view-book" element={<ViewBook/>} />
       </Routes>
    </div>
  );
}

export default App;
