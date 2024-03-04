import React from 'react'
import { StyleSheet, TouchableOpacity, Text, ViewStyle, TextStyle } from 'react-native'

type Props = React.ComponentProps<typeof TouchableOpacity> & {
  title: string
  style?: ViewStyle
  textStyle?: TextStyle
}

const Button: React.FC<Props> = ({ title, style, textStyle, ...restOfProps }) => {
  return (
    <TouchableOpacity style={[styles.container, style]} {...restOfProps}>
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0e20ea',
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    height: 45,
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
})

export default Button
