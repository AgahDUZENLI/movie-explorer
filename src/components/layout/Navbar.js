import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Input,
  Button,
  Container,
  Form,
} from "reactstrap";

const AppNavbar = () => {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (input.trim()) {
      navigate(`/explore?query=${encodeURIComponent(input.trim())}&page=1`);
      setInput("");
    }
  };

  return (
    <Navbar color="light" light expand="md" className="mb-4 shadow-sm">
      <Container className="d-flex justify-content-between align-items-center">
        <NavbarBrand tag={Link} to="/" className="fw-bold">
          🎬 Movie Explorer
        </NavbarBrand>

        <Nav className="d-flex flex-row gap-3" navbar>
          <NavItem>
            <NavLink tag={Link} to="/" className="text-dark">
              Home
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to="/favorites" className="text-dark">
              Favorites
            </NavLink>
          </NavItem>
        </Nav>

        <Form
          onSubmit={handleSearch}
          className="d-flex align-items-center gap-2"
        >
          <Input
            type="text"
            placeholder="Search..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            bsSize="sm"
            style={{ minWidth: "200px" }}
          />
          <Button type="submit" color="dark" size="sm">
            Search
          </Button>
        </Form>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;