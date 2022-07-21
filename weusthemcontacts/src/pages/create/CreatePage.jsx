import React, { useState } from "react";
import { ContactInfoUI } from "../../components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Spinner } from "react-bootstrap";

export function CreatePage() {
  const contact = {
    "ln": "",
    "fn": "",
    "email": "",
    "number": "",
    "avatar": ""
  };
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
    } else {
      setValidated(true);
      event.preventDefault();
      event.stopPropagation();
      setLoading(true);
      try {
        axios.post(`http://127.0.0.1:4000/contacts/`, {
          fn: fn,
          ln: ln,
          email: email,
          number: number,
          avatar: avatar
        }).then((res) => {
          if (res.status === 200) {
            setLoading(false);
            navigate("/");
          }
        })
      } catch (e) {
        setLoading(false);
        alert(e.message)
      }
    }
  };

  return (
    <>
      {
        loading ? (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : (
          <Container>
            <ContactInfoUI validated={validated} handleSubmit={handleSubmit} contact={contact}/>
          </Container>
        )
      }

    </>
  )
};
