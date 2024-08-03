import './App.css';
import Header from "./Components/Header/Header";
// import RecentTransactions from './Components/RecentTransactions/RecentTransactions';
// import TopExpenses from './Components/TopExpenses/TopExpenses';

function App() {
  return (
    <div className="app">
      <h1 className="heading">Expense Tracker</h1>
      <Header/>
      <div style={{display:'flex', flexDirection:"row"}}>
      {/* <RecentTransactions/> */}
      {/* <TopExpenses/> */}
      </div>
    </div>
  );
}

export default App;
