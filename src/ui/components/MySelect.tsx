import React from 'react'

import { FormControl, FormHelperText, InputAdornment, InputLabel, MenuItem, Select } from '@mui/material'
import { TEXT_FIELD_REQUIRED } from '../../constants/strings';
import { Controller } from 'react-hook-form';

interface Props {
  control: any;
  defaultValue?: any;
  error?: string;
  focused?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  keyToShow: string;
  keyValue: string;
  label: string;
  name: string;
  options: any[];
  required?: boolean;
}

export const MySelect = React.memo(({ defaultValue, focused, fullWidth = true, control, icon, name, keyToShow, keyValue, label, options, required, }: Props) => {

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue ?? ''}
      rules={{ required: required === true && TEXT_FIELD_REQUIRED }}
      render={({ field, fieldState: { error } }) => (
        <FormControl
          fullWidth={fullWidth}
          sx={{ flexGrow: 1 }}
          variant="standard"
          error={!!error}
          focused={focused}
        >
          <InputLabel>{label}</InputLabel>
          <Select
            {...field}
            endAdornment={(
              <InputAdornment position="end">
                {icon}
              </InputAdornment>
            )}
          >
            {
              options.map(e => (
                <MenuItem key={e[keyValue]} value={e[keyValue]}>
                  {e[keyToShow]}
                </MenuItem>
              ))
            }
          </Select>
          {
            error?.message && <FormHelperText id="component-error-text">
              {error?.message}
            </FormHelperText>
          }
        </FormControl>
      )}
    />
  )
})