import { useLocation, history } from 'umi'
import { decode, encode } from '@/utils/qeuryString';
import { useEffect } from 'react';

const useUrl = () => {
    const location = useLocation()


    const setUrl = (values) => {
        var keys: any = []
        for (var key in values) {
            if (!values[key]) {
                keys.push(key)
            }
        }
        if (keys.length != 0) {
            handleSearch(values, keys)
        } else {
            handleSearch(values)
        }
    }

    const handleSearch = (query, removeKeys?) => {
        var last_query = decode(location.search) || {};
        var new_query = { ...last_query, ...query };
        if (removeKeys) {
            for (var key of removeKeys) {
                delete new_query[key];
            }
        }
        history.push(`${location.pathname}?${encode(new_query)}`)
    }

    return setUrl
}

export default useUrl