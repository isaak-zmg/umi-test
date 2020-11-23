import { useLocation } from 'umi'
import { decode } from '@/utils/qeuryString';
import { useState, useEffect } from 'react';


const usePagination = () => {
    const location = useLocation()
    const [currentPage,setCurrentPage] = useState(1)
    const [pagesize, setPagesize] = useState(20)

    let { search } = location;
    let queryParams = decode(search) || { page: 1 };
    
    useEffect(()=>{
        setCurrentPage(+queryParams.page || 1)
    },[location])

    useEffect(()=>{
        setPagesize(+queryParams.pagesize || 20)
    },[location])

    const changTotalCount = (totalCount) =>{
        pagination.total = +totalCount
    }


    let pagination = {
        current: currentPage,
        pageSize: pagesize,
        total: 0,
        pageSizeOptions: ['20', '50', '100'],
        showSizeChanger: true
    }

    return pagination


}

export default usePagination