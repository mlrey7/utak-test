import { Box, Divider, Paper, Stack, Typography } from "@mui/material";
import { equalTo, onValue, orderByChild, query, ref } from "firebase/database";
import { database } from "../../../config/firebase";
import { useEffect, useState } from "react";
import { Item } from "./ItemsTable";
import ItemSubCard from "./ItemSubCard";

interface ItemCardPropType {
  categoryName: string;
}

const ItemCard = ({ categoryName }: ItemCardPropType) => {
  const USERNAME = "matthew";
  const rootRef = ref(database, `items/${USERNAME}`);
  const itemsRef = query(
    rootRef,
    orderByChild("category"),
    equalTo(categoryName)
  );

  const [items, setItems] = useState<string[]>([]);

  useEffect(() => {
    const unsub = onValue(itemsRef, (snapshot) => {
      const data = snapshot.val();
      const dataItems = Object.values(data) as Item[];
      const uniqueItemNames = new Set(
        dataItems.map((dataItem) => dataItem.name)
      );

      console.log(dataItems);
      setItems([...uniqueItemNames]);
    });

    return () => {
      unsub();
    };
  }, []);

  return (
    <Paper sx={{ borderRadius: "8px", minWidth: "400px" }}>
      <Box
        padding={"1rem"}
        bgcolor={"#EFA570"}
        sx={{ borderRadius: "8px 8px 0 0" }}
      >
        <Typography color={"white"} variant="h6">
          {categoryName}
        </Typography>
      </Box>
      <Stack
        paddingX={"1rem"}
        paddingBottom={"1rem"}
        divider={<Divider orientation="horizontal" flexItem />}
      >
        {...items.map((item) => <ItemSubCard itemName={item} />)}
      </Stack>
    </Paper>
  );
};

export default ItemCard;
