import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { RootState } from 'typesafe-actions';
import TrimmedContainer from '../../../layout/components/TrimmedContainer';
import PasswordChange from './PasswordChange';
import PasswordReset from './PasswordReset';

const Password: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  const { tempResetToken } = useParams();

  return (
    <TrimmedContainer>
      {user ?? tempResetToken ? (
        <PasswordChange resetToken={tempResetToken} />
      ) : (
        <PasswordReset />
      )}
    </TrimmedContainer>
  );
};

export default Password;
