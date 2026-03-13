import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Hedaer } from './components/header/Hedaer';
import { Footer } from './components/footer/Footer';
import { Dashboard } from './components/dashboard/Dashboard';
import { About } from './components/about/About';
import { Contact } from './components/contact/Contact';
import { Pagenotfound } from './components/pagenotfound/Pagenotfound';
import { Addbook } from './components/addbook/Addbook';
import { Bookdetails } from './components/bookdetails/Bookdetails';
import { Edit } from './components/edit/Edit';
import { Pagination } from './components/pagination/Pagination';

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <Hedaer />
        <main className="app-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/about-us" element={<About />} />
            <Route path="/contact-us" element={<Contact />} />
            <Route path="/add-book" element={<Addbook />} />
            <Route path="/book-details" element={<Bookdetails />} />
            <Route path="/edit/:id" element={<Edit />} />
            <Route path="/pagination" element={<Pagination />} />
            <Route path="*" element={<Pagenotfound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
