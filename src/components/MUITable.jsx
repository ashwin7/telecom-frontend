import React from 'react';
import { useTable } from 'react-table';
import { Button, IconButton, TableCell, TableContainer, TableHead, TableRow, TableBody } from '@mui/material';
// Import Table explicitly
import Table from '@mui/material/Table';

const MUITable = ({ data, columns, actionColumnConfig }) => {
  const { getTableProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  });

  const renderActionCell = (row) => {
    const id = row.id;
    return (
      <TableCell>
        {actionColumnConfig.map((action) => (
          <IconButton key={action.label} onClick={() => action.handler(id)}>
            {action.icon}
          </IconButton>
        ))}
      </TableCell>
    );
  };

  return (
    <TableContainer sx={{ width: '100%' }}>
      <Table {...getTableProps()}>
        <TableHead>
          {headerGroups.map((headerGroup) => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <TableCell key={column.id} {...column.getHeaderProps()}>
                  {column.render('Header')}
                </TableCell>
              ))}
              {actionColumnConfig && (
                <TableCell key="action">Actions</TableCell>
              )}
            </TableRow>
          ))}
        </TableHead>
        <TableBody>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <TableRow {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <TableCell key={cell.id}>{cell.render('Cell')}</TableCell>
                ))}
                {actionColumnConfig && renderActionCell(row)}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MUITable;