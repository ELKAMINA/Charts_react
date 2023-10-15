import Container from '@mui/material/Container';
import React from 'react';
import Navbar from '../components/Navbar';
import BarChart from '../components/BarChart';

function Projects() {
  return (
    <>
      <Navbar />
      <Container sx={{
        marginTop: '5%',
        alignItems: 'center',
        width: '80vw',
        height: '60vh',
      }}
      >
        {/* <div> TOTO </div> */}
        <BarChart />
      </Container>
    </>
  );
}

export default Projects;
