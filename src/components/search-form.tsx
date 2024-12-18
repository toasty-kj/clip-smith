import { HStack, Input, Kbd } from '@chakra-ui/react'
import { InputGroup } from '@/components/ui/input-group'
import { LuSearch } from 'react-icons/lu'
import { forwardRef } from 'react'

export const SearchForm = forwardRef<HTMLInputElement>((props, ref) => {
  return (
    <HStack gap="10" width="full">
      <InputGroup flex="1" startElement={<LuSearch />}>
        <Input ref={ref} placeholder="Search contacts" />
      </InputGroup>
    </HStack>
  )
})

SearchForm.displayName = 'SearchForm'
