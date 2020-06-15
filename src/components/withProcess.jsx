import React from 'react';


const withProcess = (filterFunc=null,aggregateKey=null,sortKey=null,sortOrder=1) => Component =>
    class extends React.Component {
        constructor(props) {
            super(props);
            this.state= {
                list: this.props.list
            }
        }
        filterData(list)
        {

            if (!filterFunc)
            {
                filterFunc=(item)=> { return item; };
            }
             return list.map(item=>
                    ({...item,...filterFunc(new Date(item.date))})
                );

        }

        aggregateData(list)
        {

            return (list.length>0) ? list.reduce((oarr,item)=>{

                    const search_index=oarr.findIndex(element=>element[aggregateKey]===item[aggregateKey]);
                    if (search_index===-1)
                    {
                        return [...oarr,item];
                    }
                    else
                    {
                        oarr[search_index].amount+=item.amount;
                        return oarr;
                    }
                },[]) : [];
        }

        sortData(list)
        {
            return list.sort((itemA,itemB)=>{
                const compare=(itemA[sortKey] >= itemB[sortKey]);
                return (sortOrder >= 0) ? compare : !compare;
            });
        }

        processData() {
            let list=this.state.list;
            list=this.filterData(list);
            if (aggregateKey)
                list=this.aggregateData(list);
            if (sortKey)
                list=this.sortData(list);
            this.setState({list:list});
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
            const list = (this.state && this.state.list)? this.state.list : [];
            return <Component  {...this.props} {...this.state}  list={list} />;
        }
};

export default withProcess;