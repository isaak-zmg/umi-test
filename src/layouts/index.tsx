import React, { useState } from 'react'
import { useLocation, Link } from 'umi'
import { Layout, Menu } from 'antd'
import {
    UserOutlined,
} from '@ant-design/icons';
import LayoutHeader from './LayoutHeader';
import useAppInit from '@/CustomHooks/AppInit';
import SplashScreen from '@/pages/components/SplashScreen';
import { observer } from 'mobx-react-lite';


const { Header, Sider, Content } = Layout


const BasicLayout = (props) => {
    const [collapsed, setCollapsed] = useState(false)
    const location = useLocation()
    const isReady = useAppInit()

    if (!isReady) {
        return <SplashScreen></SplashScreen>
    }

    const toggoleCollapsed = () => {
        setCollapsed(!collapsed)
    }

    let defaultSelectedKey = [location.pathname]


    return (
        <Layout
            style={{ height: "100%" }}
        >
            <Sider
                collapsed={collapsed}
                collapsible
                onCollapse={toggoleCollapsed}
                style={{
                    overflow: "auto",
                    //background: "#fff",
                    color: "#fff",
                    boxShadow: "0 0 28px 0 rgba(82,63,105,.08)"
                }}
            >
                <div style={{ height: 68, textAlign: "center", lineHeight: "68px", fontWeight: 600 }}>
                    logo
                </div>

                <Menu
                    mode="inline"
                    theme="dark"
                    defaultSelectedKeys={defaultSelectedKey}
                >
                    <Menu.Item key="/users" icon={<UserOutlined />}>
                        <Link to="/users">Users</Link>
                    </Menu.Item>
                    <Menu.Item key="/mates" icon={<UserOutlined />}>
                        <Link to="/mates">Mates</Link>
                    </Menu.Item>
                </Menu>
            </Sider>

            <Layout>
                <Header style={{ background: "#fff" }}>
                    <LayoutHeader></LayoutHeader>
                </Header>
                <Content style={{ overflow: "auto", background: "#fff" }} id="scroll-container">
                    {props.children}
                </Content>
            </Layout>
        </Layout>
    )
}

export default observer(BasicLayout)