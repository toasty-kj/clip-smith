import { HStack, Input } from '@chakra-ui/react'
import { InputGroup } from '@/components/ui/input-group'
import { LuSearch } from 'react-icons/lu'
import { ChangeEvent, forwardRef } from 'react'

export const SearchForm = forwardRef<
  HTMLInputElement,
  {
    setSearchText: (text: string) => void
  }
>((props, ref) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    props.setSearchText(e.target.value)
  }

  return (
    <HStack gap="10" width="full">
      <InputGroup flex="1" startElement={<LuSearch />}>
        <Input
          ref={ref}
          placeholder="Search Clipboard"
          onChange={handleChange}
        />
      </InputGroup>
    </HStack>
  )
})

SearchForm.displayName = 'SearchForm'
