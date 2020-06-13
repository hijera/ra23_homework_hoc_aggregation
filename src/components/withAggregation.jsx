import React from 'react';

const withAggregation = (key) => Component =>
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
            console.log(list);
            const newList={list: (list.length>0) ? list.reduce((oarr,item)=>{

                    const search_index=oarr.findIndex(element=>element[key]===item[key]);
                    if (search_index===-1)
                    {
                        return [...oarr,item];
                    }
                    else
                    {
                        oarr[search_index].amount+=item.amount;
                        return oarr;
                    }
                },[]) : []  };
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
            return <Component   {...this.props}  {...this.state} list={chainedList} />;
            /* {...aggregated_array} */
        };
};

export default withAggregation;