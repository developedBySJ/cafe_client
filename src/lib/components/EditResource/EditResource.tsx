import { Box, Button, makeStyles, Typography } from '@material-ui/core'
import { useFormik } from 'formik'
import React from 'react'
import { AssetType } from '../../types'
import {
  BooleanInput,
  EmailInput,
  ImageInput,
  NumberInput,
  MultiSelectInput,
  SelectInput,
  TextAreaInput,
  TextInput,
  ArrayInput,
  DateInput,
  PasswordInput,
} from './components'

const useStyles = makeStyles((theme) => ({
  input: {
    margin: '0.75rem 0',
  },
}))

const componentMap = {
  text: TextInput,
  number: NumberInput,
  email: EmailInput,
  password: PasswordInput,
  longText: TextAreaInput,
  boolean: BooleanInput,
  image: ImageInput,
  select: SelectInput,
  multiSelect: MultiSelectInput,
  array: ArrayInput,
  date: DateInput,
}

interface EditResourceConfig {
  type: keyof typeof componentMap
  label: string
  required?: boolean
  id: string
  disabled?: boolean
  options?: { label: string; value: string }[]
  multiImage?: boolean
  imageType?: AssetType
}

interface EditResourceProps {
  config: EditResourceConfig[]
  title?: string
  id?: string
  initialValues: { [key: string]: any }
  onSubmit?: (values: { [key: string]: any }) => void
  disabled?: boolean
}

export const ResourceFactory: React.FC<EditResourceProps> = ({
  config,
  initialValues,
  title,
  id,
  onSubmit: onFormSubmit,
  children,
  disabled = false,
}) => {
  const classes = useStyles()

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: (values) => {
      onFormSubmit && onFormSubmit(values)
    },
  })

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="h5">{title}</Typography>
        {children}
      </Box>
      {id && (
        <Typography variant="h6" gutterBottom color="textSecondary">
          #{id}
        </Typography>
      )}
      <form onSubmit={formik.handleSubmit}>
        {config.map(({ type, ...props }, i) => {
          const Component = componentMap[type]
          return <Component key={i} formik={formik} {...props} className={classes.input} />
        })}
        <Button
          variant="contained"
          color="primary"
          type="submit"
          className={classes.input}
          size="large"
          disabled={disabled}
        >
          Submit
        </Button>
      </form>
    </Box>
  )
}
