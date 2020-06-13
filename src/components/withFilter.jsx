import React from 'react';


const withFilter = (processFunc) => Component =>
    class extends React.Component {
        constructor(props) {
            super(props);
            this.state={
                chainedList:[]
            };
        }

        processData()
        {
            const  list = (this.state && this.state.chainedList) ? this.state.chainedList : (this.props.list) ? this.props.list : [];

            if (!processFunc)
            {
                processFunc=(item)=> { return item; };
            }
            const newList={list: list.map(item=>
                    ({...item,...processFunc(new Date(item.date))})
                )
            };
            this.setState({chainedList:newList.list});
            return newList;
        }
        componentDidMount() {
            this.processData();
        }

        componentDidUpdate(prevProps, prevState) {
            if (JSON.stringify(prevState)!==JSON.stringify(this.state))
            {
                this.processData();
            }
        }

        render() {

            const chainedList = (this.state && this.state.chainedList) ? this.state.chainedList : [];
            console.log(chainedList);
            /* { [date_param]: processFunc(new Date(item.date)) ,amount : item.amount }*/
            return <Component  {...this.props} {...this.state} list={chainedList}  />;
        }
    };

export default withFilter;
/*
        constructor(props)
        {
            super(props);
            this.state=Component.state;
        }


        componentDidMount() {
            this.processData();
        }

        componentDidUpdate(prevProps,prevState)
        {
            if (JSON.stringify(prevState)!==JSON.stringify(this.state))
            {
                this.processData();
            }
        }
 */