import React, { useState } from 'react'
import { useFilters, useTable, usePagination } from 'react-table'
import '../App.css'

export default function Table({ columns, data }) {
    const [filterInput, setFilterInput] = useState("");
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        gotoPage,
        pageCount,
        state,
        prepareRow,
        setFilter
    } = useTable({
        columns,
        data,
        initialState: { pageSize: 20 }
    },
    useFilters,
    usePagination
    );

    const { pageIndex } = state;

    const handleFilterChange = e => {
        const value = e.target.value || undefined;
        setFilter("FirstName", value);
        setFilterInput(value);
    };

    return (
        <>
            <div className='search'>Search: {' '}
                <input value={filterInput} onChange={handleFilterChange} placeholder='Search First Name' />
            </div>
            <div className='container'>
                <table {...getTableProps()} className='table'>
                    <thead>
                        {headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map(column => (
                                    <th {...column.getHeaderProps()}>{column.render("Header")}
                                        <div>{column.canFilter ? column.render('Filter') : null}</div>
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {page.map((row, i) => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map(cell => {
                                        return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <div className='footer'>
                <span>
                    Page{' '}
                    <strong>
                        {pageIndex + 1} of {pageOptions.length}
                    </strong>{' '}
                </span>
                <span>
                    | Go to page: {' '}
                    <input type='number' defaultValue={pageIndex + 1} onChange={e => {
                        const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0
                        gotoPage(pageNumber)
                    }} style={{width: '30px'}} />
                </span>
                <button onClick={() => gotoPage(0)} disabled={!canPreviousPage} className='btn'>{'<<'}</button>
                <button onClick={() => previousPage()} disabled={!canPreviousPage} className='btn'>Previous</button>
                <button onClick={() => nextPage()} disabled={!canNextPage} className='btn'>Next</button>
                <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage} className='btn'>{'>>'}</button>
            </div>
        </>
        );
}