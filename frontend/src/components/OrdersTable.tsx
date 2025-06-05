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
import { number } from "zod";

interface TableDataPropsType {
  tableData: OrderToTableType[];
}

interface TableDetailsType {
  image: string;
  brand: string;
  puzzleName: string;
  amount: number;
  totalPrice: number;
}

function createData(
  orderId: string,
  date: string,
  total: string,
  details: TableDetailsType[]
) {
  return {
    orderId,
    date,
    total,
    details,
  };
}

function Row(props: { row: ReturnType<typeof createData> }) {
  const { row } = props;

  console.log("ROW", row);

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
                Details
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Image</TableCell>
                    <TableCell align="center">Brand</TableCell>
                    <TableCell align="center">Puzzle name</TableCell>

                    <TableCell align="center">Amount</TableCell>
                    <TableCell align="center">Total Price</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.details.map((detailsRow) => (
                    <TableRow key={detailsRow.image}>
                      <TableCell component="th" scope="row" align="center">
                        <img
                          src={detailsRow.image}
                          style={{ width: "50px", height: "50px" }}
                        />
                      </TableCell>
                      <TableCell align="center"> {detailsRow.brand}</TableCell>
                      <TableCell align="center">
                        {detailsRow.puzzleName}
                      </TableCell>

                      <TableCell align="center">{detailsRow.amount}</TableCell>
                      <TableCell align="center">
                        {formatPrice(detailsRow.totalPrice)} HUF
                      </TableCell>

                      <TableCell align="center">
                        {/* {Math.round(detailsRow.amount * row.price * 100) / 100} */}
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

  const rows = tableData.map(({ orderId, date, total, puzzles }) => {
    const subOrderDetail = puzzles.map((currentPuzzle) => ({
      image: currentPuzzle.puzzle.image_link,
      brand: currentPuzzle.puzzle.brand,
      puzzleName: currentPuzzle.puzzle.title,
      amount: currentPuzzle.quantity,
      totalPrice: Number(currentPuzzle.puzzle.price) * currentPuzzle.quantity,
    }));

    const formattedDate = date.slice(0, 10);
    const formattedTotal = formatPrice(total);
    return createData(orderId, formattedDate, formattedTotal, subOrderDetail);
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
