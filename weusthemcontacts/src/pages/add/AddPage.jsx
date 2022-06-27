import { Form, Button, Row, Col, Spinner, Modal } from "react-bootstrap"
import Image from 'react-bootstrap/Image'
import React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

export function AddPage() {
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
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
      axios.post(`http://127.0.0.1:4000/contacts/`, {
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
            <Form.Control required id="fn" type="text" placeholder="First Name (required)" 
            />
            <br />
            <Form.Control id="ln" type="text" placeholder="Last Name" />
            <br />
            <Form.Control id="email" type="email" placeholder="Email" />
            <br />
            <Form.Control id="number" required type="number" placeholder="Phone Number (required)" />
            <br />
            <Form.Control id="avatar" type="file" />
            <Image />avatar

            <Row style={{ marginTop: "6rem" }}>
              
              <Col xs="12">
                <Button
                  variant="primary"
                  style={{ width: "90%" }}
                  type="submit"
                >
                  Add
                </Button>
              </Col>
            </Row>
          </Form>
        )
      }
    </>
  );
}