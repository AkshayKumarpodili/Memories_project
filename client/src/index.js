import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import './index.css'; 
import { store } from './store';
//import { GoogleOAuthProvider } from '@react-oauth/google';



ReactDOM.render(
   //<GoogleOAuthProvider clientId='725049227838-1h2otnc632cf92boj8qt3l5ahhqs2899.apps.googleusercontent.com'>
   <Provider store={store}>
     <App/>
   </Provider>,
   // </GoogleOAuthProvider>,
    document.getElementById('root')
);



