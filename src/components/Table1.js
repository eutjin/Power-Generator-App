import { Table, ScrollArea } from '@mantine/core';

function Table1({data}) {

   

  const rows = data.map((element) => (
    <tr key={element.label}>
      <td>{element.label}</td>
      <td>{element.value}</td>
    
    </tr>
  ));

  return (
    
    
    <Table highlightOnHover>
        <ScrollArea sx={{ height: 300 }} >
      <thead>
        <tr>
          <th>Company Name</th>
          <th>Number of plants</th>
          
        </tr>
      </thead>
      
      <tbody>{rows}</tbody>
      </ScrollArea>
    </Table>
    
  );
}

export default Table1;