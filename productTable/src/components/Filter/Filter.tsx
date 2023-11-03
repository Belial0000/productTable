import { useAppDispatch, useAppSelector } from '../../hook';
import { setSelectedCategory } from '../../store/productsSlice';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { Box } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';

function Filter() {
    const dispatch = useAppDispatch();

    const handleCategoryChange = (event: SelectChangeEvent) => {
        const selectedCategory = event.target.value as string;
        dispatch(setSelectedCategory(selectedCategory));
    };
    const selectedCategory = useAppSelector(
        (state) => state.products.selectedCategory
    );

    return (
        <Box
            component='form'
            sx={{
                '& > :not(style)': { m: 1, width: '40ch' },
                display: 'flex',
                justifyContent: 'center',
            }}
            noValidate
            autoComplete='off'
        >
            <FormControl fullWidth>
                <InputLabel id='demo-simple-select-label'>Category</InputLabel>
                <Select
                    labelId='demo-simple-select-label'
                    id='demo-simple-select'
                    value={selectedCategory || ''}
                    label='Category'
                    onChange={handleCategoryChange}
                    MenuProps={MenuProps}
                >
                    <MenuItem value={'Food'}>Food</MenuItem>
                    <MenuItem value={'Weapon'}>Weapon</MenuItem>
                    <MenuItem value={'Cigarette'}>Cigarette</MenuItem>
                    <MenuItem value={'Animals'}>Animals</MenuItem>
                    <MenuItem value={'Kitchen'}>Kitchen</MenuItem>
                    <MenuItem value={'Sports'}>Sports</MenuItem>
                    <MenuItem value={'Electronics'}>Electronics</MenuItem>
                    <MenuItem value={'Furniture'}>Furniture</MenuItem>
                    <MenuItem value={'Clothing'}>Clothing</MenuItem>
                    <MenuItem value={'Beauty'}>Beauty</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}

export default Filter;

const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: 48 * 4.5 + 8,
            backgroundColor: '#9c27b0',
            width: 250,
        },
        sx: {
            '& .MuiMenu-paper': {
                backgroundColor: 'blue',
                color: 'white',
            },
            '& .MuiMenuItem-root:hover': {
                backgroundColor: 'rgba(206, 12, 43)',
                color: 'white',
            },
            '& .Mui-selected': {
                backgroundColor: 'rgb(244 0 39 / 69%) !important',
                color: '#fff900',
            },
        },
    },
};
