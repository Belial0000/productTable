import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hook';
import { fetchProducts, filterByName } from '../../store/productsSlice';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TablePagination } from '@mui/base/TablePagination';
import { Button, LinearProgress, TableFooter } from '@mui/material';

function List() {
    const dispatch = useAppDispatch();
    const loadingData = useAppSelector((state) => state.products.loading);
    const productsData = useAppSelector((state) => state.products.products);
    const filtredData = useAppSelector(
        (state) => state.products.filteredProducts
    );
    const selectedCategory = useAppSelector(
        (state) => state.products.selectedCategory
    );
    const filterState = useAppSelector((state) => state.products.filterByName);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const emptyRows =
        page > 0
            ? Math.max(0, (1 + page) * rowsPerPage - productsData.length)
            : 0;

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number
    ) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const data = selectedCategory ? filtredData : productsData;
    console.log(productsData);
    console.log(data);

    return (
        <>
            {loadingData && <LinearProgress color='secondary' />}
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                    <TableHead>
                        <TableRow
                            sx={{
                                '& th': {
                                    fontSize: '1rem',
                                    color: 'white',
                                    backgroundColor: '#9c27b0',
                                },
                            }}
                        >
                            <TableCell>
                                <Button
                                    style={{ width: '10px' }}
                                    variant='contained'
                                    color='secondary'
                                    onClick={() =>
                                        dispatch(filterByName(!filterState))
                                    }
                                >
                                    name
                                    {filterState ? (
                                        <p>&uarr;</p>
                                    ) : (
                                        <p>&darr;</p>
                                    )}{' '}
                                </Button>
                            </TableCell>
                            <TableCell align='right'>price</TableCell>
                            <TableCell align='right' style={{ width: '150px' }}>
                                category
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                            ? data.slice(
                                  page * rowsPerPage,
                                  page * rowsPerPage + rowsPerPage
                              )
                            : data
                        ).map((row) => (
                            <TableRow key={row.name}>
                                <TableCell
                                    style={{ width: 160 }}
                                    component='th'
                                    scope='row'
                                >
                                    {row.name}
                                </TableCell>
                                <TableCell style={{ width: 160 }} align='right'>
                                    {row.price}
                                </TableCell>
                                <TableCell style={{ width: 160 }} align='right'>
                                    {row.category}
                                </TableCell>
                            </TableRow>
                        ))}
                        {emptyRows > 0 && (
                            <TableRow style={{ height: 52 * emptyRows }}>
                                <TableCell
                                    style={{ width: 160 }}
                                    align='right'
                                />
                            </TableRow>
                        )}
                    </TableBody>
                    <TableFooter>
                        <TableRow
                            sx={{
                                '& td': {
                                    padding: '10px',
                                },
                            }}
                        >
                            <TablePagination
                                rowsPerPageOptions={[
                                    5,
                                    10,
                                    25,
                                    { label: 'All', value: -1 },
                                ]}
                                colSpan={3}
                                count={data.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                slotProps={{
                                    select: {
                                        'aria-label': 'rows per page',
                                    },
                                    actions: {
                                        showFirstButton: true,
                                        showLastButton: true,
                                    },
                                }}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </>
    );
}

export default List;
