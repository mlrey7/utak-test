import { Stack, Typography, Box, TextField, Button } from "@mui/material";
import {
  ref,
  query,
  orderByChild,
  equalTo,
  onValue,
  push,
  set,
  child,
} from "firebase/database";
import { useState, useEffect } from "react";
import { database } from "../../../config/firebase";
import { Item } from "./ItemsTable";
import OptionRow, { ConsolidatedItem } from "./OptionRow";

interface ItemSubCardProps {
  itemName: string;
}

const ItemSubCard = ({ itemName }: ItemSubCardProps) => {
  const USERNAME = "matthew";
  const rootRef = ref(database, `items/${USERNAME}`);
  const itemsRef = query(rootRef, orderByChild("name"), equalTo(itemName));
  const [isAddingOption, setIsAddingOption] = useState(false);
  const [newOptionName, setNewOptionName] = useState("");
  const [newOptionCost, setNewOptionCost] = useState("");
  const [newOptionPrice, setNewOptionPrice] = useState("");

  const [item, setItem] = useState<ConsolidatedItem>({
    id: "",
    category: "",
    name: "",
    cost: 0,
    price: 0,
    stock: 0,
    options: [],
  });

  useEffect(() => {
    const unsub = onValue(itemsRef, (snapshot) => {
      const data = snapshot.val();
      const dataItems = Object.values(data) as Item[];
      const options = dataItems
        .filter((dataItem) => dataItem.option !== "")
        .map((dataItem) => ({
          optionName: dataItem.option,
          cost: dataItem.cost,
          price: dataItem.price,
          id: dataItem.id,
        }));

      console.log(dataItems);
      setItem({ ...dataItems[0], options: options });
    });

    return () => {
      unsub();
    };
  }, []);

  const confirmAddOption = () => {
    const ref = push(rootRef, {
      id: 999,
      category: item.category,
      name: item.name,
      option: newOptionName,
      price: Number(newOptionPrice),
      cost: Number(newOptionCost),
      stock: item.stock,
    });

    const key = ref.key;
    set(child(ref, "id"), key);
    setIsAddingOption(false);
  };

  const onAddOption = () => {
    setIsAddingOption(true);
  };

  const onChangeNonOptionPrice = (value: string) => {
    const price = Number(value);
    const itemRef = child(rootRef, `/${item.id}`);

    set(itemRef, {
      id: item.id,
      name: item.name,
      category: item.category,
      option: "",
      price: price,
      cost: item.cost,
      stock: item.stock,
    });
  };

  const onChangeNonOptionCost = (value: string) => {
    const cost = Number(value);
    const itemRef = child(rootRef, `/${item.id}`);

    set(itemRef, {
      id: item.id,
      name: item.name,
      category: item.category,
      option: "",
      price: item.price,
      cost: cost,
      stock: item.stock,
    });
  };

  return (
    <Stack paddingY={"1rem"}>
      <Typography variant="h6" marginBottom={"8px"}>
        {item.name}
      </Typography>
      {item.options.length ? (
        <>
          <Typography variant="subtitle1" marginBottom={"8px"}>
            Options:
          </Typography>
          <Stack rowGap={"8px"} useFlexGap>
            {...item.options.map((option) => (
              <OptionRow option={option} item={item} rootRef={rootRef} />
            ))}

            <Box>
              {isAddingOption ? (
                <Stack useFlexGap rowGap={"8px"}>
                  <Stack
                    direction={"row"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                  >
                    <TextField
                      label="New Option"
                      variant="outlined"
                      size="small"
                      value={newOptionName}
                      onChange={(event) => setNewOptionName(event.target.value)}
                      sx={{ marginRight: "1rem" }}
                    />
                    <Stack
                      direction={"row"}
                      width={"150px"}
                      columnGap={"8px"}
                      useFlexGap
                    >
                      <TextField
                        label="Cost"
                        variant="outlined"
                        size="small"
                        type="number"
                        value={newOptionCost}
                        onChange={(event) =>
                          setNewOptionCost(event.target.value)
                        }
                      />
                      <TextField
                        label="Price"
                        variant="outlined"
                        size="small"
                        type="number"
                        value={newOptionPrice}
                        onChange={(event) =>
                          setNewOptionPrice(event.target.value)
                        }
                      />
                    </Stack>
                  </Stack>
                  <Button
                    variant="contained"
                    onClick={() => confirmAddOption()}
                  >
                    Confirm new option
                  </Button>
                </Stack>
              ) : (
                <Stack>
                  <Button variant="contained" onClick={() => onAddOption()}>
                    Add new option
                  </Button>
                </Stack>
              )}
            </Box>
          </Stack>
        </>
      ) : (
        <Stack direction={"row"} width={"150px"} columnGap={"8px"} useFlexGap>
          <TextField
            label="Cost"
            variant="outlined"
            size="small"
            type="number"
            value={item.cost}
            onChange={(event) => onChangeNonOptionCost(event.target.value)}
          />
          <TextField
            label="Price"
            variant="outlined"
            size="small"
            type="number"
            value={item.price}
            onChange={(event) => onChangeNonOptionPrice(event.target.value)}
          />
        </Stack>
      )}
    </Stack>
  );
};

export default ItemSubCard;
