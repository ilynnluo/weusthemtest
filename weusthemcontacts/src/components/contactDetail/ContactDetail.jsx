import { Form, Button, Row, Col, Spinner, Modal } from "react-bootstrap"
import Image from 'react-bootstrap/Image'
import React, { useEffect } from "react"
import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"

export function ContactDetail() {
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [contact, setContact] = useState();
  const { id } = useParams();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

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
      setValidated(true);
    } else {
      setValidated(false);
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
          if (res.status == 200) {
            navigate("/");
          }
        })
    }

  };

  const handleDelete = () => {
    axios.delete(`http://127.0.0.1:4000/contacts/${id}`)
      .then((res) => {
        if (res.status == 200) {
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
  }, [])


  return (
    <>
      {
        (loading === true) ? (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : (
          <Form
            style={{ marginTop: "1.2rem" }}
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
          >
            <Form.Control required id="fn" type="text" placeholder="First Name (required)" defaultValue={contact.fn}
            />
            <br />
            <Form.Control id="ln" type="text" placeholder="Last Name" defaultValue={contact.ln} />
            <br />
            <Form.Control id="email" type="email" placeholder="Email" defaultValue={contact.email} />
            <br />
            <Form.Control id="number" required type="number" placeholder="Phone Number (required)" defaultValue={contact.number} />
            <br />
            <Form.Control id="avatar" type="file" />
            <Image />avatar

            <Row style={{ marginTop: "6rem" }}>
              <Col xs="6">
                <Button
                  variant="secondary"
                  style={{ width: "90%" }}
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
              <Col xs="6">
                <Button
                  variant="primary"
                  style={{ width: "90%" }}
                  type="submit"
                >
                  Apply
                </Button>
              </Col>
            </Row>
          </Form>
        )
      }
    </>
  );
}