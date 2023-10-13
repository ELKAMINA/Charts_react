import { Route, Routes } from 'react-router-dom';
import React from 'react';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { fetchAllUserProjects, selectProjects } from './redux/Projects/projectSlice';

function App() {
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch(fetchAllUserProjects());
  }, []);

  const allProjects = useAppSelector(selectProjects);

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        {allProjects.map((proj) => (
          <Route key={proj.uuid} path={`/project/${proj.uuid}`} element={<Projects uuid={proj.uuid} />} />
        ))}
      </Routes>
    </div>
  );
}

export default App;
