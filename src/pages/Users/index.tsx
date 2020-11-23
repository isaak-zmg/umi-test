import React, { useContext, useEffect } from 'react'
import useQueryParams from '@/CustomHooks/queryParams'
import { useStores } from '@/CustomHooks/useStores'
import UserLists from './components/UserLists'





export default () => {
    const { soulsState } = useStores()
    const query = useQueryParams()


    useEffect(() => {
        if (query) {
            soulsState.loadRecords(query)
        }
    }, [query])


    return (
        <div
            style={{
                height: "100%",
                background: "#fff",
                padding: 48
            }}
        >
            <UserLists></UserLists>
        </div>
    )
}