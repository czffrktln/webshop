import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useState } from "react";
import { OrderToTableType } from "../types";
import formatPrice from "../utils/formatPrice";

interface TableDataPropsType {
  tableData: OrderToTableType[];
}

function createData(orderId: string, date: string, total: string) {
  return {
    orderId,
    date,
    total,
    history: [
      {
        date: "2020-01-05",
        customerId: "11091700",
        amount: 3,
      },
      {
        date: "2020-01-02",
        customerId: "Anonymous",
        amount: 1,
      },
    ],
  };
}

function Row(props: { row: ReturnType<typeof createData> }) {
  const { row } = props;
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        {/* <TableCell component="th" scope="row">
          {row.name}
        </TableCell> */}
        <TableCell component="th" align="center">
          {row.orderId}
        </TableCell>
        <TableCell align="center">{row.date}</TableCell>
        <TableCell align="center">{row.total} HUF</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Total price ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.customerId}</TableCell>
                      <TableCell align="right">{historyRow.amount}</TableCell>
                      <TableCell align="right">
                        {/* {Math.round(historyRow.amount * row.price * 100) / 100} */}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}
// const rows = [
//   createData(159, 6.0, 24),
//   createData( 237, 9.0, 37),
//   createData(262, 16.0, 24),
//   createData( 305, 3.7, 67),
//   createData( 356, 16.0, 49),
// ];

export default function OrdersTable({ tableData }: TableDataPropsType) {
  console.log("tableData in table", tableData);

  const rows = tableData.map(({ orderId, date, total }) => {
    const formattedDate = date.slice(0, 10);

    const formattedTotal = formatPrice(total);

    return createData(orderId, formattedDate, formattedTotal);
  });

  return (
    <>
      {tableData.length ? (
        <>
          <TableContainer
            component={Paper}
            elevation={0}
            sx={{ width: "80%", margin: "auto", marginTop: "5%" }}
          >
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow>
                  <TableCell />
                  {/* <TableCell>Orders</TableCell> */}
                  <TableCell align="center">Order ID</TableCell>
                  <TableCell align="center">Date</TableCell>
                  <TableCell align="center">Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <Row key={row.orderId} row={row} />
                ))}
                {/* {rows.map((row) => (
              <Row key={row.orderid} row={row} />
            ))} */}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      ) : (
        <h1>akarmi</h1>
      )}
    </>
  );
}
// function useState(arg0: boolean): [any, any] {
//   throw new Error('Function not implemented.');
// }
