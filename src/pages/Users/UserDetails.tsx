import { useStores } from "@/CustomHooks/useStores"
import React, { useEffect, useState } from 'react'
import { useParams } from 'umi'
import { observer } from 'mobx-react-lite'



const UserDetails = () => {

    const { soulsState, walletState } = useStores()
    const params: any = useParams()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        soulsState.loadCurrentRecord(params.id)
        walletState.loadRecords(params.id)
    }, [])

    return (
        <div>details</div>
    )
}

export default observer(UserDetails)