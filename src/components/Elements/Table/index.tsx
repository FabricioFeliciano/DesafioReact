//"use client"
import React, { useEffect, useState } from 'react';

import './index.scss';

import IconLink from '../IconLink';

//Campos do Filtro
interface FilterField {
    label: string,
    name: string,
    type: string,
    value?: string | any,
    options?: any[],
    show?: boolean,
    min?: number,
    max?: number,
}

//Objeto do Filtro
interface FilterData {
    fields: FilterField[],
    onChange: Function,
    visible?: boolean,
}

interface Sort {
    column: string,
    direction: string
}

interface TableProps {
    rows: object[],
    columns: {
        field: string
        header: string
        width: string
        sort?: boolean
        hide?: boolean
        align?: string
        render?: Function
    }[],
    density?: "high" | "medium" | "low",

    functions?: {
        label: string,
        func: Function,
        icon: string,
        disabled?: Function,
        hidden?: Function
    }[],
    height?: string,
    fontSize?: 'tiny' | 'small' | 'medium' | 'large' | 'big',
    onSortChange?: Function,
    onSelectChange?: Function,
    filter?: FilterData,
    status?: Function,
    rowAutoHeight?: boolean,
}

const Table = (props: TableProps) => {

    const [clientHeight, setClientHeight] = useState(0);

    const [selectedRows, setSelectedRows] = useState<object[]>([]);

    const [sort, setSort] = useState<Sort>();

    const [mouseOnRow, setMouseOnRow] = useState<number | undefined>(undefined);

    const [headerHeight, setHeaderHeight] = useState(0);
    const [bodyHeight, setBodyHeight] = useState(0);

    useEffect(() => {
        let defaultRowHeight =
            props.density === "low" ? 64 : //60 de altura + 4 de espaço
                props.density === "medium" ? 42 : //38 de altura + 4 de espaço
                    29; //28 de altura + 1 de espaço

        if (bodyHeight > 0) {
            let rows = Math.floor((bodyHeight) / defaultRowHeight);
            setClientHeight(rows)
        }
    }, [headerHeight, bodyHeight])

    const handleSort = (column: string) => {
        !sort || sort.column !== column ?
            setSort({ column, direction: 'asc' })
            :
            setSort({ ...sort, direction: sort.direction === 'asc' ? 'desc' : 'asc' })
    }

    useEffect(() => {
        if (props.onSortChange && sort) {
            props.onSortChange({ sort, size: clientHeight });
        }
    }, [sort])

    useEffect(() => {
        props.onSelectChange &&
            props.onSelectChange(selectedRows);
    }, [selectedRows])

    const getStatusRow = (status: string) => {
        switch (status) {
            case 'primary':
                return '#141b4d';
            case 'secondary':
                return '#1b3a7a';
            case 'danger':
                return '#e64646';
            case 'success':
                return '#a5bf3e';
            case 'warning':
                return '#ffb800';
            case 'link':
                return '#0580ce';
            default:
                return status;
        }
    }

    return (
        <div className="table" style={{ height: props.height || '100%' }}>

            <div className="header" ref={(ref: any) => { ref && setHeaderHeight(ref.clientHeight) }}>

                <div className="cells">
                    {
                        props.columns.map((c, i: number) => {
                            return !c.hide && (
                                <div
                                    key={i}
                                    className={`cell ${props.onSortChange && c.sort !== false ? 'sortable' : ''} ${sort?.column === c.field ? 'text-link' : ''} ${c.align || ''} ${c.width || ''}`}
                                    onClick={() => { c.sort !== false && props.onSortChange && handleSort(c.field) }}
                                >
                                    <span>{c.header}</span>
                                    &nbsp;
                                    {
                                        c.header && sort && sort.column === c.field &&
                                        <i className={`icon icon-arrow-${sort.direction === 'asc' ? 'down' : 'up'}`} />
                                    }
                                </div>
                            )
                        })
                    }

                </div>
                <div className="scroll"></div>
            </div>

            <div className={`body density-${props.density || "high"}`}
                style={{ height: `calc(100% - ${headerHeight}px)` }}
                ref={(ref: any) => { ref && setBodyHeight(ref.clientHeight) }}
            >
                {
                    props.rows && props.rows.length > 0 &&
                    props.rows.map((row: any, iRow: number) => {
                        return (
                            <div
                                key={iRow}
                                className={`row${props.rowAutoHeight ? ' autoHeight' : ''}${props.status ? " status" : ""}`}
                                style={{ borderLeftColor: props.status && `${getStatusRow(props.status(row))}` }}
                            >
                                <div className="cells">
                                    {
                                        props.columns.map((col: any, iCol: number) => {

                                            return !col.hide && (
                                                <div key={iCol}
                                                    className={`cell ${col.fontSize || props.fontSize || ''} ${col.align || ""} ${col.width || ''}`}
                                                    style={{
                                                        visibility: (col.showOnHover && mouseOnRow !== iRow) ? 'hidden' : 'visible',
                                                        overflow: col.overflow
                                                    }}>
                                                    {
                                                        !col.render ?
                                                            <>
                                                                {row[col.field]}
                                                            </>
                                                            :
                                                            col.render(row)
                                                    }
                                                </div>
                                            )
                                        })
                                    }
                                </div>

                                {props.functions &&
                                    <div className='functions'>
                                        <div className="body flex pv-2" >
                                            {
                                                props.functions.map((f, i) => {
                                                    if (!f.hidden || !f.hidden(row)) {
                                                        let disabled = (f.disabled && f.disabled(row)) || false;
                                                        return <IconLink
                                                            size='small'
                                                            icon={f.icon}
                                                            key={i}
                                                            onClick={() => { !disabled && f.func(row) }}
                                                            tooltip={{ content: f.label, position: 'right' }}
                                                        />
                                                    }
                                                })
                                            }
                                        </div>
                                    </div>
                                }

                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}

export default Table;