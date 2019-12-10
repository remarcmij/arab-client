import { AxiosError } from 'axios';
import i18next from 'i18next';
import { ThunkDispatchAny } from 'typesafe-actions';
import { setToast } from '../layout/actions';

type ErrorData = { message: string } | [{ msg: string }];

export default (error: AxiosError<ErrorData>, dispatch: ThunkDispatchAny) => {
  if (error.response) {
    const { data } = error.response;
    if (typeof data === 'string') {
      dispatch(setToast('error', data));
    } else if (Array.isArray(data)) {
      data.forEach((error: { msg: string }) => {
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
