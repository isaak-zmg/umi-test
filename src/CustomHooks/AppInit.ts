import { useState, useContext, useEffect } from "react"
import { useStores } from './useStores'


const useAppInit = () => {
    const [isReady, setIsready] = useState(false)
    const { sessionState } = useStores()

    useEffect(() => {
        if (!sessionState.currentUser) {
            async function loadCurrentUserInfo() {
                await sessionState.getCurrentUser()
                setIsready(true)
            }
            loadCurrentUserInfo()
        }else{
            setIsready(true)
        }
    }, [])

    return isReady
}

export default useAppInit