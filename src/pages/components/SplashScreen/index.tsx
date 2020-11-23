import * as React from 'react';
import "./style.less"
import {
    LoadingOutlined,
} from '@ant-design/icons';


const SplashScreen = () => {
    return (
        <div style={{ height: "100%", display: "flex" }}>
            <div style={{ margin: "auto auto", textAlign: "center" }}>
                <div style={{ fontSize: 48 }}><LoadingOutlined /></div>
                <div style={{ marginTop: 16 }}>加载中</div>
            </div>
        </div>
    )
}

export default SplashScreen