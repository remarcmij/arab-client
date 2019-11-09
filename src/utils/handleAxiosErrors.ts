import { AxiosError } from 'axios';
import i18next from 'i18next';
import { setToast } from '../actions/toast';
import { ThunkDispatchAny } from '../actions/types';

type ErrorData = { message: string } | { errors: [{ msg: string }] };

export default (err: AxiosError<ErrorData>, dispatch: ThunkDispatchAny) => {
  if (err.response) {
    const { data } = err.response;
    if ('errors' in data) {
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
