import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import LessonProvider from './LessonProvider';


ReactDOM.render(
    <BrowserRouter>
        <LessonProvider>
            <App />
        </LessonProvider>
    </BrowserRouter>
    , document.getElementById('root'));
