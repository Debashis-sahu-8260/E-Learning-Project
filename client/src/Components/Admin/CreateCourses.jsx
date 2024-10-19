import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Grid,
  Paper,
  Snackbar,
  Alert,
} from "@mui/material";

const CreateCourse = () => {
  const [courseData, setCourseData] = useState({
    title: "",
    price: "",
    category: "",
    sub_category: "",
    topic: "",
    author: "",
    date: "",
    image: "",
    qty: "",
    level: "",
    details: [],
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "details") {
      setCourseData((prevData) => ({
        ...prevData,
        details: value.split(",").map((detail) => detail.trim()),
      }));
    } else {
      setCourseData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(courseData),
      });

      if (response.ok) {
        const data = await response.json();
        setSnackbarMessage("Course created successfully!");
        setSnackbarSeverity("success");
        setCourseData({
          title: "",
          price: "",
          category: "",
          sub_category: "",
          topic: "",
          author: "",
          date: "",
          image: "",
          qty: "",
          level: "",
          details: [],
        });
      } else {
        const errorData = await response.json();
        setSnackbarMessage(`Error: ${errorData.message}`);
        setSnackbarSeverity("error");
      }
    } catch (error) {
      setSnackbarMessage(`Network Error: ${error.message}`);
      setSnackbarSeverity("error");
    }
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container elevation={3} sx={{ padding: 4, marginTop: 2 }}>
      <Typography variant="h4" gutterBottom>
        Create New Course
      </Typography>
      <form onSubmit={handleSubmit} style={{ marginLeft: "1px" }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Title"
              name="title"
              value={courseData.title}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Price"
              name="price"
              type="number"
              value={courseData.price}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Category"
              name="category"
              value={courseData.category}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Sub Category"
              name="sub_category"
              value={courseData.sub_category}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Topic"
              name="topic"
              value={courseData.topic}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Author"
              name="author"
              value={courseData.author}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Date"
              name="date"
              type="date"
              value={courseData.date}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              required
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Image URL"
              name="image"
              value={courseData.image}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Quantity"
              name="qty"
              type="number"
              value={courseData.qty}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Level"
              name="level"
              value={courseData.level}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Details (comma-separated)"
              name="details"
              value={courseData.details.join(", ")}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Grid container justifyContent="flex-end">
              <Button type="submit" variant="contained" color="primary">
                Create Course
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }} // Positioning the Snackbar
        sx={{ zIndex: 9999 }} 
        // Ensure it appears on top of other elements
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>

    </Container>
  );
};

export default CreateCourse;
