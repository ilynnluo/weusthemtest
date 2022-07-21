import { Form, Button, Row, Col } from "react-bootstrap"
import Image from 'react-bootstrap/Image'
import React from "react"

export function ContactInfoUI(props) {
  return (
    <>
      <Form
        style={{ marginTop: "1.2rem" }}
        noValidate
        validated={props.validated}
        onSubmit={props.handleSubmit}
      >
        <Form.Control required id="fn" type="text" placeholder="First Name (required)" defaultValue={props.contact.fn}
        />
        <br />
        <Form.Control id="ln" type="text" placeholder="Last Name" defaultValue={props.contact.ln} />
        <br />
        <Form.Control id="email" type="email" placeholder="Email" defaultValue={props.contact.email} />
        <br />
        <Form.Control id="number" required type="number" placeholder="Phone Number (required)" defaultValue={props.contact.number} />
        <br />
        <Form.Control id="avatar" type="file" />
        <Image />avatar
        <Row style={{ marginTop: "6rem" }}>
          <Col xs="12">
            <Button
              variant="primary"
              style={{ width: "100%" }}
              type="submit"
            >
              Apply
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
}