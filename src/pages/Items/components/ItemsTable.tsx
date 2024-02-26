import { DataGrid } from "@mui/x-data-grid";
import { database } from "../../../config/firebase";
import { ref, onValue, set, push, child, remove } from "firebase/database";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { Stack } from "@mui/material";
import ConfirmationDialog from "./ConfirmationDialog";
import { columns } from "./ItemsTableColumnConfig";

export interface Item {
  id: string;
  category: string;
  name: string;
  option: string;
  price: number;
  cost: number;
  stock: number;
}

export default function ItemsTable() {
  const USERNAME = "matthew";
  const itemsRef = ref(database, `items/${USERNAME}`);
  const [items, setItems] = useState<Item[]>([]);
  const [activeRow, setActiveRow] = useState<string>("");
  const [confirmDeletion, setConfirmDeletion] = useState<boolean>(false);

  const getItems = () => {
    console.log("Getting Items");
    return onValue(itemsRef, (snapshot) => {
      const data = snapshot.val();
      const dataItems = Object.values(data) as Item[];
      console.log(dataItems);
      setItems(dataItems);
    });
  };

  useEffect(() => {
    const unsubGetItems = getItems();
    return () => {
      unsubGetItems();
    };
  }, []);

  const updateServerItems = (updatedRow: Item) => {
    console.log(updatedRow);
    const itemRef = child(itemsRef, `/${updatedRow.id}`);
    set(itemRef, updatedRow);
    return updatedRow;
  };

  const processRowUpdateError = (error: any) => {
    console.error(error);
  };

  const createNewRow = () => {
    console.log("creating new row");
    const ref = push(itemsRef, {
      id: 999,
      category: "Default Category",
      name: "Default Name",
      option: "",
      price: 100,
      cost: 100,
      stock: 100,
    });

    const key = ref.key;
    set(child(ref, "id"), key);
  };

  const deleteSelectedRow = async () => {
    setConfirmDeletion(true);
  };

  const handleConfirmDeletion = async () => {
    setConfirmDeletion(false);
    const itemRef = child(itemsRef, `/${activeRow}`);
    try {
      await remove(itemRef);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClose = () => {
    setConfirmDeletion(false);
  };

  return (
    <div>
      <Stack direction={"row"} sx={{ paddingBottom: "1rem" }}>
        <Button
          variant="contained"
          onClick={() => createNewRow()}
          sx={{ marginRight: "1rem" }}
        >
          Add new row
        </Button>
        <Button
          variant="contained"
          color="warning"
          onClick={() => deleteSelectedRow()}
          disabled={!activeRow}
        >
          Delete selected row
        </Button>
      </Stack>

      <div style={{ height: "500px", width: "100%" }}>
        <DataGrid
          rows={items}
          columns={columns}
          processRowUpdate={(updatedRow, _) => updateServerItems(updatedRow)}
          onProcessRowUpdateError={processRowUpdateError}
          onRowSelectionModelChange={(rows, _) => {
            console.log(rows);
            if (rows.length) setActiveRow(String(rows[0]));
            else {
              setActiveRow("");
            }
          }}
        />
      </div>
      <ConfirmationDialog
        onConfirm={handleConfirmDeletion}
        keepMounted
        open={confirmDeletion}
        onClose={handleClose}
      />
    </div>
  );
}
