import React from 'react'
import { InputAdornment, TextField } from '@mui/material'
import { debounce } from 'lodash'
import SearchIcon from '@mui/icons-material/Search';

interface SearchProps {
    label: string
    onChange: (keyword: string) => void
}

const Search = ({ label, onChange }: SearchProps) => {
    const performSearch = debounce((keyword: string) => {
        onChange(keyword)
    }, 500)
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        performSearch(e.target.value)
    }
    return (
        <TextField
            sx={{ margin: '1rem 0' }}
            fullWidth
            variant='outlined'
            name='search'
            id='app_search'
            label={label}
            onChange={handleChange}
            slotProps={{
                input: {
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                },
            }}
        />
    )
}

export default Search