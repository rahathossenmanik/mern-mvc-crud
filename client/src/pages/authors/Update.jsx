import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { DateInput } from 'semantic-ui-calendar-react';
import { Button, Container, Form, Header } from 'semantic-ui-react';

const Update = ({ match }) => {
  const [author, setAuthor] = useState({
    givenName: '',
    lastName: '',
    country: '',
    birthdate: ''
  });
  useEffect(() => {
    axios.get(`/api/authors/${match.params._id}`).then((response) => {
      response.data.birthdate = response.data.birthdate.slice(0, 10);
      setAuthor(response.data);
    });
  }, [match]);

  const [redirect, setRedirect] = useState(false);

  const handleInputChange = (event, { name, value }) => {
    setAuthor((prevValue) => ({ ...prevValue, [name]: value }));
  };

  const handleFormSubmission = () => {
    axios
      .put(`/api/authors/${match.params._id}`, author)
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
        <Navigate to="/authors" push />
      ) : (
        <>
          <Header as="h2">Edit</Header>
          <Form widths="equal">
            <Form.Group>
              <Form.Input label="Name" name="givenName" value={author.givenName} onChange={handleInputChange} />
              <Form.Input label="Apellido" name="lastName" value={author.lastName} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group>
              <Form.Input label="Country" name="country" value={author.country} onChange={handleInputChange} />
              <DateInput
                label="Date of Birth"
                startMode="year"
                popupPosition="bottom center"
                name="birthdate"
                preserveViewMode={false}
                animation="none"
                closable
                icon={false}
                dateFormat="YYYY-MM-DD"
                value={author.birthdate}
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
