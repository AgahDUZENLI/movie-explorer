import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Input, Button } from "reactstrap";
import "../styles/App.css";

const Home = () => {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      navigate(`/explore?query=${encodeURIComponent(input.trim())}&page=1`);
    }
  };

  return (
    <div className="home-wrapper">
      <Container fluid>
        <Row className="justify-content-center text-center">
          <Col md="8" lg="6">
            <h1>🎬 Welcome to Movie Explorer</h1>
            <p>
              Discover your favorite movies. Search, explore, and save
              favorites!
            </p>
            <Form
              onSubmit={handleSubmit}
              className="d-flex justify-content-center gap-2"
            >
              <Input
                type="text"
                placeholder="Search movies..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <Button color="dark" type="submit">
                Search 🎯
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
