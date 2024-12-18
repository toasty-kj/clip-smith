import { HStack, Input, Kbd } from '@chakra-ui/react'
import { InputGroup } from '@/components/ui/input-group'
import { LuSearch } from 'react-icons/lu'

export const SearchForm = () => {
  return (
    <HStack gap="10" width="full">
      <InputGroup
        flex="1"
        startElement={<LuSearch />}
        endElement={<Kbd>Ctrl+K</Kbd>}
      >
        <Input placeholder="Search clipboard" />
      </InputGroup>
    </HStack>
  )
}
