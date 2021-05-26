import './App.css';
import Header from './component/common/Header';
import Home from './component/Home/Main';
import Footer from './component/common/Footer';
import Login from './component/User/Login';
import QueriesList from './component/Queries/List';
import MyQuery from './component/Queries/MyQuery';
import QueryDetail from './component/Queries/QueryDetail';
import Profile from './component/User/Profile';
import { AddQuery, EditQuery } from './component/Queries/Query';
import { token, tokenExpireIn } from './component/User/UserDetails';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Form } from 'react-bootstrap';


require('dotenv').config();
process.env.CI = false;
(tokenExpireIn !== undefined && tokenExpireIn !== '' && tokenExpireIn !== false && tokenExpireIn <= new Date().getTime()/1000) && localStorage.clear();

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
					<Route exact path="/login">
            {(token !== undefined && token !== '' && token !== false) ?  <Redirect to="/" /> : <Login />}
          </Route>
          <Route exact path="/">
            <Header />
              <Home />
            <Footer />
          </Route>
          
          <Route exact path="/queries">
            <Header />
              {(token !== undefined && token !== '' && token !== false) ? <QueriesList filter={1} /> : <Redirect to="/" />}
            <Footer />
          </Route>

          <Route exact path="/queries/recent">
            <Header />
              {(token !== undefined && token !== '' && token !== false) ? <QueriesList filter={2} /> : <Redirect to="/" />}
            <Footer />
          </Route>

          <Route exact path="/queries/top10">
            <Header />
              {(token !== undefined && token !== '' && token !== false) ? <QueriesList filter={3} /> : <Redirect to="/" />}
            <Footer />
          </Route>

          <Route exact path="/queries/popular">
            <Header />
              {(token !== undefined && token !== '' && token !== false) ? <QueriesList filter={4}  /> : <Redirect to="/" />}
            <Footer />
          </Route>

          <Route exact path="/queries/general">
            <Header />
              {(token !== undefined && token !== '' && token !== false) ? <QueriesList filter={1} /> : <Redirect to="/" />}
            <Footer />
          </Route>

          <Route exact path="/my-query">
            <Header />
              {(token !== undefined && token !== '' && token !== false) ? <MyQuery /> : <Redirect to="/" />}
            <Footer />
          </Route>

          <Route exact path="/add-query">
            <Header />
              {(token !== undefined && token !== '' && token !== false) ? <AddQuery /> : <Redirect to="/" />}
            <Footer />
          </Route>

          <Route path="/query-detail/:id">
            <Header />
              {(token !== undefined && token !== '' && token !== false) ? <QueryDetail /> : <Redirect to="/" />}
            <Footer />
          </Route>
          
          <Route exact path="/edit-query/:id">
            <Header />
              {(token !== undefined && token !== '' && token !== false) ? <EditQuery /> : <Redirect to="/" />}
            <Footer />
          </Route>
          
          <Route exact path="/profile">
            <Header />
              {(token !== undefined && token !== '' && token !== false) ? <Profile /> : <Redirect to="/" />}
            <Footer />
          </Route>

        </Switch>  
      </BrowserRouter>
    </div>
  );
}

export default App;
