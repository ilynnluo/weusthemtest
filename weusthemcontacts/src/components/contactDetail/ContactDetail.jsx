import { Form, Button, Row, Col, Spinner, Modal } from "react-bootstrap"
import Image from 'react-bootstrap/Image'
import React, { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { getContactDetail, deleteContact, editContact, selectContact, selectLoading } from "../../redux/contactDetail/slice"

export function ContactDetail() {  
  const loading = useSelector(selectLoading);
  const contact = useSelector(selectContact)
  const [validated, setValidated] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSubmit = (event) => {
    if (event.target.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      setValidated(true);
      event.preventDefault();
      event.stopPropagation();
      const ln = event.target.ln.value;
      const fn = event.target.fn.value;
      const email = event.target.email.value;
      const number = event.target.number.value;
      const avatar = event.target.avatar.value;
      console.log("---",ln, fn, email, number, avatar);
      dispatch(editContact({id, ln, fn, email, number, avatar}));
      event.preventDefault();
      event.stopPropagation();
      navigate("/")
      // try {
      //   axios.put(`http://127.0.0.1:4000/contacts/${id}`, {
      //     fn: fn,
      //     ln: ln,
      //     email: email,
      //     number: number,
      //     avatar: avatar
      //   }).then((res) => {
      //     if (res.status === 200) {
      //       navigate("/");
      //       // setLoading(false);
      //     }
      //   })
      // } catch (e) {
      //   alert(e.message);
      // }
    }
  };

  const handleDelete = () => {
    dispatch(deleteContact(id));
    navigate("/");
    // setLoading(true);
    // try {
    //   axios.delete(`http://127.0.0.1:4000/contacts/${id}`
    //   ).then((res) => {
    //     if (res.status === 200) {
    //       navigate("/");
    //       setLoading(false);
    //     }
    //   })
    // } catch (e) {
    //   alert(e.message);
    // }
  }

  useEffect(() => {
    dispatch(getContactDetail(id));
    // try{
    //   axios.get(`http://127.0.0.1:4000/contacts/${id}`
    //   ).then((res) => {
    //     const data = res.data;
    //     console.log(data)
    //     setContact(data);
    //     setLoading(false);
    //   }) 
    // } catch(e) {
    //   alert(e.message);
    // }
  },[id, dispatch])

  return (
    <>
      {
        loading ? (
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
            <Form.Control required id="fn" type="text" placeholder="First Name (required)" defaultValue={contact ? contact.fn : ""}
            />
            <br />
            <Form.Control id="ln" type="text" placeholder="Last Name" defaultValue={contact ? contact.ln : ""} />
            <br />
            <Form.Control id="email" type="email" placeholder="Email" defaultValue={contact ? contact.email : ""} />
            <br />
            <Form.Control id="number" required type="number" placeholder="Phone Number (required)" defaultValue={contact ? contact.number : ""} />
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