import React, { useMemo } from 'react'

import { FormControl, FormHelperText, Input, InputAdornment, InputLabel } from '@mui/material'
import { Controller, ValidationRule } from 'react-hook-form';
import { TEXT_FIELD_REQUIRED } from '../../constants/strings';
import { patternErrors, TPattern } from '../../types';
import { FieldError } from 'react-hook-form';

interface Props {
  control: any;
  defaultValue?: string;
  focused?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  label: string;
  maxLength?: number;
  minLength?: number;
  name: string;
  pattern?: TPattern;
  required?: boolean;
  type?: string;
  onIcon?: () => void;
}

export const MyTextInput = React.memo(({ focused, fullWidth = true, icon, control, name, label, type, defaultValue, pattern, minLength, maxLength, required, onIcon }: Props) => {

  const patternSelected = useMemo((): ValidationRule<RegExp> | undefined => {
    switch (pattern) {
      case 'letters':
        return /^[A-Za-zÀ-ú ]+$/;
      case 'numbers':
        return /^[0-9]+$/;
      case 'ten-digits':
        return /^\d{10}$/;
      case 'email':
        return /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9-]+(?:\.[a-z0-9-]+)*$/;
      default:
        return undefined;
    }
  }, [pattern])

  const getErrorMessage = (error: FieldError) => {
    switch (error.type) {
      case 'required':
        return TEXT_FIELD_REQUIRED;
      case 'maxLength':
        return `Máximo ${maxLength} caracteres`;
      case 'minLength':
        return `Mínimo ${maxLength} caracteres`;
      case 'pattern':
        return patternErrors[pattern!];
      default:
        return error.message;
    }
  }

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue ?? ''}
      rules={{
        required,
        maxLength,
        minLength,
        pattern: patternSelected,
      }}
      render={({ field, fieldState: { error } }) => (
        <FormControl
          fullWidth={fullWidth}
          sx={{ flexGrow: 1 }}
          variant="standard"
          error={!!error}
          focused={focused ?? (type === 'date' && !field.value?.length)}
        >
          <InputLabel htmlFor="component-error">
            {label}
          </InputLabel>
          <Input
            {...field}
            type={type ?? 'text'}
            endAdornment={(
              <InputAdornment
                position="end"
                className={onIcon && 'pointer'}
                onClick={onIcon}
              >
                {icon}
              </InputAdornment>
            )}
          />
          {
            error && (
              <FormHelperText id="component-error-text">
                {getErrorMessage(error)}
              </FormHelperText>
            )
          }
        </FormControl>
      )}
    />
  )
})
