import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import * as PropTypes from 'prop-types';

const useStyles = makeStyles({
    root: {
        width: '60%',
    },
    tableWrapper: {
        maxHeight: 600,
        overflow: 'auto',
    },
    errorTable: {
        color: 'red',
    },
});

export const SimpleTable = ({ rows, columns, removeAction, error }) => {
    const classes = useStyles();
    return (
        <Fragment>
            <div className={classes.errorTable}>{error.invalid ? error.message : ''}</div>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        {columns.map(column => (
                            <TableCell
                                key={column.id}
                                align={column.align}
                                style={{ minWidth: column.minWidth }}
                            >
                                {column.label}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map(row => (
                        <TableRow key={row.id}>
                            {columns.map((column) => {
                                const value = row[column.id];
                                return (
                                    <TableCell key={column.id} align={column.align}>
                                        {column.format && value ? column.format(value) : value}
                                    </TableCell>
                                );
                            })}
                            <TableCell key="borrar"><div onClick={removeAction(row.id)}>Borrar</div></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Fragment>
    );
};

SimpleTable.propTypes = {
    error: PropTypes.object,
};

SimpleTable.defaultProps = {
    error: {},
};

export const PaginatedTable = ({ items, columns, onSelectRow }) => {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(event.target.value);
        setPage(0);
    };

    const handleRowClick = () => {

    };

    return (
        <Paper className={classes.root}>
            <div className={classes.tableWrapper}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow onClick={handleRowClick}>
                            <TableCell>
                                <Checkbox
                                    checked={false}
                                    inputProps={{ 'aria-labelledby': 'labelId' }}
                                />
                            </TableCell>
                            {columns.map(column => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {items.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => (
                            <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                <TableCell>
                                    <Checkbox
                                        checked={row.selected}
                                        inputProps={{ 'aria-labelledby': 'labelId' }}
                                        onChange={onSelectRow(row.id)}
                                    />
                                </TableCell>
                                {columns.map((column) => {
                                    const value = row[column.id];
                                    return (
                                        <TableCell key={column.id} align={column.align}>
                                            {column.format && value ? column.format(value) : value}
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={items.length}
                rowsPerPage={rowsPerPage}
                page={page}
                backIconButtonProps={{
                    'aria-label': 'previous page',
                }}
                nextIconButtonProps={{
                    'aria-label': 'next page',
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>
    );
};
