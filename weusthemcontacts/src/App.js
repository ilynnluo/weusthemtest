import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ContactPage, ListPage, AddPage } from "./pages"

function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={ <ListPage /> } />
        <Route path='contact/:id' element={ <ContactPage /> } />
        <Route path='add' element={ <AddPage /> } />
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;


      
