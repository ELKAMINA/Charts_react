import { persistStore, persistReducer } from 'redux-persist';
import { configureStore } from '@reduxjs/toolkit';
import { rootPersistConfig, rootReducer } from './rootReducer';

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export const store = configureStore({
  reducer:
    {
      persistedReducer,
    },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
    immutableCheck: false,
  }),
  devTools: true,
});

export const persistor = persistStore(store);

// ----------------------------------------------------------------------
