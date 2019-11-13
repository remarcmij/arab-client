import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CheckIcon from '@material-ui/icons/Check';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import WarningIcon from '@material-ui/icons/Warning';
import React, { useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'typesafe-actions';
import { clearUploads, uploadFile } from '../actions';
import uploadImg from '../assets/File-upload-01.svg';
import ListSubheader from '@material-ui/core/ListSubheader';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    flexColumnContainer: {
      display: 'flex',
      flexDirection: 'column',
    },
    uploadImage: {
      display: 'block',
      opacity: 0.6,
      width: 96,
      height: 96,
      padding: 16,
      borderRadius: '50%',
      backgroundColor: '#ddd',
      marginBottom: theme.spacing(4),
    },
  }),
);

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'pending':
      return <HourglassEmptyIcon />;
    case 'success':
      return <CheckIcon htmlColor="green" />;
    case 'error':
      return <ErrorOutlineIcon />;
    default:
      return <WarningIcon />;
  }
};

const DropBox: React.FC = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const onDrop = useCallback(
    (files: File[]) => {
      console.log('acceptedFiles :', files);
      files.forEach(file => dispatch(uploadFile(file)));
    },
    [dispatch],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  const { ref, ...rootProps } = getRootProps();

  return (
    <Paper ref={ref} {...rootProps}>
      <Box
        display="flex"
        flexDirection="column"
        // width={400}
        height={280}
        style={{ cursor: 'pointer' }}
      >
        <input {...getInputProps()} />
        <Box py={1} pl={1}>
          <Typography variant="subtitle2">Upload content files</Typography>
        </Box>
        <Divider />
        <Box
          className={classes.flexColumnContainer}
          flex={1}
          justifyContent="center"
          alignItems="center"
        >
          {isDragActive ? (
            <Typography variant="body2">{t('drop_here')}</Typography>
          ) : (
            <React.Fragment>
              <img
                src={uploadImg}
                alt="Upload"
                className={classes.uploadImage}
              />
              <Typography variant="body2" align="center">
                {t('drop_or_select')}
              </Typography>
            </React.Fragment>
          )}
        </Box>
      </Box>
    </Paper>
  );
};

const ResultList: React.FC = () => {
  const dispatch = useDispatch();
  const { uploads } = useSelector((state: RootState) => state.admin);
  const { t } = useTranslation();

  useEffect(() => {
    // clean up the list of uploads on unload
    return () => void dispatch(clearUploads());
  }, [dispatch]);

  return (
    <Paper>
      {uploads.length > 0 && (
        <List subheader={<ListSubheader>{t('upload_results')}</ListSubheader>}>
          {uploads.map(upload => (
            <ListItem key={upload.uuid}>
              <ListItemText primary={upload.file.name} />
              <ListItemSecondaryAction>
                {getStatusIcon(upload.status)}
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      )}
    </Paper>
  );
};

const Upload: React.FC = () => {
  const classes = useStyles();
  return (
    <Grid container={true} justify="center">
      <Grid item={true} xs={12} md={6}>
        <Box className={classes.flexColumnContainer} mt={4}>
          <DropBox />
          <Box mt={2} />
          <ResultList />
        </Box>
      </Grid>
    </Grid>
  );
};

export default Upload;
