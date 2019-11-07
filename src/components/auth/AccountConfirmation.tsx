import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from '../common/Spinner';

const AccountConfirmation: React.FC = () => {
  const { token } = useParams();
  const [loading, setLoading] = useState(true);
  const [expired, setExpired] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    const body = JSON.stringify({ token });
    void axios
      .post(`/auth/confirmation`, body)
      .then(({ data }) => setMsg(data.msg))
      .catch(({ response: { data } }) => {
        if (data.error === 'token-expired') {
          setExpired(true);
        }
        setMsg(data.msg);
      })
      .finally(() => setLoading(false));
  }, [token]);

  if (loading) {
    return <Spinner />;
  }

  if (expired) {
    // TODO: resend token
    return <div>Token expired</div>;
  }

  return <div>Account Verification: {msg}</div>;
};
export default AccountConfirmation;
