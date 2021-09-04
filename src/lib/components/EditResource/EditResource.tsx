import { Box, Button, makeStyles, Typography } from '@material-ui/core'
import { useFormik } from 'formik'
import React from 'react'
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
}

interface EditResourceProps {
  config: EditResourceConfig[]
  title?: string
  id?: string
  initialValues: { [key: string]: any }
  onSubmit?: (values: { [key: string]: any }) => void
}

export const ResourceFactory: React.FC<EditResourceProps> = ({
  config,
  initialValues,
  title,
  id,
  onSubmit: onFormSubmit,
}) => {
  const classes = useStyles()

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      onFormSubmit && onFormSubmit(values)
    },
  })

  return (
    <Box>
      <Typography variant="h5">{title}</Typography>
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
        >
          Submit
        </Button>
      </form>
    </Box>
  )
}
