import React from 'react';
import "./RecentTransactions.css";
import { MdDeleteForever } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";



const RecentTransactions = ({expensesAdded, setExpensesAdded, balance, setBalance, expense, setExpense, editExpToList}) => {
// when we are getting these props from header it is already synchronized with local storage so no need to
// use the useeffect hook to set the state in  RecentTransactions component 



const deleteExpense = (category, title, price, date) => {
  const updatedExpCart = expensesAdded.filter(exp => !(exp.category === category && exp.title === title && exp.price === price && exp.date === date ))
  setExpensesAdded(updatedExpCart);
  localStorage.setItem('ExpenseCart', JSON.stringify(updatedExpCart));
  
  const updatedBal = balance + Number(price);
  setBalance(updatedBal)
  localStorage.setItem('Balance', updatedBal);
  
  const updatedExp = expense - Number(price);
  setExpense(updatedExp)
  localStorage.setItem('Expense', updatedExp)
}


  return (
    <div>
        <h1 className="heading">Recent Transactions</h1>
        <div className='recentTransactionBox'>

        {expensesAdded.length > 0 ? expensesAdded.map((item, idx)=>(
          <>
          <div key={idx} className='expenseContainer'>
          <h4 className='category'>{item.category}</h4>

          <div className='titleAndDate'>
          <h4 style={{fontFamily:'open sans', fontWeight:'bolder'}}>{item.title}</h4>
          <h4 style={{fontFamily:'open sans', fontWeight:'lighter'}}>{item.date}</h4>
          </div>

          <div className='priceAndButton'>
          <h4 style={{color:'rgba(244, 187, 74, 1)', fontSize:'lighter',fontFamily:'open sans' }}>₹{item.price}</h4>
          <MdDeleteForever className='deletebtn' onClick={()=>deleteExpense(item.category, item.title, item.price, item.date)}/>
          <FaRegEdit className='editbtn' onClick={()=>editExpToList(idx)}/>
          </div>
        </div> 
        <hr style={{marginTop:'15px'}}/>
        </>
        )): <h1 style={{fontFamily:'open sans', fontStyle:'italic'}}> There are no transactions done so far or history is cleared, add expenses to get a <span style={{color:'red'}}>track</span> of your Spendings 😎😎</h1>}
        
        </div>
    </div>
  )
}

export default RecentTransactions;