import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

export default (reducers) => {
  const persistedReducer = persistReducer(
    {
      key: 'REACT-SCHOOL',
      version: 1,
      storage,
    },
    reducers,
  );

  return persistedReducer;
};
