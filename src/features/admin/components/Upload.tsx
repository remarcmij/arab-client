import Paper from '@material-ui/core/Paper';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import uploadImg from '../assets/upload-svgrepo-com.svg';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginTop: theme.spacing(4),
      display: 'flex',
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
  const onDrop = useCallback(acceptedFiles => {
    console.log('acceptedFiles :', acceptedFiles);
    // Do something with the files
  }, []);

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
    </div>
  );
};

export default Upload;
