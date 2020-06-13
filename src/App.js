import React from 'react';
import './App.css';
import YearTable from "./components/YearTable";
import MonthTable from "./components/MonthTable";
import SortTable from "./components/SortTable";
import withProcess from "./components/withProcess";
export default class App extends React.Component {
  state = {
    list: []
  };

    componentDidMount()
  {
      fetch(process.env.REACT_APP_REQUEST_URL)
          .then(result => {console.log(result); return result.json()
          })
          .then(data => this.setState(data));
  }

  render() {

    const {list} = this.state;

    const monthFilterFunc=(item)=>({ month: item.toLocaleString('en-US', { month: 'short' }),  key:(item.getMonth()+1) });
    const UpdMonthTable= withProcess(monthFilterFunc,'key','key')(MonthTable);

    const yearFilterFunc=(item)=>({  year: (item.getFullYear()).toString().padStart(2,'0'), key:item.getFullYear() });
    const UpdYearTable = withProcess(yearFilterFunc,'key','key')(YearTable);


    const sortFilterFunc=(item)=>({key:item.getTime()});
      const UpdSortTable= withProcess(sortFilterFunc,null,'key',-1)(SortTable);

    return (
        <div id="app">
          <UpdMonthTable list={list} />
          <UpdYearTable list={list} />
          <UpdSortTable list={list} />
        </div>
    );
  }
}
/*
          <UpdYearTable list={this.state.list} />

 */