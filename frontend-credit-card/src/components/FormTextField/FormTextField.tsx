import React, { useEffect } from 'react'
import { useFormContext, Controller, RegisterOptions } from 'react-hook-form'
import TextField from '~components/TextField'

type Props = React.ComponentProps<typeof TextField> & {
  name: string
  rules: RegisterOptions
  validationLength?: number
  formatter?: (oldValue: string, newValue: string) => string
  onValid?: () => void
}

const FormTextField: React.FC<Props> = (props) => {
  const { name, rules, validationLength = 1, formatter, onBlur, onValid, ...restOfProps } = props
  const { control, formState, trigger, watch } = useFormContext()
  const value = watch(name)

  useEffect(() => {
    async function validate() {
      const isValid = await trigger(name)
      if (isValid) onValid?.()
    }

    if (value?.length >= validationLength) {
      validate()
    }
  }, [value, name, validationLength, trigger]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Controller
      rules={rules}
      control={control}
      render={({ field }) => (
        <TextField
          {...restOfProps}
          errorText={formState.errors[name]?.message as string}
          onBlur={(event) => {
            field.onBlur()
            onBlur?.(event)
          }}
          onChangeText={(text) => {
            const formatted = formatter ? formatter(field.value, text) : text
            field.onChange(formatted)
          }}
          value={field.value}
        />
      )}
      name={name}
    />
  )
}

export default FormTextField
