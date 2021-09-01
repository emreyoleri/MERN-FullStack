import React, { useState, useEffect } from "react";
import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { TiEdit } from "react-icons/ti";
import { AiOutlineLogin } from "react-icons/ai";
import { RiLogoutCircleLine } from "react-icons/ri";
import { useLocation, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { userActions } from "../redux/actions/index";
import decode from "jwt-decode";

const Header = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();

  const { logOut, getAccessToken } = bindActionCreators(userActions, dispatch);
  const [user, setUser] = useState(null);

  const exit = async (id) => {
    await logOut(id);
    setUser(null);
    history.push("/");
  };

  const renewAccessToken = async (id) => {
    await getAccessToken(id);
    setUser(JSON.parse(localStorage.getItem("user")));
  };

  useEffect(() => {
    if (localStorage.getItem("user") && !user) {
      setUser(JSON.parse(localStorage.getItem("user")));
    }

    const interval = setInterval(() => {
      const accessToken = user?.accessToken;

      if (accessToken) {
        const decodedAccessToken = decode(accessToken);

        if (decodedAccessToken.exp * 1000 < new Date().getTime()) {
          console.log(decodedAccessToken.exp);
          renewAccessToken(user.user._id);
        }
      }
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  }, [location, user]);

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand href="#home">Memory Box</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse className="justify-content-end">
            <Nav>
              {user ? (
                <>
                  <LinkContainer to="/create">
                    <Nav.Link>
                      <Button variant="outline-success">
                        <TiEdit size={20} className="mr-2" />
                        Share a Memory
                      </Button>
                    </Nav.Link>
                  </LinkContainer>

                  <Nav.Link>
                    <Button
                      variant="outline-light"
                      onClick={() => exit(user.user._id)}
                    >
                      <RiLogoutCircleLine size={20} className="mr-2" />
                      Logout
                    </Button>
                  </Nav.Link>
                </>
              ) : (
                <LinkContainer to="/auth">
                  <Nav.Link>
                    <Button variant="outline-warning">
                      <AiOutlineLogin size={20} className="mr-2" />
                      Login
                    </Button>
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
