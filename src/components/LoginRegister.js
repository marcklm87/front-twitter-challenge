import React, {useState} from 'react'
import { useHistory } from 'react-router-dom';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
const axios = require('axios').default;

// require('dotenv').config() 

const LoginRegister = () => {
    const history = useHistory();
    const [validated, setValidated] = useState(false);
    const [validatedLogin, setValidatedLogin] = useState(false);
    const [details, setDetails] = useState({ name: '', lastname: '', email:'', password:'' });
    const [login, setLogin] = useState({ email:'', password:'' });
    const [isOn, setisOn] = useState(false);
    
    if( sessionStorage.getItem('islogin') === 1) setisOn(true)
    const redirect = () => {
        // sessionStorage.setItem('isLogin', 'true');
        history.push('/books');
        window.location.href = '/books';
    };
    
    const handleSubmit = (event) => {
        // console.log('api', process.env.REACT_APP_API_URL, details.name )
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true); 
        console.log('checar validity register', form.checkValidity())
        
        if(form.checkValidity() === true) {
            event.preventDefault();
            event.stopPropagation();
            console.log('details', details)
            axios.put(process.env.REACT_APP_API_URL + '/add-user', 
                details,
                {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer x'
                }
            })
            .then(function (response) {
                console.log(response);
                if(response.request.status === 200) {
                    setDetails({ name: '', lastname: '', email:'', password:'' })
                    alert(response.data.message)
                }
                else alert(response.data.error)
            })
            .catch(function (error) {
                console.log(error);
            });
        }
        
    };

    const handleSubmitLogin = (event) => {
        // console.log('api', process.env.REACT_APP_API_URL, details.name )
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidatedLogin(true); 
        console.log('checar validity login', form.checkValidity())
        
        if(form.checkValidity() === true) {
            event.preventDefault();
            event.stopPropagation();
            console.log('details', login)
            axios.post(process.env.REACT_APP_API_URL + '/login', 
                login,
                {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer x'
                }
            })
            .then(function (response) {
                console.log(response);
                if(response.request.status === 200) {
                    if(response.data.error == undefined){
                        console.log('exito login', response.data)
                        sessionStorage.setItem('name', response.data.name);
                        sessionStorage.setItem('email', login.email);
                        if(response.data.isadmin === 1) sessionStorage.setItem('isadmin', response.data.isadmin);
                        sessionStorage.setItem('token', response.data.token);
                        sessionStorage.setItem('islogin', 1);
                        setisOn(true)
                    }
                    else{
                        alert('Login:'+response.data.error)
                    }
                    
                }
                else {
                    console.log('code 400 login error', response.data)
                    alert('Login:'+ response.data.error)
                }
            })
            .catch(function (error) {
                console.log('catch login', error.response.data.error)
                alert('Login Status:'+ error.response.data.error);
            });
        }
        
    };

    return (
        <div>
            {  (sessionStorage.getItem('islogin') !== null) ? redirect(): 
            (     
            <Container id='main-container' className='d-grid h-100 '>
            <Row>
                <Col>
                    <h1 className='fs-3 fw-normal'>Registrate</h1>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="12" controlId="validationCustom01">
                                <Form.Label>Nombre completo</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Nombre completo"
                                    value={details.name}
                                    onChange={e => setDetails({ ...details, name: e.target.value })}
                                />
                                <Form.Control.Feedback>Correcto!</Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid"> Por favor, el valor es requerido! </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="12" controlId="validationCustom02">
                                <Form.Label>Apellidos</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Soto Mars"
                                    value={details.lastname}
                                    onChange={e => setDetails({ ...details, lastname: e.target.value })}
                                />
                                <Form.Control.Feedback>Correcto!</Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid"> Por favor, el valor es requerido! </Form.Control.Feedback>
                            </Form.Group>
    
                            <Form.Group as={Col} md="12" controlId="validationCustom03">
                                <Form.Label>Correo electronico</Form.Label>
                                <Form.Control
                                    required
                                    type="email"
                                    placeholder="email@mail.com"
                                    value={details.email}
                                    onChange={e => setDetails({ ...details, email: e.target.value })}
                                />
                                <Form.Control.Feedback>Correcto!</Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid"> Por favor, el valor es requerido! </Form.Control.Feedback>
                            </Form.Group>
    
                            <Form.Group as={Col} md="12" controlId="validationCustom04">
                                <Form.Label>Contraseña</Form.Label>
                                <Form.Control
                                    required
                                    type="password"
                                    placeholder=""
                                    value={details.password}
                                    onChange={e => setDetails({ ...details, password: e.target.value })}
                                />
                                <Form.Control.Feedback>Correcto!</Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid"> Por favor, el valor es requerido! </Form.Control.Feedback>
                            </Form.Group>
    
                        </Row>
                        <Button type="submit">Registrar</Button>
                    </Form>
                </Col>
                <Col>
                <h1 className='fs-3 fw-normal'>Inicia sesión</h1>
                    <Form noValidate validated={validatedLogin} onSubmit={handleSubmitLogin}>
                        <Row className="mb-3">
    
                            <Form.Group as={Col} md="12" controlId="validationCustom01a">
                                <Form.Label>Correo electronico</Form.Label>
                                <Form.Control
                                    required
                                    type="email"
                                    placeholder="email@mail.com"
                                    value={login.email}
                                    onChange={e => setLogin({ ...login, email: e.target.value })}
                                />
                                <Form.Control.Feedback>Correcto!</Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid"> Por favor, el valor es requerido! </Form.Control.Feedback>
                            </Form.Group>
    
                            <Form.Group as={Col} md="12" controlId="validationCustom02a">
                                <Form.Label>Contraseña</Form.Label>
                                <Form.Control
                                    required
                                    type="password"
                                    placeholder=""
                                    value={login.password}
                                    onChange={e => setLogin({ ...login, password: e.target.value })}
                                />
                                <Form.Control.Feedback>Correcto!</Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid"> Por favor, el valor es requerido! </Form.Control.Feedback>
                            </Form.Group>
    
                        </Row>
                        <Button type="submit">Entrar</Button>
                    </Form>
                </Col>
            </Row>
            </Container>)
        }
        </div>
        
   
    )
}

export default LoginRegister