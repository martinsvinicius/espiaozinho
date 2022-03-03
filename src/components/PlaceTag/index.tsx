import { Tag, TagCloseButton, TagLabel, TagProps } from '@chakra-ui/react'

interface PlaceTagProps extends TagProps {
  place: string
}

export function PlaceTag({ place, ...rest }: PlaceTagProps) {
  return (
    <Tag colorScheme="green" margin="0.5rem" cursor="pointer" {...rest}>
      <TagLabel>{place}</TagLabel>
      <TagCloseButton />
    </Tag>
  )
}
