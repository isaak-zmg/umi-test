import { useContext, useEffect } from 'react'
import { MateState } from '@/stores'
import React from 'react'
import useQueryParams from '@/CustomHooks/queryParams'
import Mates from './components/Mates'

export default () => {
    const mateState = useContext(MateState)
    const query = useQueryParams()

    useEffect(() => {
        if(query){
            mateState.loadRecords(query)
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
            <Mates></Mates>
        </div>
    )
}