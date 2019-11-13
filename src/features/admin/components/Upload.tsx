import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React, { useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'typesafe-actions';
import { clearUploads, uploadFile } from '../actions';
import uploadImg from '../assets/upload-svgrepo-com.svg';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginTop: theme.spacing(4),
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    paper: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: 280,
      height: 280,
    },
    image: {
      width: 64,
      height: 64,
    },
  }),
);

const Upload: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { uploads } = useSelector((state: RootState) => state.admin);

  useEffect(() => {
    dispatch(clearUploads());
  }, [dispatch]);

  const onDrop = useCallback(
    (files: File[]) => {
      console.log('acceptedFiles :', files);
      files.forEach(file => dispatch(uploadFile(file)));
    },
    [dispatch],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  const { ref, ...rootProps } = getRootProps({ className: classes.paper });

  return (
    <div className={classes.container}>
      <Paper ref={ref} {...rootProps}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <img src={uploadImg} alt="Upload" className={classes.image} />
          // <p>Drag n drop some files here, or click to select files</p>
        )}
      </Paper>
      <List>
        {uploads.map(upload => (
          <ListItem key={upload.uuid}>
            <ListItemText primary={`${upload.file.name} ${upload.status}`} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default Upload;
