// import _ from 'lodash';
import React, { Component } from 'react';
//import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Grid, Row, Col } from 'react-bootstrap';
import promise from 'redux-promise';

import reducers from './reducers';
import PostsIndex from './components/posts_index';
import PostsNew from './components/posts_new.js';
import PostsShow from './components/posts_show.js';
import './App.css';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

class App extends Component {
  render() {
    return (
      <Provider store={createStoreWithMiddleware(reducers)}>
      <Grid>
        <Row className="show-grid">
          <Col xs={12} md={12}>
          <BrowserRouter>
            <div>
              <Switch>
                <Route path="/posts/new" component={PostsNew} /> 
                <Route path="/posts/:id" component={PostsShow} />                 
                <Route path="/" component={PostsIndex} />                 
              </Switch>        
            </div>
          </BrowserRouter>
          </Col>
        </Row>
      </Grid>  
      </Provider>
    )         
  }
}

export default App;
