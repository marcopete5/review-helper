import React from 'react';
import './App.css'

import {Switch, Route} from 'react-router-dom';

import QueueContainer from './QueueContainer'
import Modules from './Modules'
import Home from './Home'

import Nav from './Nav'
import { withLessons } from './LessonProvider';

function App(props) {
  return (
    <div>
      <Nav isAdmin={props.name === 'admin1423'} comps={[{path: '/', name:'Home'},{path: '/review', name:'Review'},{path:'/queue', name:'Help Queue'}]} class="main-nav" />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/review' component={()=> <Nav comps={[
                {path: '/review/module1', name:'Module 1'},
                {path: '/review/module2', name:'Module 2'},
                {path: '/review/module3', name:'Module 3'},
                {path: '/review/module4', name:'Module 4'},
                {path: '/review/module5', name:'Module 5'},
                {path: '/review/module6', name:'Module 6'}]} 
                class="review-nav" />
        } />
        <Route path='/queue' component={QueueContainer} />
        <Route path='/review/:moduleNum' component={Modules} />
      </Switch>

    </div>
  );
}

export default withLessons(App);
