import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import clayful from "clayful/client-js";
import axios from "axios";
import "./css/auth.css"

clayful.config({
  client: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjA4YWZhOGZkYTJhNDc0NDk4YTM2MmVkYmQ5MWMyMzhmM2Q0ZWExZjcwZGRlNWM1NDkxYTYyNmI4Y2I1ZjlmMTMiLCJyb2xlIjoiY2xpZW50IiwiaWF0IjoxNjQ0MzE3Nzg3LCJzdG9yZSI6IkpDRlRITDJTRFBFRS5aUlY4UVBYUlRKQTkiLCJzdWIiOiJCUlFYTDRBV0M4SkQifQ.tpmy0VduRzU5xK84ONqfoIllA4-F-d9LWiMUHmiO6oQ'
});
clayful.install('request', require("clayful/plugins/request-axios")(axios));

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
