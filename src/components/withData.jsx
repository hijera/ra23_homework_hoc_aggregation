import React from 'react';


function withData(Component,url,propName) {
    return class extends React.Component {
        componentDidMount() {
            fetch(url)
                .then(result => result.json())
                .then(data => this.setState({
                    [propName]: data
                }));
        }
        render() {
            return <Component {...this.props} {...this.state} />;
        }
    }
}

export default withData;