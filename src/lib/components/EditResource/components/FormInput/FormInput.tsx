import {
  Switch,
  FormControlLabel,
  TextField,
  Box,
  Button,
  IconButton,
  Tooltip,
  Typography,
  Chip,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  InputBase,
} from '@material-ui/core'
import { DatePicker } from '@material-ui/pickers'
import { useFormik } from 'formik'
import moment from 'moment'

import React, { useEffect, useRef, useState } from 'react'

type Formik = ReturnType<typeof useFormik>

interface BaseInputProps {
  id: string
  label: string
  formik: Formik
  required?: boolean
  className?: string
  disabled?: boolean
  options?: { label: string; value: string }[]
}

export const TextInput: React.FC<BaseInputProps> = ({ formik, ...props }) => {
  return (
    <TextField
      variant="filled"
      fullWidth
      type="text"
      onBlur={formik.handleBlur}
      value={formik.values[props.id]}
      onChange={formik.handleChange}
      error={formik.touched[props.id] && !!formik.errors[props.id]}
      helperText={formik.touched[props.id] && formik.errors[props.id]}
      {...props}
    />
  )
}

export const EmailInput: React.FC<BaseInputProps> = ({ formik, ...props }) => {
  return (
    <TextField
      variant="filled"
      fullWidth
      type="number"
      onBlur={formik.handleBlur}
      value={formik.values[props.id]}
      onChange={formik.handleChange}
      error={formik.touched[props.id] && !!formik.errors[props.id]}
      helperText={formik.touched[props.id] && formik.errors[props.id]}
      {...props}
    />
  )
}

export const NumberInput: React.FC<BaseInputProps> = ({ formik, ...props }) => {
  return (
    <TextField
      variant="filled"
      fullWidth
      type="number"
      onBlur={formik.handleBlur}
      value={formik.values[props.id]}
      onChange={formik.handleChange}
      error={formik.touched[props.id] && !!formik.errors[props.id]}
      helperText={formik.touched[props.id] && formik.errors[props.id]}
      {...props}
    />
  )
}

export const TextAreaInput: React.FC<BaseInputProps> = ({ formik, ...props }) => {
  return (
    <TextField
      rows={3}
      multiline
      variant="filled"
      fullWidth
      type="text"
      onBlur={formik.handleBlur}
      value={formik.values[props.id]}
      onChange={formik.handleChange}
      error={formik.touched[props.id] && !!formik.errors[props.id]}
      helperText={formik.touched[props.id] && formik.errors[props.id]}
      {...props}
    />
  )
}

export const BooleanInput: React.FC<BaseInputProps> = ({ formik, ...props }) => {
  return (
    <FormControlLabel
      labelPlacement="start"
      control={
        <Switch
          checked={!!formik.values[props.id]}
          onChange={formik.handleChange}
          name={props.id}
          color="primary"
        />
      }
      {...props}
    />
  )
}

const toBase64 = (file: File) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })

export const ImageInput: React.FunctionComponent<BaseInputProps> = ({ formik, ...props }) => {
  const [selectedFiles, setSelectedFiles] = React.useState<File[] | null>(null)
  const [preview, setPreview] = useState<string[]>(formik.values[props.id] || [])

  const handleCapture = ({ target }: any) => {
    setSelectedFiles(Array.from(target.files))
    console.log(target.files)
  }

  const handleSubmit = () => {
    console.log(selectedFiles)
  }

  useEffect(() => {
    if (selectedFiles && selectedFiles.length) {
      ;(async () => {
        try {
          console.log(selectedFiles)
          const data = (await Promise.all(selectedFiles.map((file) => toBase64(file)))) as string[]
          setPreview(data)
        } catch (error) {
          console.log(error)
        }
      })()
    }
  }, [selectedFiles])

  if (props.disabled) {
    return (
      <Box>
        <Typography variant="h6" gutterBottom>
          {props.label}
        </Typography>
        <Box sx={{ display: 'flex', margin: '1.5rem 0', width: '100%' }}>
          {!preview.length && (
            <Typography variant="body1" gutterBottom>
              No Image
            </Typography>
          )}
          {preview.map((image, index) => (
            <img
              onClick={() =>
                setSelectedFiles((prev) => prev?.filter((_, i) => i !== index) || null)
              }
              key={index}
              src={image}
              alt={'preview'}
              style={{
                width: '100px',
                height: '100px',
                objectPosition: 'center',
                objectFit: 'cover',
                borderRadius: '1rem',
                marginRight: '1rem',
              }}
            />
          ))}
        </Box>
      </Box>
    )
  }

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        {props.label}
      </Typography>
      <form encType="multipart/form-data">
        <label htmlFor="avatar">
          <Button component="span" size="small" variant="contained">
            Add Images
          </Button>
          <input
            id="avatar"
            name={'avatar'}
            type={'file'}
            placeholder="Choose Image"
            onChange={handleCapture}
            accept="image/png, image/jpeg"
            multiple={true}
            min={1}
            max={5}
            hidden
          />
        </label>

        <Box sx={{ display: 'flex', margin: '1.5rem 0', width: '100%' }}>
          {preview.map((image, index) => (
            <img
              onClick={() =>
                setSelectedFiles((prev) => prev?.filter((_, i) => i !== index) || null)
              }
              key={index}
              src={image}
              alt={'preview'}
              style={{
                width: '100px',
                height: '100px',
                objectPosition: 'center',
                objectFit: 'cover',
                borderRadius: '1rem',
                marginRight: '1rem',
              }}
            />
          ))}
        </Box>
        <Button variant="contained" type="submit" color="primary" disabled={!selectedFiles?.length}>
          Upload
        </Button>
      </form>
    </Box>
  )
}

