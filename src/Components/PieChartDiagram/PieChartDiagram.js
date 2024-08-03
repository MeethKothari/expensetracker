import React from 'react';
import '../Header/Header.css'
import { PieChart, Pie, Legend, Tooltip, Cell, ResponsiveContainer } from 'recharts';

const PieChartDiagram = ({expensesAdded}) => {
    console.log(expensesAdded);
    // receiving array of objects of expense list from header comp
    // to convert data in pie chart first we should map the data to objet with key value properties 
    // name will be category and price will be amt of the category
    // each and every component we can get it from recharts library
    const pieData = expensesAdded.map((ex)=>({
      name: ex.category,
      value: Number(ex.price),
    }));

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  

  return (
  <div className='pieContainer'>
  <ResponsiveContainer >
    <PieChart width='100%' >
    <Pie
    data={pieData}
    // cx="50%"
    // cy="50%"
    labelLine={false}
    outerRadius={150}
    dataKey="value"
    fill={({ index }) => COLORS[index % COLORS.length]}
  >
    {
      pieData.map((entry, index) => (
        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
      ))
    }
   </Pie>
   <Tooltip />
   <Legend />
   </PieChart>
   </ResponsiveContainer>
  </div>
  )
}

export default PieChartDiagram;