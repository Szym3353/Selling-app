import {
  Card,
  CardContent,
  Stack,
  TextField,
  Button,
  InputAdornment,
} from "@mui/material";
import React from "react";

import SearchIcon from "@mui/icons-material/Search";

const Search = ({ callback }: { callback: (arg: string) => void }) => {
  let [searchValue, setSearchValue] = React.useState("");

  let handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    callback(searchValue);
  };

  return (
    <Card sx={{ my: 3 }}>
      <CardContent component="form" onSubmit={handleSubmit}>
        <Stack direction={"row"}>
          <TextField
            label="Search something..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            fullWidth
          />
          <Button variant="contained" type="submit">
            Search
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default Search;
