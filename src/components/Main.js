import React, { useEffect, useState} from "react";
import Container from 'react-bootstrap/Container'
import socket from './Socket'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

const axios = require('axios').default;


const Main = () => {
  
  const [message, setMessage] = useState({});
  const [validated, setValidated] = useState(false); 
  const [filters, setFilters] = useState({ filters:''});

  const socketListen = () =>{
    socket.on('message', (messageOne) => {  
      let tweet = JSON.parse(messageOne)
      const tweetData = {
        id: tweet.data.id,
        text: tweet.data.text
      }
      console.log('tweetData',  tweetData)
      setMessage(tweetData);
      console.log('message', message)
    });
  }

  useEffect(()=>{
    //socketListen()
    getRules()
  },[]);

  const getRules = ()=> {
    let result = ''
    axios.get(process.env.REACT_APP_API_URL + '/getFilters',
    {
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+sessionStorage.getItem('token')
      }
    })
    .then(function (response) {
        if(response.request.status === 200) {
            result = response.data.filters
            setFilters({filters:result})
        }
        else alert(response.data.error)
    })
    .catch(function (error) {
        console.log('error catch getRules', error);
    });
    return result;
}

  socketListen();
  

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
    }
    setValidated(true); 
    
    if(form.checkValidity() === true) {
        event.preventDefault();
        event.stopPropagation();
        axios.post(process.env.REACT_APP_API_URL + '/newstopics', 
            filters,
            {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTWFyY28iLCJlbWFpbCI6Im1tYXJjb2FudG9uaW9sb3BlekBnbWFpbC5jb20iLCJleHBpcmVzSW4iOiIyIiwiaWF0IjoxNjU0NjEyMDk3fQ.lCLvSvsGZ8KXWXGo_m5faCtJeL6W78jkYAErtnYJoCs'
            }
        })
        .then(function (response) {
            console.log(response);
            if(response.request.status === 200) {
                if(response.data.error === undefined){
                    console.log('data response filter news', response.data)
                }
                else{
                    alert('Filter:'+response.data.error)
                }
                
            }
            else {
                console.log('code 400 set filter error', response.data)
            }
        })
        .catch(function (error) {
            console.log('catch filter', error)
            alert('Filter Status:'+ error);
        });
    }
    
};
  return (
    <Container className="container-fluid">
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="mb-3">
            <Form.Group as={Col} md="12" controlId="validationCustom01a">
                <Form.Label>Ingresa una cadena de palabras separadas por comas para obtener Topics sobre eso:</Form.Label>
                <Form.Control
                    required
                    type="text"
                    placeholder=""
                    value={filters.filters}
                    onChange={e => setFilters({ ...filters, filters: e.target.value })}
                />
                <Form.Control.Feedback>Correcto!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid"> Por favor, el valor es requerido! </Form.Control.Feedback>
            </Form.Group>

         
        </Row>
        <Button type="submit">Filtrar</Button>
      </Form>
        <Card>
          <Card.Header>Tweet</Card.Header>
          <Card.Body>
            <blockquote className="blockquote mb-0">
            <h6>{message.id}</h6>
            <p>
                {message.text}
              </p>
            </blockquote>
          </Card.Body>
        </Card>
    </Container>
    
  )
}

export default Main
