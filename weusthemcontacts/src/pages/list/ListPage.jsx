import { Row, Col, Button, InputGroup, FormControl, ListGroup, Spinner, Form } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { searchContacts, selectSearchLoading, selectSearchList } from "../../redux/contactsList/slice";
import { useSelector, useDispatch } from "react-redux";

export function ListPage() {
  const { keywords } = useParams();
  const searchLoading = useSelector(selectSearchLoading);
  const searchList = useSelector(selectSearchList);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [sort, setSort] = useState(false);

  useEffect(() => {
    dispatch(searchContacts({ keywords, sort }))
  }, [dispatch, location, sort])

  return (
    <>
      <Row id="header">
        <Col xs={2}>
          <Button variant="success" onClick={() => navigate("create")}>Add</Button>
        </Col>
        <Col xs={9} style={{ paddingLeft: "0px", paddingRight: "0px" }}>
          <Form
            onSubmit={(e) => {
              const form = e.currentTarget;
              e.preventDefault();
              navigate("/" + form.searchKeywords.value)
            }}
          >
            <InputGroup>
              <FormControl
                id="searchKeywords"
                placeholder="LastName / FirstName / Email / PhoneNO."
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                style={{ fontSize: "14px" }
                }
              />
              <Button
                className="btn btn-primary"
                style={{ padding: "6px 18px 8px 18px" }}
                type="submit"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16" >
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                </svg>
              </Button>
            </InputGroup>
          </Form>
        </Col>
        <Col xs={1} style={{ paddingLeft: "0px", paddingRight: "0px" }}>
          <Button
            variant="light"
            className="btn btn-primary"
            style={{ padding: "6px 2px" }}
            onClick={() => {sort ? setSort(false) : setSort(true)}}
          >
            {/* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-sort-alpha-down-alt text-primary" viewBox="0 0 16 16">
              <path d="M12.96 7H9.028v-.691l2.579-3.72v-.054H9.098v-.867h3.785v.691l-2.567 3.72v.054h2.645V7z" />
              <path fillRule="evenodd" d="M10.082 12.629 9.664 14H8.598l1.789-5.332h1.234L13.402 14h-1.12l-.419-1.371h-1.781zm1.57-.785L11 9.688h-.047l-.652 2.156h1.351z" />
              <path d="M4.5 2.5a.5.5 0 0 0-1 0v9.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L4.5 12.293V2.5z" />
            </svg> */}
            { sort ? ( <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-sort-alpha-down text-primary" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M10.082 5.629 9.664 7H8.598l1.789-5.332h1.234L13.402 7h-1.12l-.419-1.371h-1.781zm1.57-.785L11 2.687h-.047l-.652 2.157h1.351z" />
                <path d="M12.96 14H9.028v-.691l2.579-3.72v-.054H9.098v-.867h3.785v.691l-2.567 3.72v.054h2.645V14zM4.5 2.5a.5.5 0 0 0-1 0v9.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L4.5 12.293V2.5z" />
              </svg> ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-sort-alpha-down" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M10.082 5.629 9.664 7H8.598l1.789-5.332h1.234L13.402 7h-1.12l-.419-1.371h-1.781zm1.57-.785L11 2.687h-.047l-.652 2.157h1.351z" />
                <path d="M12.96 14H9.028v-.691l2.579-3.72v-.054H9.098v-.867h3.785v.691l-2.567 3.72v.054h2.645V14zM4.5 2.5a.5.5 0 0 0-1 0v9.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L4.5 12.293V2.5z" />
              </svg>
              )}
            
          </Button>
        </Col>
      </Row>
      <Row id="body">
        {
          searchLoading ? (
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          ) : (
            <ListGroup variant="flush" style={{ padding: "1.2rem" }}>
              {
                searchList.map(
                  (item) => {
                    return (
                      <ListGroup.Item
                        key={item.id}
                        onClick={() => {
                          navigate("../contact/" + item.id, { replace: true })
                        }}>
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