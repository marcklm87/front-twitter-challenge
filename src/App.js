import './App.css';
// import Container from 'react-bootstrap/Container'
// import Form from 'react-bootstrap/Form'
// import Button from 'react-bootstrap/Button'
import LoginRegister from './components/LoginRegister'
import Routes from './routes'; 
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Routes />
      </Switch>
    </Router>
    // <LoginRegister></LoginRegister>
    /*
    <Container id="main-container" className='d-grid h-100 '>
      <Form id="sign-in-form" className='text-center w-100'>
        <h1 className='fs-3 fw-normal'>Iniciar sesión</h1>
        <Form.Group>
          <Form.Control type="email" size="lg" placeholder='Correo electronico' autoComplete='username' className='position-relative'></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Control type="email" size="lg" placeholder='Contraseña' autoComplete='current-password' className='position-relative'></Form.Control>
        </Form.Group>
        <div className='mt-2 d-grid'>
          <Button variant='primary' size='lg'>Entrar</Button>
        </div>
        <div className='mt-5 d-grid'>
          <Button variant='success' size='lg'>Crea una cuenta nueva</Button>
        </div>
      </Form>
      
    </Container>
    */
    /*
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
    */
  );
}

export default App;
