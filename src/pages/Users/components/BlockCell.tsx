import { observer } from 'mobx-react-lite'
import React, { useState } from 'react'
import { Popconfirm, notification, Switch } from 'antd'





const BlockCell = ({ record }) => {
    const [loading, setLoading] = useState(false)

    const confirm = async () => {
        setLoading(true)
        if (record.has_block) {
            try {
                await record.unBlock()
                notification.success({
                    message: "unblock success"
                })
            } catch (error) {
                notification.error({
                    message: "unblock fail",
                    description: error.message
                })
            } finally {
                setLoading(false)
            }
        } else {
            try {
                await record.block()
                notification.success({
                    message: "block success"
                })
            } catch (error) {
                notification.error({
                    message: "block fail",
                    description: error.message
                })
            } finally {
                setLoading(false)
            }
        }
    }

    return (
        <div>
            <Popconfirm
                title="Are you sure?"
                onConfirm={confirm}
                okText="yes"
                cancelText="no"
            >
                <Switch loading={loading} checked={record.has_block}></Switch>
            </Popconfirm>
        </div>
    )
}

export default observer(BlockCell)