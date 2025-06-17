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
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow sx={styles.row.tableRow}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" align="center">
          {row.orderId}
        </TableCell>
        <TableCell align="center">{row.date}</TableCell>
        <TableCell align="center">{row.total} HUF</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={styles.row.dropdownCells} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={styles.row.detailsContainer}>
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
                          style={styles.row.detailsImage}
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

export default function OrdersTable({ tableData }: TableDataPropsType) {
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
      <TableContainer
        component={Paper}
        elevation={0}
        sx={styles.ordersTable.tableContainer}
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
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

const styles = {
  row: {
    tableRow: { "& > *": { borderBottom: "unset" } },
    dropdownCells: {
      paddingBottom: 0,
      paddingTop: 0,
    },
    detailsContainer: { margin: 1 },
    detailsImage: { width: "50px", height: "50px" },
  },
  ordersTable: {
    tableContainer: { width: "80%", margin: "auto", marginTop: "5%" },
  },
};
