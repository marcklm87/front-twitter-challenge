import React, { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import { useHistory } from 'react-router-dom';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import  Image  from 'react-bootstrap/Image'
import Modal from 'react-bootstrap/Modal'
const axios = require('axios').default;


const BooksTable = () => {
  const history = useHistory();
  /* MODAL */
  const [show, setShow] = useState(false);
  const [showLend, setShowLend] = useState(false); // bandera para mostrar modal lend to others
  const [detailModal, setdetailModal] = useState({ action:'', api:''})
  const [validatedModal, setValidatedModal] = useState(false);
  const [msgSelectCategoria, setmsgSelectCategoria] = useState(''); 
  const [userSelected, setuserSelected] = useState(0);

  const getBase64 = (file) => {
    const data = new Promise((resolve) => {
      let baseURL = '';
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        baseURL = reader.result;
        resolve(baseURL);
      };
    });
    return data;
  };
  
  const handleCloseAndSaveLend = async () => {
      const bookLend = {
        book: selectBook.id,
        user: userSelected
      }
      console.log('url axios lend book by admin', process.env.REACT_APP_API_URL + '/lend-book')
      axios.put(process.env.REACT_APP_API_URL + '/lend-book', 
        bookLend,
        {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+sessionStorage.getItem('token')
        }
      })
      .then(function (response) {
          console.log(response);
          if(response.request.status === 200) alert(response.data.message)
          else alert(response.data.error)
          getBooks()
      })
      .catch(function (error) {
          console.log('axuios->',error);
      });
      setShowLend(false);
  }

  const handleCloseAndSaveBook = async () => {
    const form = document.getElementById('bookForm');
    setValidatedModal(true)
    if(selectBook.category_id <= 0) setmsgSelectCategoria('Por favor selecciona una categoria!')
    if(form.checkValidity() === true && selectBook.category_id > 0){
      const file = document.getElementsByName('coverFileInput')[0].files[0];
      const streamString = await getBase64(file);
      console.log('file image cover streamString', streamString)
      const bookNew = {
        title: selectBook.title,
        year: selectBook.year_publication,
        author: selectBook.author,
        category: selectBook.category_id,
        cover_image:streamString
      }
      console.log('url axios edit book', process.env.REACT_APP_API_URL + detailModal.api)
      axios.put(process.env.REACT_APP_API_URL + detailModal.api, 
        bookNew,
        {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+sessionStorage.getItem('token')
        }
      })
      .then(function (response) {
          console.log(response);
          if(response.request.status === 200) alert(response.data.message)
          else alert(response.data.error)
          getBooks()
      })
      .catch(function (error) {
          console.log('axuios->',error);
      });
      setShow(false);
    }
    setmsgSelectCategoria('')
  }
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // modal user lend
  const handleCloseLend = () => setShowLend(false);
  const handleShowLend = () => setShowLend(true);
  //modal
  const [listBooks, setlistBooks] = useState([]);
  const [listCategory, setlistCategory] = useState([]);
  const [category, setCategory] = useState(0);
  const [selectBook, setselectBook] = useState({author:'', category_id:0, id:0, image_code:'', title:'', year_publication:''});
  const [editOn, setEditOn] = useState(false);
  const [listUsers, setlistUsers] = useState([]);

  const getCategory = ()=> {
    axios.get(process.env.REACT_APP_API_URL + '/catalog/category',
    {
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+sessionStorage.getItem('token')
      }
    })
    .then(function (response) {
        console.log('getCategory', response);
        if(response.request.status === 200) {
          setlistCategory(response.data.data)
        }
        else alert(response.data.error)
    })
    .catch(function (error) {
        console.log('error catch getCategory', error);
    });
  }
  
  const getUsers = ()=> {
    axios.get(process.env.REACT_APP_API_URL + '/catalog/users',
    {
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+sessionStorage.getItem('token')
      }
    })
    .then(function (response) {
        console.log('getUsers', response);
        if(response.request.status === 200) {
          setlistUsers(response.data.data)
        }
        else alert(response.data.error)
    })
    .catch(function (error) {
        console.log('error catch getCategory', error);
    });
  }

  const getBooks = ()=> {
    axios.get(process.env.REACT_APP_API_URL + '/book-list?category='+ category,
    {
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+sessionStorage.getItem('token')
      }
    })
    .then(function (response) {
        console.log(response);
        if(response.request.status === 200) {
          setlistBooks(response.data.data)
        }
        else alert(response.data.error)
    })
    .catch(function (error) {
        console.log('error catch get books', error);
    });
  }
  
  useEffect(() => {
    /** sessionStorage.setItem('name', response.data.name);
                    sessionStorage.setItem('email', login.email);
                    sessionStorage.setItem('isadmin', response.data.name);
                    sessionStorage.setItem('token', response.data.token);
                    sessionStorage.setItem('islogin', 1); */
    // sessionStorage.removeItem('islogin');     
    console.log('useeffect bookstable', sessionStorage.getItem('token'), sessionStorage.getItem('islogin'), sessionStorage.getItem('maki'))               
    if(sessionStorage.getItem('islogin') === null) window.location.href = '/';
    else {
      getBooks()
      getCategory()
      getUsers()
    }
  }, []);

  const handleBorrowBook = (event, book) => {
    axios.put(process.env.REACT_APP_API_URL + '/borrow-book', 
      {
        "book": book.id
      },
      {
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+sessionStorage.getItem('token')
      }
    })
    .then(function (response) {
        console.log(response);
        if(response.request.status === 200) alert(response.data.message)
        else alert(response.data.error)
        getBooks()
    })
    .catch(function (error) {
        console.log('axuios->',error);
    });
  }
  const handleLendBook = (event, book) => {
    handleShowLend()
    setselectBook(book)
  }
  const handleEditBook = (event, book) => {
    console.log('handleEditBook', event, book)
    setEditOn(true)
    book.on= editOn
    setselectBook(book)
    console.log('book selected', book, editOn)
    handleShow()
    setdetailModal({ action:'Editar', api:'/edit-book/'+ book.id, id:book.id})
  }
  const handlerRegister = (event) => {
    handleShow()
    console.log('handlerRegister', event)
    setdetailModal({ action:'Agregar', api:'/add-book', id:''})
    setselectBook({author:'', category_id:0, id:0, image_code:'', title:'', year_publication:''})
  }
  const handlerFilter = (event) => {
    console.log('handlerFilter', event)
    console.log('select category', category)
    getBooks()
  }

  const handleDeleteBook = (event, book) => {
    console.log('handleDeleteBook', event, book)
    axios.delete(process.env.REACT_APP_API_URL + '/delete-book/'+book.id,
    {
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+sessionStorage.getItem('token')
      }
    })
    .then(function (response) {
        console.log('responde delete', response);
        if(response.request.status === 200) {
          alert('Delete Status: ' +response.data.message)
        }
        else alert(response.data.error)
        getBooks()
    })
    .catch(function (error) {
        console.log('error delete book', error);
    });

  }

  return (
    <Container className="container-fluid">
      <Modal show={showLend} onHide={handleCloseLend}>
          <Modal.Header closeButton>
          <Modal.Title> Prestar Libro a</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form id='lendForm' noValidate>
              <Row className="mb-3">
                  <Form.Group as={Col} md="12" controlId="validationCustom04Lend">
                      <Form.Label>Usuario</Form.Label>
                      <select id='selectModalUser' onChange={e => setuserSelected( e.target.value )} md="3" className="form-select" aria-label="Default">
                        { listUsers.map((user)=>(
                          <option key={user.id} value={user.id}>{user.userName}</option>
                        ))}
                    </select>
                    <Form.Control.Feedback>  </Form.Control.Feedback>
                  </Form.Group>
              </Row>
            </Form>
          </Modal.Body>
          <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseLend}>
              Cerrar
          </Button>
          <Button variant="primary" onClick={handleCloseAndSaveLend}>
              Guardar cambios
          </Button>
          </Modal.Footer>
      </Modal>

      <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
          <Modal.Title>{detailModal.action} Libro {detailModal.id}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form id='bookForm' noValidate validated={validatedModal}>
              <Row className="mb-3">
                  <Form.Group as={Col} md="12" controlId="validationCustom01">
                      <Form.Label>Title</Form.Label>
                      <Form.Control
                          required
                          type="text"
                          placeholder="Nombre completo"
                          value={selectBook.title}
                          onChange={e => setselectBook({ ...selectBook, title: e.target.value })}
                      />
                      <Form.Control.Feedback>Correcto!</Form.Control.Feedback>
                      <Form.Control.Feedback type="invalid"> Por favor, el valor es requerido! </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} md="12" controlId="validationCustom02">
                      <Form.Label>Author</Form.Label>
                      <Form.Control
                          required
                          type="text"
                          placeholder="Soto Mars"
                          value={selectBook.author}
                          onChange={e => setselectBook({ ...selectBook, author: e.target.value })}
                      />
                      <Form.Control.Feedback>Correcto!</Form.Control.Feedback>
                      <Form.Control.Feedback type="invalid"> Por favor, el valor es requerido! </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col} md="12" controlId="validationCustom03">
                      <Form.Label>Year</Form.Label>
                      <Form.Control
                          required
                          type="number"
                          placeholder=""
                          value={selectBook.year_publication}
                          onChange={e => setselectBook({ ...selectBook, year_publication: e.target.value })}
                          min="1" 
                          max="2050"
                      />
                      <Form.Control.Feedback>Correcto!</Form.Control.Feedback>
                      <Form.Control.Feedback type="invalid"> Por favor, el valor es numerico y es requerido! </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col} md="12" controlId="validationCustom04">
                      <Form.Label>Cover</Form.Label>
                      <Form.Control
                          required
                          type="file"
                          placeholder=""
                          accept="image/*"
                          name='coverFileInput'
                      />
                      <Form.Control.Feedback>Correcto!</Form.Control.Feedback>
                      <Form.Control.Feedback type="invalid"> Por favor, es requerido una imagen! </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col} md="12" controlId="validationCustom04">
                      <Form.Label>Category</Form.Label>
                      <select id='selectModalCategory' onChange={e => setselectBook({ ...selectBook, category_id: e.target.value })} md="3" className="form-select" aria-label="Default">
                        { listCategory.map((category)=>(
                          <option selected={selectBook.category_id === category.id ? 'selected' :'-' } key={category.id} value={category.id}>{category.name}</option>
                        ))}
                    </select>
                    <Form.Control.Feedback> {msgSelectCategoria} </Form.Control.Feedback>
                  </Form.Group>

              </Row>
            </Form>
          </Modal.Body>
          <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
              Cerrar
          </Button>
          <Button variant="primary" onClick={handleCloseAndSaveBook}>
              Guardar cambios
          </Button>
          </Modal.Footer>
      </Modal>
      <Row>
        <Col>
          <Form className='d-inline-flex col-12'>
          { sessionStorage.getItem('isadmin') !== null ? (<Button md="3" type="button" onClick={handlerRegister}>Registrar</Button>) : null }
            <select onChange={e => setCategory( e.target.value )} md="3" className="form-select" aria-label="Default">
              <option key="0" value="0" selected>Open this select menu</option>
              { listCategory.map((category)=>(
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
            <Button md="3" type="button" onClick={handlerFilter}>Filtrar</Button>
          </Form>
        </Col>
      </Row>
      <Row>
          <Col>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Cover</th>
                <th scope="col">Title</th>
                <th scope="col">Category</th>
                <th scope="col">Year</th>
                <th scope="col">Borrow by</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              { listBooks.map((book)=>(
                <tr>
                  <th scope="row">{book.id}</th>
                  <td><Image src={book.image_code}/></td>
                  <td>{book.title}</td>
                  <td>{book.category}</td>
                  <td>{book.year_publication}</td>
                  <td>{book.usuario}</td>
                  <td>
                    <div className='d-inline-flex col-12'>
                        { sessionStorage.getItem('isadmin') !== null ? (<Button variant="primary" type='button' onClick={(event) => handleEditBook(event, book)}>Edit</Button>) : null }
                        { sessionStorage.getItem('isadmin') !== null ? (<Button variant="danger" type='button' onClick={(event) => handleDeleteBook(event, book)}>Delete</Button>) : null }
                        { sessionStorage.getItem('isadmin') !== null && book.borrow === 0 ? (<Button variant="info" type='button' onClick={(event) => handleLendBook(event, book)}>Lend-other</Button>) : null }
                        { book.borrow === 0 ? (<Button variant="dark" type='button' onClick={(event) => handleBorrowBook(event, book)}>Borrow</Button>) : null }
                        
                    </div>
                  </td>
               </tr>
              )) }
            </tbody>
          </table>
          </Col>
      </Row>
    </Container>
  )
}

export default BooksTable