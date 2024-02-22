import { Container, Typography } from "@mui/material";
import ItemsTable from "./components/ItemsTable";

const Items = () => {
  return (
    <Container>
      <Typography
        variant="h3"
        gutterBottom
        color={"#26A69A"}
        fontWeight={"bold"}
      >
        Items
      </Typography>
      <ItemsTable />
    </Container>
  );
};

export default Items;
