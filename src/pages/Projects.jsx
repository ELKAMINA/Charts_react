import React from 'react';
import Container from '@mui/material/Container';

import Navbar from '../components/Navbar';
import BarChart from '../components/BarChart';
import { useAppDispatch } from '../redux/hooks';
import { fetchEnergy } from '../redux/Projects/projectSlice';

function Projects(uuidObject) {
  const dispatch = useAppDispatch();
  // const location = window.location.pathname;
  const { uuid } = uuidObject;
  console.log('uuid ', uuid);
  React.useEffect(() => {
    dispatch(fetchEnergy(uuid));
  }, []);

  return (
    <>
      <Navbar />
      <Container sx={{
        marginTop: '5%',
        alignItems: 'center',
        width: '80vw',
        height: '80vh',
      }}
      >
        <BarChart />
      </Container>
    </>
  );
}

export default Projects;
