import Typography from '@material-ui/core/Typography';
import React from 'react';
import useNavBackRoute from '../hooks/useNavBackRoute';
import TrimmedContainer from './TrimmedContainer';
import { useTranslation } from 'react-i18next';

const About: React.FC = () => {
  useNavBackRoute('/content');
  const { t } = useTranslation();

  return (
    <TrimmedContainer>
      <Typography variant="h4" component="h1" gutterBottom={true}>
        {t('about')}
      </Typography>
      <Typography variant="body1">Bla bla</Typography>
      <Typography variant="caption">
        Copyright 2019, Jim Cramer, Amstelveen
        <br />
        Contributions: Jawhar Birakdar
      </Typography>
    </TrimmedContainer>
  );
};

export default About;
