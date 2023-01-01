import {
  MenuItem,
  Card,
  CardHeader,
  Button,
  CardContent,
  TextField,
  Grid,
  InputAdornment,
  Box,
  Stack,
} from "@mui/material";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { categories } from "../../categories";
import useFetch from "../../hooks/useFetch";
import { offertForm } from "../../types/offert";
import ImageUpload from "./ImageUpload";

const OffertForm = () => {
  let navigate = useNavigate();
  let { id } = useParams();
  let { fetchData, errors } = useFetch();
  let [images, setImages] = React.useState([]);
  let [formData, setFormData] = React.useState<offertForm>({
    title: "",
    description: "",
    price: 1,
    inStock: 0,
    bought: 0,
    category: categories[0],
    photos: [],
  });

  React.useEffect(() => {
    if (id) {
      fetchData("GET", `/offert/${id}`, (data) => {
        if (data) {
          setFormData(data);
          setImages(data.photos);
        }
      });
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id.split("-")[2]]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchData(
      "POST",
      "/offert/create",
      (data) => {
        if (data.offertId) navigate(`/offert/${data.offertId}`);
      },
      {
        ...formData,
        photos: images,
        id: id ? id : null,
      }
    );
  };

  return (
    <>
      <Box onSubmit={handleSubmit} component="form">
        <Stack
          sx={{ my: 4, justifyContent: "flex-end" }}
          spacing={2}
          direction="row"
        >
          <Button variant="contained" type="submit">
            Publish
          </Button>
          <Button variant="outlined" onClick={() => navigate("..")}>
            Back
          </Button>
        </Stack>
        <Card sx={{ mb: 4 }}>
          <CardHeader
            subheader="The more details, the better!"
            title="Details"
          />
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Offert title"
                  size="small"
                  fullWidth
                  id="create-offert-title"
                  value={formData.title}
                  onChange={handleChange}
                  error={errors?.inputErrors.title}
                  helperText={errors?.inputErrors.title}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      category: e.target.value,
                    }))
                  }
                  value={formData.category}
                  id="create-offert-category"
                  select
                  label="Categories"
                  fullWidth
                  size="small"
                  error={errors?.inputErrors.category}
                  helperText={errors?.inputErrors.category}
                >
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <Card sx={{ mt: 4 }}>
          <CardContent>
            <TextField
              fullWidth
              label="Offert description"
              id="create-offert-description"
              multiline
              value={formData.description}
              onChange={handleChange}
              rows={6}
              error={errors?.inputErrors.description}
              helperText={errors?.inputErrors.description}
            />
          </CardContent>
        </Card>
        <Card sx={{ mt: 4 }}>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={6} sm={3}>
                <TextField
                  size="small"
                  label="Price"
                  id="create-offert-price"
                  type="number"
                  InputProps={{
                    inputProps: { min: 1 },
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                  fullWidth
                  value={formData.price}
                  onChange={handleChange}
                  error={errors?.inputErrors.price}
                  helperText={errors?.inputErrors.price}
                />
              </Grid>
              <Grid item xs={6} sm={3}>
                <TextField
                  size="small"
                  onChange={handleChange}
                  id="create-offert-inStock"
                  value={formData.inStock}
                  label="In stock"
                  type="number"
                  error={errors?.inputErrors.inStock}
                  helperText={errors?.inputErrors.inStock}
                  InputProps={{
                    inputProps: { min: 1 },
                  }}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
      <ImageUpload images={images} setImages={setImages} />
    </>
  );
};

export default OffertForm;
