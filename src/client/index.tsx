import * as React from "react"
import * as ReactDOM from "react-dom"
import { BrowserRouter as Router } from 'react-router-dom'

import "../../scss/main.scss"
import { App } from "../shared/App";

ReactDOM.render(
    <Router>
        <App/>
    </Router>,
    document.getElementById('nx-app-root')
);

