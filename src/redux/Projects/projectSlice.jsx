/* eslint-disable no-param-reassign */
/* eslint-disable arrow-body-style */
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  allProjects: [],
  energyConsumed: [],
  isLoading: true,
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
    startLoading: (state) => {
      state.isLoading = true;
    },
    finishLoading: (state) => {
      state.isLoading = false;
    },

  },
});

export const {
  getAllProjects, getEnergyConsumption, startLoading, finishLoading,
} = projectSlice.actions;
export const selectProjects = (state) => state.persistedReducer.project.allProjects;
export const selectEnergy = (state) => state.persistedReducer.project.energyConsumed;
export const selectLoading = (state) => state.persistedReducer.project.isLoading;

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
    dispatch(startLoading());
    await axios
      .get(`/api/energy?uuid=${uuid}`)
      .then((res) => {
        dispatch(getEnergyConsumption(res.data));
        dispatch(finishLoading());
      })
      .catch((e) => {
        dispatch(finishLoading());
        console.log('Test ');
        console.error(e);
      });
  };
}

export default projectSlice.reducer;
