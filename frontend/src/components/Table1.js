import React, { useState, useContext, useReducer, useEffect } from "react";

import { Group, Table, ScrollArea, createStyles, useMantineTheme,} from '@mantine/core';
import { SortDescending2 } from 'tabler-icons-react';

function Table1({data}) {
  const [sort, setSort]=useState("capacity")
  const theme = useMantineTheme();
  

const useStyles= createStyles((theme)=>({
  sort:{
    
    '&:hover': {
    backgroundColor: theme.colors.gray[3],
    
  },
  width: '20%',
 
},
header:{
  position: 'sticky',
  backgroundColor: theme.white,
  top: 0,
  boxShadow: theme.shadows.sm,
},
 

}))
const { classes} = useStyles();



  const mostCompany = (Object.values(data).sort((a, b) => {
    if(sort=="value"){

      return b.value - a.value;
    }
    else if (sort=="capacity"){
      return b.capacity - a.capacity;
    }
  })).slice(0, 25);
  console.dir(mostCompany); //number of plants owned by each company



  const mostCompanyTop = mostCompany.slice(0, 25);
  console.dir(mostCompanyTop);
   

  const rows = mostCompany.map((element, index) => (
    <tr key={element.label}>
      <td>{index+1}</td>
      <td>{element.label}</td>
      <td>{element.value}</td>
      <td>{Math.round(element.capacity)}</td>
    
    </tr>
  ));

  return (
    
    
    <Table highlightOnHover p="lg">
        <ScrollArea sx={{ height: 450 }} >
      <thead className={classes.header}>
        <tr>
          <th>Number</th>
          <th>Company Name</th>
          <th onClick={()=>setSort("value")} className={classes.sort}><Group position="apart">Number of plants<SortDescending2 /></Group></th>
          <th onClick={()=>setSort("capacity")} className={classes.sort}><Group position="apart">Capacity (kW)<SortDescending2 /></Group></th>
          
        </tr>
      </thead>
      
      <tbody>{rows}</tbody>
      </ScrollArea>
    </Table>
    
  );
}

export default Table1;