import { useState, useEffect } from 'react'
import { useLocation } from 'umi'
import { decode } from '@/utils/qeuryString'

const useQueryParams = () => {
    const [query, setQuery] = useState(null)
    const location = useLocation()

    useEffect(() => {
        let { search } = location;
        let queryParams = decode(search) || {};
        let { page = 1, pagesize = 20, ...filter } = queryParams   
        setQuery({
            skip: (+pagesize) * (+page - 1),
            limit: +pagesize,
            ...filter
        })


    }, [location])

    return query
}

export default useQueryParams