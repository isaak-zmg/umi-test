import React from 'react';
import { Redirect } from 'umi';
import { observer } from 'mobx-react-lite';
import { useStores } from '@/CustomHooks/useStores';


export default observer((props) => {
    const { isAuthenticated } = useStores()

    if (isAuthenticated) {
        return <div>{props.children}</div>;
    } else {
        return <Redirect to="/login" />;
    }
})