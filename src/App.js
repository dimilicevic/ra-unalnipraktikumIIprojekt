import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';


import { Account } from './components/Account';
import { ATMScreen } from './components/ATMScreen';

function App() {
  return (
    <Router>
      {/* <Navbar bg="light" expand="sm">
        <div className='container'>
          <Navbar.Brand >ATM Simulator</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Link className="nav-link" to="/">ATMScreen</Link>
              <Link className="nav-link" to="/withdraw">AmountWithdrawal</Link>
            </Nav>
          </Navbar.Collapse>
        </div>
      </Navbar> */}
      <Routes>
        <Route exact path='/' element={< ATMScreen />}></Route>
        <Route exact path='/account/:accountNumber' element={< Account />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
