import React from 'react';
import './TopExpenses.css';
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const TopExpenses = ({ expensesAdded }) => {
  console.log('data recd for bar diagram', expensesAdded);
  const data = expensesAdded.map((exp) => ({
    name: exp.category,
    value: Number(exp.price)
  }));

  return (
    <div>
      <h1 className='heading'>Top Expenses</h1>
      <div className='topExpenses'>
        <ResponsiveContainer width='100%' height='100%'>
          <BarChart data={data} layout='vertical'>
            <XAxis type="number" />
            <YAxis dataKey="name" type="category" />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default TopExpenses;
