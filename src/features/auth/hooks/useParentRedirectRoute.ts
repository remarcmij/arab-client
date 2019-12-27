import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'typesafe-actions';
import { redirectUser } from '../actions';

const useParentRedirectRoute = () => {
  const dispatch = useDispatch();
  const { parentRedirection } = useSelector((state: RootState) => state.auth);

  /**
   * Allows the user to hit the previous route when some certain process finishes
   */
  const redirectBack = () => {
    if (
      parentRedirection == null ||
      parentRedirection !== window.location.pathname
    ) {
      dispatch(redirectUser(window.location.pathname));
    }
  };

  /**
   * Use Case:
   *  - A user should hit back to a route he was on after many processes of choice finish.
   *  - A user saves a route for an easy switch back after reading from different page.
   * @param path {Url} The url to the next process will be.
   */
  const redirectThenTo = (path: string) => {
    if (parentRedirection !== path && path !== window.location.pathname) {
      dispatch(redirectUser(path));
    }
  };

  const useParentRoutes = useCallback(() => {
    const rgx = new RegExp(`/$`, 'g');

    const path = window.location.pathname.replace(rgx, '');
    const target = parentRedirection?.replace(rgx, '');
    if (target === path) {
      dispatch(redirectUser(null));
    }
  }, [parentRedirection, dispatch]);

  return {
    redirectBack,
    redirectThenTo,
    parentRedirection,
    useParentRoutes,
  };
};

export default useParentRedirectRoute;
