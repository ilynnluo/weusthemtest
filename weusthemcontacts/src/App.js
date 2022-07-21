import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ListPage, CreatePage, ContactPage } from "./pages"

function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={ <ListPage /> } />
        <Route path=":keywords" element={ <ListPage /> } />
        <Route path='contact/:id' element={ <ContactPage /> } />
        <Route path='create' element={ <CreatePage /> } />
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;


      
