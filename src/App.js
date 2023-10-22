
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import TodoComponent from './GUI/todo';

function App() {
  return (

    <>

        <BrowserRouter>
        <Routes>

          <Route path="/" element={<TodoComponent />}/>

        </Routes>
    </BrowserRouter>

    </>

  );
}

export default App;
