/* eslint-disable no-param-reassign */
/* eslint-disable arrow-body-style */
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  allProjects: [],
  energyConsumed: [],
};

export const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    getAllProjects: (state, action) => {
      state.allProjects = [...action.payload];
    },
    getEnergyConsumption: (state, action) => {
      state.energyConsumed = [...action.payload];
    },
  },
});

export const { getAllProjects, getEnergyConsumption } = projectSlice.actions;
export const selectProjects = (state) => state.persistedReducer.project.allProjects;
export const selectEnergy = (state) => state.persistedReducer.project.energyConsumed;

export function fetchAllUserProjects() {
  return async (dispatch) => {
    await axios
      .get('/api/projects')
      .then((res) => {
        dispatch(getAllProjects(res.data));
      })
      .catch((e) => {
        console.error(e);
      });
  };
}

export function fetchEnergy(uuid) {
  return async (dispatch) => {
    await axios
      .get(`/api/energy?uuid=${uuid}`)
      .then((res) => {
        console.log('la response ', res);
        dispatch(getEnergyConsumption(res.data));
      })
      .catch((e) => {
        console.error(e);
      });
  };
}

export default projectSlice.reducer;
