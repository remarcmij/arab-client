import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import React from 'react';

const FieldSet: React.FC<{ label: string }> = props => (
  <FormControl component="fieldset" fullWidth={true} style={{ marginTop: 16 }}>
    <FormLabel component="legend">{props.label}</FormLabel>
    {props.children}
  </FormControl>
);

export default FieldSet;