export const MultiSelectInput: React.FC<BaseInputProps> = ({ formik, options, ...props }) => {
  return (
    <FormControl fullWidth variant="filled" className={props.className}>
      <InputLabel id={`${props.id}-label`}>{props.label}</InputLabel>
      <Select
        labelId={`${props.id}-label`}
        id={props.id}
        name={props.id}
        multiple
        value={formik.values[props.id] || []}
        onChange={formik.handleChange}
        renderValue={(selected) => (
          <div>
            {(selected as string[]).map((value) => (
              <Chip color="primary" key={value} label={value} style={{ marginRight: 4 }} />
            ))}
          </div>
        )}
      >
        {options &&
          options.map(({ label, value }, i) => (
            <MenuItem key={i} value={value}>
              {label}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  )
}
export const SelectInput: React.FC<BaseInputProps> = ({ formik, options, ...props }) => {
  return (
    <FormControl fullWidth variant="filled" className={props.className}>
      <InputLabel id={`${props.id}-label`}>{props.label}</InputLabel>
      <Select
        labelId={`${props.id}-label`}
        id={props.id}
        name={props.id}
        value={formik.values[props.id]}
        onChange={formik.handleChange}
        renderValue={(selected) => (
          <div>
            <Chip color="primary" label={`${selected}` || ''} />
          </div>
        )}
      >
        {options &&
          options.map(({ label, value }, i) => (
            <MenuItem key={i} value={value}>
              {label}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  )
}
export const ArrayInput: React.FC<BaseInputProps> = ({ formik, options, ...props }) => {
  const [value, setValue] = useState<string | null>(null)
  const [chipData, setChipData] = React.useState<string[]>(formik.values[props.id] || [])

  const handleDelete = (chipToDelete: string) => () => {
    setChipData((chips) => chips.filter((chip) => chip !== chipToDelete))
  }

  useEffect(() => {
    formik.setFieldValue(props.id, chipData)
  }, [chipData])

  const isInvalid = typeof value === 'string' && value.length <= 2
  return (
    <Box sx={{ margin: '1rem 0' }}>
      <InputLabel>{props.label}</InputLabel>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', margin: '0.5rem 0' }}>
        {chipData.map((data, i) => {
          return (
            <Chip
              key={i}
              label={data}
              color="primary"
              onDelete={handleDelete(data)}
              style={{ marginRight: '0.5rem', marginBottom: '0.5rem' }}
            />
          )
        })}
      </Box>
      <Box sx={{ mt: '0.5rem' }}>
        <TextField
          label="New Item"
          value={value || ''}
          onChange={(e) => setValue(e.target.value)}
          variant="filled"
          size="small"
          error={isInvalid}
          helperText={isInvalid && 'Must have 3 characters'}
        />
        <Button
          variant="contained"
          color="primary"
          style={{ marginLeft: '0.5rem' }}
          onClick={() => {
            if (!isInvalid && value) {
              setChipData((prev) => [...prev, value])
              setValue(null)
            }
          }}
          disabled={value === null || isInvalid}
        >
          Add
        </Button>
      </Box>
    </Box>
  )
}

export const DateInput: React.FC<BaseInputProps> = ({ formik, ...props }) => {
  return (
    <DatePicker
      {...props}
      autoOk
      label={props.label}
      clearable
      fullWidth
      format="DD MMM YYYY"
      inputVariant="filled"
      disableFuture
      value={formik.values[props.id] || null}
      onChange={(date) => {
        console.log(date?.toString())
        formik.setFieldValue(props.id, date?.toString())
      }}
    />
  )
}
