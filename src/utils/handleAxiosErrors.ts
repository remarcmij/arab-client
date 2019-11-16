import { AxiosError } from 'axios';
import i18next from 'i18next';
import { ThunkDispatchAny } from 'typesafe-actions';
import { setToast } from '../layout/actions';

type ErrorData = { message: string } | { errors: [{ msg: string }] };

export default (err: AxiosError<ErrorData>, dispatch: ThunkDispatchAny) => {
  if (err.response) {
    const { data } = err.response;
    if (typeof data === 'string') {
      dispatch(setToast('error', data));
    } else if (typeof data === 'object' && 'errors' in data) {
      data.errors.forEach((error: { msg: string }) => {
        console.error(error.msg);
      });
      dispatch(setToast('error', i18next.t('validation_errors')));
    } else if ('message' in data) {
      dispatch(setToast('error', data.message));
    } else {
      dispatch(setToast('error', i18next.t('unknown_error')));
    }
  } else {
    dispatch(setToast('error', i18next.t('unknown_error')));
  }
};
