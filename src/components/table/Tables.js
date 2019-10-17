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
import { DeleteIcon, EditIcon } from '../Icons/Icons';

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

const notNull = value => value !== null && value !== undefined;

export const SimpleTable = ({ rows, columns, error, width, remove, removeAction, edit, editAction }) => {
    const classes = useStyles();
    return (
        <Fragment>
            <div className={classes.errorTable} style={{ width }}>{error.invalid ? error.message : ''}</div>
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
                        {remove && (
                            <TableCell key="borrar">
                                <DeleteIcon opacity=".5" />
                            </TableCell>
                        )}
                        {edit && (
                            <TableCell key="editar">
                                <EditIcon opacity=".5" />
                            </TableCell>
                        )}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map(row => (
                        <TableRow key={row.id}>
                            {columns.map((column) => {
                                const value = row[column.id];
                                return (
                                    <TableCell key={column.id} align={column.align}>
                                        {column.format && notNull(value) ? column.format(value) : value}
                                    </TableCell>
                                );
                            })}
                            {remove && (
                                <TableCell key="borrar">
                                    <DeleteIcon onClick={removeAction(row.id)} />
                                </TableCell>
                            )}
                            {edit && (
                                <TableCell key="editar">
                                    <EditIcon onClick={editAction(row.id)} />
                                </TableCell>
                            )}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Fragment>
    );
};

SimpleTable.propTypes = {
    error: PropTypes.object,
    width: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
    removeAction: PropTypes.func,
    editAction: PropTypes.func,
    remove: PropTypes.bool,
    edit: PropTypes.bool,
};

SimpleTable.defaultProps = {
    error: {},
    width: '60%',
    removeAction: () => {},
    editAction: () => {},
    remove: false,
    edit: false,
};

export const PaginatedTable = ({ items, columns, onSelectRow, width, remove, removeAction, edit, editAction }) => {
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
        <Paper className={classes.root} style={{ width }}>
            <div className={classes.tableWrapper}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow onClick={handleRowClick}>
                            {onSelectRow && (
                                <TableCell>
                                    <Checkbox
                                        checked={false}
                                        inputProps={{ 'aria-labelledby': 'labelId' }}
                                    />
                                </TableCell>
                            )}
                            {columns.map(column => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                            {remove && (
                                <TableCell key="borrar">
                                    <DeleteIcon opacity=".5" />
                                </TableCell>
                            )}
                            {edit && (
                                <TableCell key="editar">
                                    <EditIcon opacity=".5" />
                                </TableCell>
                            )}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {items.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => (
                            <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                {onSelectRow && (
                                    <TableCell>
                                        <Checkbox
                                            checked={row.selected}
                                            inputProps={{ 'aria-labelledby': 'labelId' }}
                                            onChange={onSelectRow(row.id)}
                                        />
                                    </TableCell>
                                )}
                                {columns.map((column) => {
                                    const value = row[column.id];
                                    return (
                                        <TableCell key={column.id} align={column.align}>
                                            {column.format && notNull(value) ? column.format(value) : value}
                                        </TableCell>
                                    );
                                })}
                                {remove && (
                                    <TableCell key="borrar">
                                        <DeleteIcon onClick={removeAction(row.id)} />
                                    </TableCell>
                                )}
                                {edit && (
                                    <TableCell key="editar">
                                        <EditIcon onClick={editAction(row.id)} />
                                    </TableCell>
                                )}
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
PaginatedTable.propTypes = {
    items: PropTypes.array,
    width: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
    removeAction: PropTypes.func,
    editAction: PropTypes.func,
    remove: PropTypes.bool,
    edit: PropTypes.bool,
};

PaginatedTable.defaultProps = {
    items: [],
    width: '60%',
    removeAction: () => {},
    editAction: () => {},
    remove: false,
    edit: false,
};
