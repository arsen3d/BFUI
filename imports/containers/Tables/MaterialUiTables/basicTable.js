import React from 'react';
import Scrollbars from '../../../components/utility/customScrollBar';
import { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import { Root, Table } from './materialUiTables.style';

let id = 0;
function createData(name, item, units, unitcosts, total) {
  id += 1;
  return { id, name, item, units, unitcosts, total };
}

const data = [
  createData('Jones', 'Pencil', 95, 1.99, 189.05),
  createData('Kivell', 'Binder', 50, 19.99, 999.5),
  createData('Jardine', 'Pencil', 36, 4.99, 179.64),
  createData('Gill', 'Pen', 27, 19.99, 539.73),
  createData('Sorvino', 'Pencil', 56, 2.99, 167.44),
];

export default props => {
  const { classes } = props;
  return (
    <Root>
      <Scrollbars style={{ width: '100%' }}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Rep</TableCell>
              <TableCell>Item</TableCell>
              <TableCell numeric>Units</TableCell>
              <TableCell numeric>UnitCost</TableCell>
              <TableCell numeric>Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(n => {
              return (
                <TableRow key={n.id}>
                  <TableCell>{n.name}</TableCell>
                  <TableCell>{n.item}</TableCell>
                  <TableCell numeric>{n.units}</TableCell>
                  <TableCell numeric>{n.unitcosts}</TableCell>
                  <TableCell numeric>{n.total}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Scrollbars>
    </Root>
  );
};
