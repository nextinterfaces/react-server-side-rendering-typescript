import * as React from 'react';

import { Link, Route, Switch } from 'react-router-dom';

const Header = () => (
    <div className="App-header">
        <h2>Welcome to Universal React</h2>
    </div>
)

export const PageNotFound = (props, context) => {
    if (context.setStatus) {
        context.setStatus(404)
    }

    return (
        <div>
            <h1>
                Page not found
            </h1>
            <Link to="/">
                Go home
            </Link>
        </div>
    )
}
// (PageNotFound as any).contextTypes = {
//   setStatus: PropTypes.func.isRequired
// }

const TestRouterPage = ({ match }) => (
    <div className="App-intro">
        <p>
            Test page {match.params.id}
        </p>
        <p>
            <Link to={`/`}>
                Home
            </Link>
        </p>
        <p>
            <Link to={`/aljlskaklksdkfaj falsflasd`}>
                Go to non-existent page
            </Link>
        </p>
    </div>
)

const Home = () => (
    <div className="App-intro">
        <p>To get started, edit <code>src/shared/App.js</code> and save to reload.</p>
        <Link to={`/test/123`}>
            Test the router
        </Link>
    </div>
)

// export const App = () => (
//   <div className="App">
//     <Route path="/" component={ ({ match }) => (
//       <div>
//         <Header />
//         <Switch>
//           <Route exact path="/" component={Home}/>
//           <Route exact path="/test/:id" component={TestRouterPage}/>
//           <Route component={PageNotFound}/>
//         </Switch>
//       </div>
//     )}/>
//   </div>
// )


export class App extends React.Component<any> {

    render() {
        return (
            <div className="App">
                <Route path="/" component={({ match }) => (
                    <div>
                        <Header/>
                        <Switch>
                            <Route exact path="/" component={Home}/>
                            <Route exact path="/test/:id" component={TestRouterPage}/>
                            <Route component={PageNotFound}/>
                        </Switch>
                    </div>
                )}/>
            </div>
        )
    }

}
