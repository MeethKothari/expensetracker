import React, {useState, useEffect} from 'react';
import "./Header.css";
import ReactModal from 'react-modal';
import { enqueueSnackbar} from "notistack";
import RecentTransactions from '../RecentTransactions/RecentTransactions';
import TopExpenses from '../TopExpenses/TopExpenses';
import PieChartDiagram from '../PieChartDiagram/PieChartDiagram';

const Header = () => {
  const [balance, setBalance] = useState(()=>{
    let storedBalance = localStorage.getItem('Balance');
    return storedBalance ? Number(storedBalance) : 5000 });
  const [expense, setExpense] = useState(()=>{
    let storedExpensesAmount = localStorage.getItem('Expense');
    return storedExpensesAmount ? Number(storedExpensesAmount) : 0 });
  const [balanceModalOpen, setBalanceModalOpen] = useState(false);
  const [expenseceModalOpen, setExpenseModalOpen] = useState(false);
  const [incomeAmount, setIncomeAmount] = useState('');
  const [expenseTitle, setExpenseTitle] = useState('');
  const [expensePrice, setExpensePrice] = useState('');
  const [expenseCategory, setExpenseCategory] = useState('');
  const [expenseDate, setExpenseDate] = useState('');
  const [expensesAdded, setExpensesAdded] = useState(()=>{
    let storedExpenses = localStorage.getItem('ExpenseCart');
    return storedExpenses ? JSON.parse(storedExpenses) : [];
  });
  // state variables for edit mode
  const [editingModeOpen, setEditingModeOpen] = useState(false);
  const [editingIndexNo, setEditingIndexNo] = useState(null);

/* checking the balance, expense from the useState itself so that on every re-render it shows the updated balance,expense 
and if not then 5000 for balance and 0 for expense asusual... 

we need to convert the array of obj to string to set data in local storage becaue local storage only accepts data in string format
and while rendering we need to convert str to array of obj back so we do like - return storedExpenses ? JSON.parse(storedExpenses) : [];
as expense are array of objects we need to do so, no need for balance and expense 
*/


// 1. functionalities for balance chart -----------------------------------------------------------------------------

const addBalanceToLocalStorage = () => {
  console.log('add balance button clicked');
  const newBalance = balance + Number(incomeAmount);
  setBalance(newBalance);
  setIncomeAmount('');
  enqueueSnackbar('Amount added to your wallet successfully', {variant:'success'});
}


// useEffect is depending upon the balance, expense, expenseCart.....anytime any of these is updated it rerenders 
// and updates it to local storage in string format 
useEffect(()=>{
  localStorage.setItem('Balance', balance);
  localStorage.setItem('Expense', expense);
  localStorage.setItem('ExpenseCart', JSON.stringify(expensesAdded));
},[balance, expense,expensesAdded]);  



// button styles !!
const balanceStyle = {
  color: "rgba(157, 255, 91, 1)",
}
const expenseStyle = {
  color: "rgba(244, 187, 74, 1)",
}


const openBalModal = () => {
  console.log('balance modal opened');
  setBalanceModalOpen(true);   
}
const closeBalModal = () => {
  console.log('balance modal closed');
  setBalanceModalOpen(false);
}
const openExpModal = () => {
  console.log('expense modal opened');
  setExpenseModalOpen(true);
}
const closeExpModal= () => {
  console.log('expense Modal closed');
  setExpenseModalOpen(false);
  // following line of code in this block is for exp edit part 
  setEditingModeOpen(false);
  setEditingIndexNo(null);
  setExpenseTitle('');
  setExpensePrice('');
  setExpenseCategory('');
  setExpenseDate('');
}

// 2. functionalities for expenses chart  -----------------------------------------------------------------

const addExpToList = () => {  
  // if statement holds = (edit expense logic) & else statement holds = ( add expense logic )
  // Check if we are in editing mode
  if (editingModeOpen === true && editingIndexNo !== null) {
    const oldPrice = expensesAdded[editingIndexNo].price;
    const newPrice = Number(expensePrice);

    // Check if balance + old price is enough to cover the new price whenever price is getting changed in editing
    let availableBal = balance + oldPrice; // because we need to protect negative balance so we are chking bal available with corresponding chaged amount
    if (availableBal >= newPrice) {
      const newExp = {           // once changed any of the value it sets a new object with updated one
        title: expenseTitle,
        price: newPrice,
        category: expenseCategory,
        date: expenseDate
      };
    
      // we need to chk the bal first so once bal chkd then we can set a new obj
      const updatedExpenses = [...expensesAdded];
      updatedExpenses[editingIndexNo] = newExp;
      setExpensesAdded(updatedExpenses);

      // Update expense and balance accordingly to show it on the ui of wallet and expense box
      if (newPrice > oldPrice) {
        setExpense(expense + (newPrice - oldPrice));
        setBalance(balance - (newPrice - oldPrice));
      } else {
        setExpense(expense - (oldPrice - newPrice));
        setBalance(balance + (oldPrice - newPrice));
      }

      // Reset form fields
      setExpenseTitle('');
      setExpensePrice('');
      setExpenseCategory('');
      setExpenseDate('');
      enqueueSnackbar('Expense edited successfully', { variant: 'success' });
    } else {
      enqueueSnackbar(`You don't have enough balance to update this expense. Please add funds to your wallet.`, { variant: 'warning' });
    }
  } 
    // Logic for adding a new expense 
  else {
    const newPrice = Number(expensePrice);
    if (balance >= newPrice) {
      // sets a new object with all the fields entered while onChange event
      const newExp = {
        title: expenseTitle,
        price: newPrice,
        category: expenseCategory,
        date: expenseDate
      };

      setExpensesAdded([...expensesAdded, newExp]);
      setExpense(expense + newPrice);
      setBalance(balance - newPrice);

      // Reset form fields
      setExpenseTitle('');
      setExpensePrice('');
      setExpenseCategory('');
      setExpenseDate('');
      enqueueSnackbar('Expense added successfully', { variant: 'success' });
    } else {
      enqueueSnackbar(`You don't have enough balance to add this expense. Please add funds to your wallet.`, { variant: 'warning' });
    }
  }
};

//console.log('expenses added', expensesAdded);




const editExpToList = (index) => {
  //console.log(index);
  //console.log('editExpToList', editExpToList);
  setEditingModeOpen(true);  // sets edit mode true
  setEditingIndexNo(index);  // sets index of the exp that is going to be edited
  const editingExpense = expensesAdded[index]; // this will take the access of the exp of the specific index
  setExpenseTitle(editingExpense.title);   // appends initially whatever was the value of title
  setExpensePrice(editingExpense.price);   // appends initially whatever was the value of price
  setExpenseCategory(editingExpense.category); // appends initially whatever was the value of category
  setExpenseDate(editingExpense.date);  // appends initially whatever was the value of date
  openExpModal();  // finally after rendering to ui it opens up the exp modal
}


return (
<>
    <div className='container'>
      <div className='balAndExpBox'>
        <div className='bal'>
            <h4>Wallet Balance: <span style={balanceStyle}>₹{balance}</span></h4>
            <button onClick={openBalModal}>+ Add Income</button>
        </div>
        <div className='exp'>
            <h4>Expenses: <span style={expenseStyle}>₹{expense}</span></h4>
            <button onClick={openExpModal}>+ Add Expense</button>
        </div>
        {/* need to add pie chart here from recharts and should be aligned with the header*/}
        
      </div>
      <PieChartDiagram expensesAdded={expensesAdded}/>
    </div>
  
  

   {/* jsx for modals whenever they are opened   */}

  <ReactModal 
  isOpen={balanceModalOpen}
  onRequestClose={closeBalModal}
  className="balanceModalContainer, balanceModalInput, balanceModalAddBtn,balanceModalCancelBtn "
  >
  <div>  
    <div className='balanceModalContainer'>
    <h1 style={{marginBottom:'10px'}}>Add Balance</h1>
    <input type="number" placeholder='Income Amount' className='balanceModalInput' value={incomeAmount} 
      onChange={(e)=>setIncomeAmount(e.target.value)} />
    <button className='balanceModalAddBtn' style={{padding:'12px'}} 
      onClick={addBalanceToLocalStorage} >Add Balance</button>
    <button onClick={closeBalModal} className='balanceModalCancelBtn'>cancel</button>
    </div>
  </div>
  </ReactModal>


  <ReactModal 
  isOpen={expenseceModalOpen}
  onRequestClose={closeExpModal}
  className="expenseModalContainer, expenseModalInput,expenseModalCancelBtn "
  >
  <div>
  <div className='expenseModalContainer'>
  <h1>{editingModeOpen ? 'Edit Expense' : 'Add Expense'}</h1>
  <div style={{display:'flex', flexWrap:'wrap'}}>
    <input className='expenseModalInput' type='text' placeholder='Title' 
    value={expenseTitle} onChange={(e)=>setExpenseTitle(e.target.value)}/>
    <input className='expenseModalInput' type='number' placeholder='Price' 
    value={expensePrice} onChange={(e)=>setExpensePrice(e.target.value)}/>
    <input className='expenseModalInput' type='text' placeholder='Select Category' 
    value={expenseCategory} onChange={(e)=>setExpenseCategory(e.target.value)}/>
    <input className='expenseModalInput' type='text' placeholder='dd/mm/yyyy' 
    value={expenseDate} onChange={(e)=>setExpenseDate(e.target.value)}/>
  </div>
  <button className='expenseModalAddBtn' onClick={addExpToList}>{editingModeOpen ? 'Edit Expense' : 'Add Expense'}</button>  
  <button className='expenseModalCancelBtn' onClick={closeExpModal}>Cancel</button>
  </div>
  </div>
  </ReactModal>




<div style={{display:'flex', flexDirection:'row'}}>
<RecentTransactions expensesAdded={expensesAdded} setExpensesAdded={setExpensesAdded} balance={balance} 
setBalance={setBalance} expense={expense} setExpense={setExpense} editExpToList={editExpToList}/>
<TopExpenses expensesAdded={expensesAdded}/>
</div>


</>
)
}

export default Header;