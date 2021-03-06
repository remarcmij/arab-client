import Box from '@material-ui/core/Box';
import orange from '@material-ui/core/colors/orange';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
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
import { useLocation } from 'react-router-dom';
import { RootState } from 'typesafe-actions';
import useNavBackRoute from '../../../layout/hooks/useNavBackRoute';
import { clearUploads, uploadFileAsync } from '../actions';
import uploadImg from '../assets/File-upload-01.svg';
import { Upload } from '../reducer';

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

const getStatusIcon = (disposition: string) => {
  switch (disposition) {
    case 'pending':
      return <HourglassEmptyIcon color="disabled" />;
    case 'success':
      return <CheckIcon color="primary" />;
    case 'error':
      return <ErrorOutlineIcon color="error" />;
    default:
      return <WarningIcon htmlColor={orange[500]} />;
  }
};

const DropBox: React.FC = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  // This components is associated with two route:
  // 1. /admin/upload : via navigation drawer menu option
  // 2. /admin/content/upload: via content management page
  // The back button should return to the place where this
  // component was called from
  useNavBackRoute(
    pathname === '/admin/content/upload' ? '/admin/content' : '/content',
  );

  const onDrop = useCallback(
    (files: File[]) => {
      files.forEach(file => dispatch(uploadFileAsync(file)));
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

const UploadListItem: React.FC<{ upload: Upload }> = ({ upload }) => {
  let secondaryText = '';
  switch (upload.disposition) {
    case 'success':
      secondaryText = 'Successfully uploaded.';
      break;
    case 'unchanged':
      secondaryText = 'Content unchanged.';
      break;
    case 'error':
      secondaryText = upload.message!;
      break;
    default:
  }

  return (
    <ListItem>
      <ListItemText primary={upload.file.name} secondary={secondaryText} />
      <ListItemSecondaryAction>
        {getStatusIcon(upload.disposition)}
      </ListItemSecondaryAction>
    </ListItem>
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
            <UploadListItem key={upload.uuid} upload={upload} />
          ))}
        </List>
      )}
    </Paper>
  );
};

const ContentUpload: React.FC = () => {
  const classes = useStyles();
  return (
    <Grid container={true} justify="center">
      <Grid item={true} xs={12} md={8}>
        <Box className={classes.flexColumnContainer} mt={4}>
          <DropBox />
          <Box mt={2} />
          <ResultList />
        </Box>
      </Grid>
    </Grid>
  );
};

export default ContentUpload;
