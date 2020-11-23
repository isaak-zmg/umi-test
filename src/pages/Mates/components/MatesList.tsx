import { observer } from "mobx-react-lite";
import React, { useContext } from 'react';
import { MateState } from '@/stores';
import usePagination from '@/CustomHooks/pagination';
import { Table } from 'antd';



const MateLists = observer((props: any) => {
    const mateState = useContext(MateState)
    const pagination = usePagination()

    const columns: any = [
        {
            title: "id",
            dataIndex: "id",
            key: "id"
        },
        {
            title: "about",
            dataIndex: "about"
        }
    ]

    pagination.total = mateState.totalCount

    const handleTableChange = (pagination, filters, sorter) => {

        if (!sorter.order) {
            props.onChange({ page: pagination.current, pagesize: pagination.pageSize, sorting: "CreationTime desc" })
        } else {
            props.onChange(
                {
                    page: pagination.current,
                    pagesize: pagination.pageSize,
                    sorting: `${sorter.columnKey} ${sorter.order == "descend" ? "desc" : "asc"}`
                }
            )
        }
    }

    return (
        <div>
            <Table
                dataSource={mateState.records}
                columns={columns}
                pagination={pagination}
                loading={mateState.loadingRecordsStatus}
                onChange={handleTableChange}
                rowKey={item => item["id"]}
            ></Table>
        </div>
    )
})

export default MateLists