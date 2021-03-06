import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setNavBackRoute } from '../actions';

export default (to: string) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setNavBackRoute(to));
  }, [dispatch, to]);
};
