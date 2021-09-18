import React, { Component, useEffect } from "react";


function ReactFunctionComponent({name}) {
    return (
        <div>
            <h1>react functional component, pass propos: {name}</h1>;
        </div>
    )
}


class ClassComponent extends Component {

    constructor(props){
        super(props);
        this.state = {
            count: 0
          };
    }

    componentDidMount() {
        console.log("Hello");
    }

    render() {
        const { name } = this.props;
        return (
                <div>
                    <h1>class component, state: {name}</h1>
                    <p>count: {this.state.count} times</p>
                    <button onClick={() => this.setState({ count: this.state.count + 1 })}>
                        Click
                    </button>
                </div>
                // <h1>class component, state: {name}</h1>
            );
    }
}

const FunctionalComponent = () => {
    const [count, setCount] = React.useState(0);
    React.useEffect(() => {
        
        console.log("Hello");

        return () => {
            console.log("Bye");
          };
    }, []);

    return (

      <div>
        <p>count: {count}</p>
        <button onClick={() => setCount(count + 1)}>Click</button>
      </div>
    );
};

export {
    ClassComponent,
    ReactFunctionComponent,
    FunctionalComponent
}