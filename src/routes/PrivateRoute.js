import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        localStorage.getItem('user')
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )} />
)

export default PrivateRoute;

// const PrivateRoute = ({component: Component, authed, ...rest}) => {
    
//     return (

//         <Route
//             {...rest}
//             render={(props) => authed === true
//             ? <Component {...props} />
//             : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
//         />
//     );
// };

// export default PrivateRoute;