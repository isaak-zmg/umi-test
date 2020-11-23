import React from 'react'
import { useLocation, history } from 'umi'
import { decode, encode } from '@/utils/qeuryString'
import MateLists from './MatesList'

const Mates = () => {
    const location = useLocation()

    const handleSearch = (query, removeKeys?) => {
        var last_query = decode(location.search) || {};

        var new_query = { ...last_query, ...query };
        if (removeKeys) {
            for (var key of removeKeys) {
                delete new_query[key];
            }
        }
        history.push(`/mates?${encode(new_query)}`)
    }

    const queryChange = (value) => {
        var keys = []
        for (var key in value) {
            if (!value[key]) {
                keys.push(key)
            }
        }
        if (keys.length != 0) {
            handleSearch(value, keys)
        } else {
            handleSearch(value)
        }
    }

    return (
        <div>
            <MateLists onChange={queryChange} ></MateLists>
        </div>
    )
}

export default Mates