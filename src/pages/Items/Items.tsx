import { Box, Tab, Tabs, Typography } from "@mui/material";
import ItemsTable from "./components/ItemsTable";
import { SyntheticEvent, useState } from "react";
import { TabPanel } from "./components/TabPanel";
import ItemCardTab from "./components/ItemCardTab";

const Items = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const a11yProps = (index: number) => {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  };

  return (
    <Box padding={"1rem 4rem"}>
      <Typography
        variant="h3"
        gutterBottom
        color={"#26A69A"}
        fontWeight={"bold"}
      >
        Items
      </Typography>
      <Tabs
        value={tabValue}
        onChange={handleChange}
        sx={{ marginBottom: "1rem" }}
      >
        <Tab label="Card View" {...a11yProps(0)} />
        <Tab label="Table View" {...a11yProps(1)} />
      </Tabs>
      <TabPanel value={tabValue} index={0}>
        <ItemCardTab />
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <ItemsTable />
      </TabPanel>
    </Box>
  );
};

export default Items;
