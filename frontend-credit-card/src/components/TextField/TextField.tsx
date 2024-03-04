import React, { useState } from 'react'
import { StyleSheet, TextInput, View, Text, TouchableOpacity } from 'react-native'

type Props = React.ComponentProps<typeof TextInput> & {
  title: string
  label: string
  errorText?: string
  endEnhancer?: React.ReactNode
  onFocus?: (e: any) => void
  onBlur?: (e: any) => void
}

const TextField: React.FC<Props> = ({
  label,
  title,
  errorText,
  style,
  onBlur,
  onFocus,
  endEnhancer,
  ...restOfProps
}) => {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.title}>{title}</Text>
      <View
        style={[
          styles.inputContainer,
          { borderColor: isFocused ? '#080F9C' : errorText ? '#B00020' : '#B9C4CA' },
        ]}
      >
        <TextInput
          value={restOfProps.value}
          style={styles.input}
          placeholder={label}
          onBlur={(e) => {
            setIsFocused(false)
            if (onBlur) onBlur(e)
          }}
          onFocus={(e) => {
            setIsFocused(true)
            if (onFocus) onFocus(e)
          }}
          {...restOfProps}
        />
        {endEnhancer && <View style={styles.enhancerContainer}>{endEnhancer}</View>}
      </View>
      {!!errorText && <Text style={styles.errorText}>{errorText}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {},
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderRadius: 4,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  enhancerContainer: {},
  title: {
    fontSize: 15,
    paddingBottom: 8,
  },
  errorText: {
    marginTop: 4,
    color: '#B00020',
    fontSize: 12,
  },
})

export default TextField
