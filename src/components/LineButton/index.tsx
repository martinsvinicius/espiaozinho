import { Text, TextProps } from '@chakra-ui/react'

interface LineButtonProps extends TextProps {
  text: string
}

export function LineButton({ text, ...rest }: LineButtonProps) {
  return (
    <Text
      as="button"
      fontSize={18}
      color="purple.50"
      fontWeight="bold"
      decoration="underline"
      transition="all 0.3s"
      _hover={{
        cursor: 'pointer',
        filter: 'brightness(110%)',
      }}
      {...rest}
    >
      {text}
    </Text>
  )
}
