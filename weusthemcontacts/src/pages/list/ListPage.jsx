import { Row, Col, Button, InputGroup, FormControl, ListGroup, Spinner } from "react-bootstrap";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function ListPage() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://127.0.0.1:4000/contacts')
      .then((res) => {
        const data = res.data;
        console.log(data)
        setContacts(data);
        setLoading(false);
      })
  }, []);



  return (
    <>
      <Row id="header">
        <Col xs={2}>
          <Button variant="success" onClick={() => navigate("add")}>Add</Button>
        </Col>
        <Col xs={10} style={{ paddingLeft: "0px" }}>
          <InputGroup>
            <FormControl
              placeholder="LastName / FirstName / Email / PhoneNO."
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              style={{ fontSize: "14px" }}
            />
            <Button className="btn btn-primary" style={{ padding: "6px 18px 8px 18px" }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16" >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
              </svg>
            </Button>
          </InputGroup>
        </Col>
      </Row>
      <Row id="body">
        {
          (loading === true) ? (
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          ) : (
            <ListGroup variant="flush" style={{ padding: "1.2rem" }}>
              {
                contacts.map((item) => {
                  console.log(item);
                  return (
                    <ListGroup.Item 
                    key={item.id} 
                    onClick={() => navigate("contact/" + item.id)}>
                      {item.fn}
                    </ListGroup.Item>
                  )
                })
              }
            </ListGroup>
          )
        }
      </Row>
    </>
  )
}