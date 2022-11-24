import React from "react";
import {
    Box, Paper,
    Table,
    TableBody,
    TableCell, TableContainer,
    TableHead, TablePagination,
    TableRow,
    TableSortLabel,
} from '@mui/material';
import {visuallyHidden} from '@mui/utils';

function createData(ranking, navn, poeng) {
    return {
        ranking,
        navn,
        poeng,
    };
}

function compareDescending(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => compareDescending(a, b, orderBy)
        : (a, b) => -compareDescending(a, b, orderBy);
}


const headers = [
    {
        id: 'ranking',
        numeric: true,
        disablePadding: false,
        label: 'Ranking',
    },
    {
        id: 'navn',
        numeric: false,
        disablePadding: false,
        label: 'Navn',
    },

    {
        id: 'poeng',
        numeric: true,
        disablePadding: false,
        label: 'Poeng',
    },
];


const rows = [
    createData(1, 'Sindre', 2000),
    createData(2, 'test1', 1999),
    createData(3, 'test2', 1998),
    createData(4, 'test3', 1997),
    createData(6, 'test4', 1000),
    createData(7, 'test5', 999),
    createData(8, 'test6', 998),
    createData(9, 'test7', 997),
    createData(10, 'test8', 996),
    createData(11, 'test9', 995),
    createData(12, 'test10', 994),
    createData(13, 'test11', 993),

]

function EnhancedTableHead(props) {
    const {order, orderBy, onRequestSort} =
        props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property)
    };

    return (
        <TableHead>
            <TableRow>
                {headers.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}


export function RankingTable() {
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('ranking');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
        console.log('naa skal det vaere så mange rows per page: ' + event.target.value)
    };


    return (
        <Box sx={{width: '50%'}}>
            <Paper sx={{width: '100%', mb: 2}}>
                <TableContainer>
                    <Table
                        sx={{minWidth: 300}}
                        aria-labelledby="tableTitle"
                        size='medium'
                    >
                        <EnhancedTableHead
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                        />
                        <TableBody>
                            {rows.sort(getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    return (
                                        <TableRow key={index}>
                                            <TableCell
                                                component="th"
                                                id={'ranking'}
                                                scope="row"
                                                padding="normal"
                                            >
                                                {row.ranking}
                                            </TableCell>
                                            <TableCell component="th"
                                                       id={'navn'}
                                                       scope="row"
                                                       padding="normal"
                                                       align="left">
                                                {row.navn}
                                            </TableCell>
                                            <TableCell component="th"
                                                       id={'poeng'}
                                                       scope="row"
                                                       padding="normal"
                                                       align="left">
                                                {row.poeng}
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Box>
    );
}