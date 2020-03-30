import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './front/styles/global.scss';
import App from './front/components/app';

const Index: React.FC = () => {
    return (
        <BrowserRouter>
            <App />
        </BrowserRouter>
    );
};

ReactDOM.render(<Index />, document.getElementById('root'));
