import React from 'react';
import { TextField, MenuItem } from '@mui/material';

const ClothType = ({
  values,
  touched,
  errors,
  handleBlur,
  handleChange,
}) => {
  return (
    <TextField
      fullWidth
      variant="filled"
      select
      label="Cloth Type"
      onBlur={handleBlur}
      onChange={handleChange}
      value={values.clothType}  // Assuming 'clothType' is the name of the cloth type field
      name="clothType"
      error={!!touched.clothType && !!errors.clothType}
      helperText={touched.clothType && errors.clothType}
      sx={{ gridColumn: 'span 4' }}
    >
      {/* Add MenuItem for each cloth type */}
      <MenuItem value="shirt">Shirt</MenuItem>
      <MenuItem value="pants">Pants</MenuItem>
      <MenuItem value="dress">Dress</MenuItem>
      {/* Add more cloth types as needed */}
    </TextField>
  );
};

export default ClothType;
