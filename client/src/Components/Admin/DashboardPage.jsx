import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, BarChart, Bar } from 'recharts';
import { School, Book, People, CheckCircle } from '@mui/icons-material';
import { Grid, Card, CardContent, Typography, Icon } from '@mui/material';


const lineData = [
  { name: 'Week 1', students: 30 },
  { name: 'Week 2', students: 45 },
  { name: 'Week 3', students: 65 },
  { name: 'Week 4', students: 85 },
];

const barData = [
  { name: 'Courses', value: 50 },
  { name: 'Instructors', value: 50 },
  { name: 'Students', value: 300 },
];

const DashboardPage = () => {
  const [totalStudents, setTotalStudents] = useState(0);
  const [activeCourses, setActiveCourses] = useState(0);


  useEffect(() => {
    const fetchData = async () => {
      try {

        const studentResponse = await axios.get('http://localhost:8080/join/signup-popup');
        setTotalStudents(studentResponse.data.length);


        const courseResponse = await axios.get('http://localhost:8080/courses');
        setActiveCourses(courseResponse.data.length);


      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, []);
  const iconStyles = {
    width: '60px',  // Adjust size as needed
    height: '60px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    color: 'white',
  };
  return (
    <div style={{ padding: '24px' }}>
      <Typography variant="h4" gutterBottom>
        Dashboard Overview
      </Typography>

      {/* Cards for Quick Metrics */}
      <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={3}>
        <Card>
          <CardContent style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <Typography color="textSecondary" gutterBottom>
                Total Students
              </Typography>
              <Typography variant="h5">
                {totalStudents}
              </Typography>
            </div>
            <div style={{ backgroundColor: 'blue', ...iconStyles }}>
              <School fontSize="large" />
            </div>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <Card>
          <CardContent style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <Typography color="textSecondary" gutterBottom>
                Active Courses
              </Typography>
              <Typography variant="h5">
                {activeCourses}
              </Typography>
            </div>
            <div style={{ backgroundColor: 'green', ...iconStyles }}>
              <Book fontSize="large" />
            </div>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <Card>
          <CardContent style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <Typography color="textSecondary" gutterBottom>
                Instructors
              </Typography>
              <Typography variant="h5">
                50
              </Typography>
            </div>
            <div style={{ backgroundColor: 'orange', ...iconStyles }}>
              <People fontSize="large" />
            </div>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <Card>
          <CardContent style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <Typography color="textSecondary" gutterBottom>
                Completed Courses
              </Typography>
              <Typography variant="h5">
                100%
              </Typography>
            </div>
            <div style={{ backgroundColor: 'purple', ...iconStyles }}>
              <CheckCircle fontSize="large" />
            </div>
          </CardContent>
        </Card>
      </Grid>
    </Grid>


      {/* Charts Section */}
      <Grid container spacing={3} style={{ marginTop: '24px' }}>
        {/* Line Chart - Student Growth */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Weekly Student Growth
              </Typography>
              <LineChart width={500} height={300} data={lineData}>
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid stroke="#ccc" />
                <Tooltip />
                <Line type="monotone" dataKey="students" stroke="#8884d8" />
              </LineChart>
            </CardContent>
          </Card>
        </Grid>

        {/* Bar Chart - Course Statistics */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Platform Statistics
              </Typography>
              <BarChart width={500} height={300} data={barData}>
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid stroke="#ccc" />
                <Tooltip />
                <Bar dataKey="value" fill="#ffed0e" />
              </BarChart>
            </CardContent>
          </Card>
        </Grid>

      </Grid>
    </div>
  );
};

export default DashboardPage;
