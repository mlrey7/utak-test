import { Stack, TextField } from "@mui/material";
import { DatabaseReference, child, set } from "firebase/database";

interface Option {
  optionName: string;
  cost: number;
  price: number;
  id: string;
}

export interface ConsolidatedItem {
  id: string;
  category: string;
  name: string;
  cost: number;
  price: number;
  stock: number;
  options: Option[];
}

interface OptionRowProps {
  option: Option;
  item: ConsolidatedItem;
  rootRef: DatabaseReference;
}

const OptionRow = ({ option, item, rootRef }: OptionRowProps) => {
  const onChangeOptionName = (optionName: string, option: Option) => {
    const itemRef = child(rootRef, `/${option.id}`);

    set(itemRef, {
      id: option.id,
      name: item.name,
      category: item.category,
      option: optionName,
      price: option.price,
      cost: option.cost,
      stock: item.stock,
    });
  };

  const onChangeCost = (value: string, option: Option) => {
    const cost = Number(value);
    const itemRef = child(rootRef, `/${option.id}`);

    set(itemRef, {
      id: option.id,
      name: item.name,
      category: item.category,
      option: option.optionName,
      price: option.price,
      cost: cost,
      stock: item.stock,
    });
  };

  const onChangePrice = (value: string, option: Option) => {
    const price = Number(value);
    const itemRef = child(rootRef, `/${option.id}`);

    set(itemRef, {
      id: option.id,
      name: item.name,
      category: item.category,
      option: option.optionName,
      price: price,
      cost: option.cost,
      stock: item.stock,
    });
  };

  return (
    <Stack
      direction={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
      key={option.id}
    >
      <TextField
        label="Option"
        variant="outlined"
        size="small"
        value={option.optionName}
        onChange={(event) => onChangeOptionName(event.target.value, option)}
        sx={{ marginRight: "1rem" }}
      />
      <Stack direction={"row"} width={"150px"} columnGap={"8px"} useFlexGap>
        <TextField
          label="Cost"
          variant="outlined"
          size="small"
          type="number"
          value={option.cost}
          onChange={(event) => onChangeCost(event.target.value, option)}
        />
        <TextField
          label="Price"
          variant="outlined"
          size="small"
          type="number"
          value={option.price}
          onChange={(event) => onChangePrice(event.target.value, option)}
        />
      </Stack>
    </Stack>
  );
};

export default OptionRow;
