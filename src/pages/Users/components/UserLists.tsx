import React from 'react'
import { Table } from 'antd'
import { observer } from 'mobx-react-lite'
import usePagination from '@/CustomHooks/pagination'
import { useStores } from '@/CustomHooks/useStores'
import useUrl from '@/CustomHooks/useUrl'
import BlockCell from './BlockCell'
import { Link } from 'umi'



const UserLists = (props: any) => {
    const { soulsState } = useStores()
    const pagination = usePagination()
    const setUrl = useUrl()

    const columns: any = [
        {
            title: "nickname",
            dataIndex: "nickname",
            key: "nickname",
            render: (text, record) => <Link to={`/users/${record.id}`}>{text}</Link>
        },
        {
            title: "birthday",
            dataIndex: "displayBirthday"
        },
        {
            title: "comment stat",
            dataIndex: "commentCount",
            key: "CommentStatistics.Count",
            sorter: true,
            sortDirections: ["descend", "ascend"],
        },
        {
            title: "block",
            render: record => <BlockCell record={record}></BlockCell>
        }
    ]

    pagination.total = soulsState.totalCount

    const handleTableChange = (pagination, filters, sorter) => {

        if (!sorter.order) {
            setUrl({ page: pagination.current, pagesize: pagination.pageSize, sorting: "CreationTime desc" })
        } else {
            setUrl(
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
                dataSource={soulsState.displayRecords}
                columns={columns}
                pagination={pagination}
                loading={soulsState.loadingRecords}
                onChange={handleTableChange}
                rowKey={item => item["id"]}
            ></Table>
        </div>
    )
}

export default observer(UserLists)