import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { DateInput } from 'semantic-ui-calendar-react';
import { Button, Container, Form, Header } from 'semantic-ui-react';

const Update = ({ match }) => {
  const [book, setBook] = useState({
    title: '',
    author: '',
    genre: '',
    publicationDate: ''
  });
  useEffect(() => {
    axios.get(`/api/books/${match.params._id}`).then((response) => {
      response.data.publicationDate = response.data.publicationDate.slice(0, 10);
      setBook(response.data);
    });
  }, [match]);

  const [authors, setAuthors] = useState([]);
  useEffect(() => {
    axios.get('/api/authors/').then((response) => {
      setAuthors(
        response.data.map((author) => ({
          text: `${author.givenName} ${author.lastName}`,
          value: author._id
        }))
      );
    });
  }, []);

  const [redirect, setRedirect] = useState(false);

  const handleInputChange = (event, { name, value }) => {
    setBook((prevValue) => ({ ...prevValue, [name]: value }));
  };

  const handleFormSubmission = () => {
    axios
      .put(`/api/books/${match.params._id}`, book)
      .then(() => {
        setRedirect(true);
      })
      .catch(() => {
        alert('An Error Occured');
      });
  };

  const handleFormCancellation = () => {
    setRedirect(true);
  };

  return (
    <>
      {redirect ? (
        <Navigate to="/books" push />
      ) : (
        <>
          <Header as="h2">Edit</Header>
          <Form widths="equal">
            <Form.Group>
              <Form.Input label="Title" name="title" value={book.title} onChange={handleInputChange} />
              <Form.Select label="Author" name="author" options={authors} value={book.author} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group>
              <Form.Input label="Genre" name="genre" value={book.genre} onChange={handleInputChange} />
              <DateInput
                label="Publication Date"
                startMode="year"
                popupPosition="bottom center"
                name="publicationDate"
                preserveViewMode={false}
                animation="none"
                closable
                icon={false}
                dateFormat="YYYY-MM-DD"
                value={book.publicationDate}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
          <Container textAlign="right">
            <Button color="red" content="Cancelar" onClick={handleFormCancellation} />
            <Button color="green" content="Guardar" onClick={handleFormSubmission} />
          </Container>
        </>
      )}
    </>
  );
};

export default Update;
