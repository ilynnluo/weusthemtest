import { Button, Row, Col, Spinner, Modal, Container } from "react-bootstrap"
import React, { useEffect } from "react"
import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import { ContactInfoUI } from "../../components"

export function HandlePage() {
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [contact, setContact] = useState();
  const [show, setShow] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    const ln = form.ln.value;
    const fn = form.fn.value;
    const email = form.email.value;
    const number = form.number.value;
    const avatar = form.avatar.value;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      setValidated(true);
      setLoading(true);
      event.preventDefault();
      event.stopPropagation();
      axios.put(`http://127.0.0.1:4000/contacts/${id}`, {
        fn: fn,
        ln: ln,
        email: email,
        number: number,
        avatar: avatar
      })
        .then((res) => {
          if (res.status === 200) {
            navigate("/");
            setLoading(false);
          }
        })
    }

  };

  const handleDelete = () => {
    axios.delete(`http://127.0.0.1:4000/contacts/${id}`)
      .then((res) => {
        if (res.status === 200) {
          navigate("/");
        }
      })
  }

  useEffect(() => {
    axios.get(`http://127.0.0.1:4000/contacts/${id}`)
      .then((res) => {
        const data = res.data;
        console.log(data)
        setContact(data);
        setLoading(false);
      })
  }, [id])


  return (
    <>
      {
        loading ? (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : (
          <Container>
            <ContactInfoUI validated={validated} contact={contact} handleSubmit={handleSubmit} />
            <Row style={{ marginTop: "2rem" }}>
              <Col xs="12">
                <Button
                  variant="secondary"
                  style={{ width: "100%" }}
                  onClick={handleShow}
                >
                  Delete
                </Button>
                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Delete</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>Are you sure to delete this contact?</Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Close
                    </Button>
                    <Button variant="primary" onClick={handleDelete}>
                      Delete
                    </Button>
                  </Modal.Footer>
                </Modal>
              </Col>
            </Row>
          </Container>
        )
      }


    </>
  );
}