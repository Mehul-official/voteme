import './App.css';
import Header from './component/common/Header';
import Home from './component/Home/Main';
import Footer from './component/common/Footer';
import Login from './component/User/Login';
import QueriesList from './component/Queries/List';
import AddQuery from './component/Queries/AddQuery';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';


require('dotenv').config();
process.env.CI = false;

const userDetails = (localStorage.userDetails) ? JSON.parse(localStorage.userDetails) : '';
let token = userDetails !== '' && userDetails.Data.AuthoToken;
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
					<Route exact path="/login">
           {(token === false) ? <Login /> : <Redirect to="/queries" />}
          </Route>
          <Route exact path="/">
            <Header />
            {(token !== undefined && token !== '' && token !== false) ? <Home /> : <Redirect to="/login" />}
            <Footer />
          </Route>
          
          <Route exact path="/queries">
            <Header />
              {(token !== undefined && token !== '' && token !== false) ? <QueriesList/> : <Redirect to="/login" />}
            <Footer />
          </Route>

          <Route exact path="/queries/recent">
            <Header />
              {(token !== undefined && token !== '' && token !== false) ? <QueriesList filter={2}/> : <Redirect to="/login" />}
            <Footer />
          </Route>

          <Route exact path="/queries/top10">
            <Header />
              {(token !== undefined && token !== '' && token !== false) ? <QueriesList filter={3}/> : <Redirect to="/login" />}
            <Footer />
          </Route>

          <Route exact path="/queries/popular">
            <Header />
              {(token !== undefined && token !== '' && token !== false) ? <QueriesList filter={4} /> : <Redirect to="/login" />}
            <Footer />
          </Route>

          <Route exact path="/queries/general">
            <Header />
              {(token !== undefined && token !== '' && token !== false) ? <QueriesList filter={1}/> : <Redirect to="/login" />}
            <Footer />
          </Route>

          <Route exact path="/add-query">
            <Header />
              {(token !== undefined && token !== '' && token !== false) ? <AddQuery /> : <Redirect to="/login" />}
            <Footer />
          </Route>
        </Switch>  
      </BrowserRouter>
    </div>
  );
}

export default App;
