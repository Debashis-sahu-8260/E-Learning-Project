import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Rating from '@mui/material/Rating';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import SearchIcon from '@mui/icons-material/Search';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import style from './reports.module.css'; // Ensure the style file exists

const ReportsPage = () => {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [open, setOpen] = useState(false); // State for modal open/close
  const [courseIdToDelete, setCourseIdToDelete] = useState(null); // ID of the course to delete

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('http://localhost:8080/courses');
        if (!response.ok) throw new Error('Failed to fetch courses');
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  const handleDeleteClick = (id) => {
    setCourseIdToDelete(id);
    setOpen(true); // Open modal on delete button click
  };

  const handleClose = () => {
    setOpen(false); // Close the modal
    setCourseIdToDelete(null); // Clear the ID
  };

  const handleDeleteConfirm = async () => {
    try {
      const response = await fetch(`http://localhost:8080/courses/${courseIdToDelete}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete course');
      setCourses(courses.filter((course) => course._id !== courseIdToDelete));
      handleClose(); // Close modal after deletion
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  const handleEdit = (id) => {
    console.log('Edit course with ID:', id);
    // Implement navigation to the course edit page
  };

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container className={style.container}>
      <Row className={style.searchRow}>
        <Col>
          <div className={style.searchContainer}>
            <SearchIcon className={style.searchIcon} />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={style.searchInput}
            />
          </div>
        </Col>
      </Row>
      <Row className={style.cardGrid}>
        {filteredCourses.map((course) => (
          <Col key={course._id} xs={12} sm={6} md={4} lg={3} className={style.cardCol}>
            <div className={style.prodcard}>
              <img className={style.prodimg} src={course.image} alt={course.title} />
              <h3 className={style.cardTitle}>{course.title}</h3>
              <div className={style.author}>{course.author}</div>
              <div className={style.ratingDiv}>
                <span className={style.rateNum}>{course.rating || 4.3}</span>
                <Rating
                  name="read-only"
                  size="small"
                  precision={0.5}
                  value={course.rating || 4.3}
                  readOnly
                />
                <span className={style.rateCount}>(1200)</span>
              </div>
              <div className={style.priceBar}>
                <span className={style.price}>₹{course.price}</span>
                <span className={style.oldPrice}>₹{+course.price + 1000}</span>
              </div>
              <hr />
              <div className={style.btnFlex}>
                <Button
                  onClick={() => handleEdit(course._id)}
                  className={style.actionButton}
                  variant="contained"
                >
                  <EditIcon />
                </Button>
                <Button
                  onClick={() => handleDeleteClick(course._id)} // Open modal on delete click
                  className={style.actionButton}
                  variant="contained"
                  color="error"
                >
                  <DeleteForeverIcon />
                </Button>
              </div>
            </div>
          </Col>
        ))}
      </Row>

      {/* Confirmation Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <div style={{ display: 'flex', justifyContent:"center" }}>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyhbkbAaut1zal_92hOuwbfVT6tNh5n60Vhw&s"
              alt="Warning"
              style={{ width: 100, height: 100}}
            />
          </div>
          <DialogTitle style={{ display: 'flex', justifyContent:"center",color:"red"}}>Warning!!!</DialogTitle>
          <DialogContentText>
            Are you sure you want to delete this user?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ReportsPage;
