import { GridColDef } from "@mui/x-data-grid";

export const columns: GridColDef[] = [
  { field: "category", headerName: "Category", width: 180, editable: true },
  { field: "name", headerName: "Name", width: 180, editable: true },
  { field: "option", headerName: "Option", width: 180, editable: true },
  {
    field: "price",
    headerName: "Price",
    width: 180,
    type: "number",
    editable: true,
    align: "left",
    headerAlign: "left",
  },
  {
    field: "cost",
    headerName: "Cost",
    width: 180,
    type: "number",
    editable: true,
    align: "left",
    headerAlign: "left",
  },
  {
    field: "stock",
    headerName: "Stock",
    width: 180,
    type: "number",
    editable: true,
    align: "left",
    headerAlign: "left",
  },
];
