import React, {useState} from 'react';
import TransactionTable from './components/TransactionTable';
import Header from "./components/Header";
import {Data} from "./Interfaces";
import CSVContext from "./CSVContext/CSVContext";



const App = () => {
    const [context, setContext]: [Data[], any] = useState([])

  return (
      <div className="app_wrapper">
          <CSVContext.Provider value={{context, setContext}}>
          <Header />
          <TransactionTable />
          </CSVContext.Provider>
      </div>
  )
}

export default App;
