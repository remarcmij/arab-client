import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { RootState } from 'typesafe-actions';
import TrimmedContainer from '../../../layout/components/TrimmedContainer';
import { storeToken } from '../../../utils/token';
import PasswordChange from './PasswordChange';
import PasswordReset from './PasswordResetEmailForm';

const Password: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  const { tempResetToken } = useParams();

  const isResetProcess = !!tempResetToken;

  useEffect(() => {
    if (isResetProcess) {
      storeToken(tempResetToken as string);
    }
  }, [tempResetToken]);

  return (
    <TrimmedContainer>
      {user ?? isResetProcess ? (
        <PasswordChange isResetProcess={isResetProcess} />
      ) : (
        <PasswordReset />
      )}
    </TrimmedContainer>
  );
};

export default Password;
