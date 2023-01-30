import { InputLabel, MenuItem, OutlinedInput, Select } from "@mui/material";
const options = ["name", "buy on", "expire on"];
const SortType = ({ sortType, setSortType }) => {
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSortType(value);
  };
  return (
    <>
      <InputLabel
        id="demo-multiple-name-label"
        style={{ color: "gray", fontSize: "0.8rem", marginBottom: "0.35rem" }}
      >
        Select Sort Type
      </InputLabel>
      <Select
        fullWidth={true}
        labelId="demo-multiple-name-label"
        id="demo-multiple-name"
        value={sortType}
        style={{
          border: "2px solid gray",
          outline: "none",
          color: "#fff",
        }}
        onChange={handleChange}
      >
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </>
  );
};

export default SortType;
