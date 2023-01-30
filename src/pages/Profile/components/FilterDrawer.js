import { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import "../profile.css";
import SortType from "./SortType";
const FilterDrawer = ({
  isDrawerOpen,
  setIsDrawerOpen,
  sortType,
  setSortType,
}) => {
  return (
    <Drawer
      anchor={"left"}
      open={isDrawerOpen}
      onClose={() => setIsDrawerOpen(false)}
    >
      <Box sx={{ width: 300, height: "100%" }} role="presentation" px={4}>
        <h2>Filters</h2>
        <SortType sortType={sortType} setSortType={setSortType} />
      </Box>
    </Drawer>
  );
};
export default FilterDrawer;
