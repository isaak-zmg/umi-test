import React from 'react';
import { Redirect } from 'umi';
import { StoreProvider } from '@/common/storeProvider';

export default () => {

    return (
        <StoreProvider>
            <Redirect to="/users"></Redirect>
        </StoreProvider>
    );
}
