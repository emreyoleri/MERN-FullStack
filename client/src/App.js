import React from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CreateScreen from "./Screens/CreateScreen";
import HomeScreen from "./Screens/HomeScreen";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import UpdateScreen from "./Screens/UpdateScreen";
import AuthScreen from "./Screens/AuthScreen";

const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Switch>
            <Route exact path="/" component={HomeScreen} />
            <Route path="/create" component={CreateScreen} />
            <Route path="/update/:id" component={UpdateScreen} />
            <Route path="/auth" component={AuthScreen} />
          </Switch>
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
