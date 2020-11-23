import React, { useContext } from 'react'
import { Avatar, Divider, Menu, Dropdown } from 'antd'
import { LogoutOutlined, CaretDownOutlined, UserOutlined } from '@ant-design/icons'
import { useStores } from '@/CustomHooks/useStores'



const LayoutHeader = () => {

    const { sessionState } = useStores()

    const logout = () => {
        sessionState.logout()
    }

    const menu = (
        <div style={{
            minWidth: 200,
            marginTop: 12,
            padding: "16px 24px",
            boxShadow: "0 10px 30px 0 rgba(82,63,105,.08)",
            background: "#fff"
        }}>

            <div style={{ display: "flex" }}>
                <div style={{ marginRight: 8 }}>
                    <Avatar shape="square" size={48} style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
                </div>
                <div style={{ fontSize: 20, fontWeight: 600 }}>
                    {sessionState.currentUser ? sessionState.currentUser.nickname : ""}
                </div>
            </div>

            <Divider></Divider>
            <Menu style={{
                border: "none",
            }}
                selectedKeys={[]}
            >
                <Menu.Item>
                    <a onClick={logout}><LogoutOutlined /><span>Logout</span></a>
                </Menu.Item>
            </Menu>
        </div>
    )

    return (
        <div style={{
            display: "flex",
            alignItems: "center",
            background: "#fff",
            height: 64
        }}>
            <div style={{ flex: 1 }}></div>
            <div>
                <Dropdown
                    overlay={menu}
                    trigger={['click']}
                >

                    <div className="login-cell" style={{ display: "flex", alignItems: "baseline" }}>
                        <div style={{ fontSize: 20, fontWeight: 600 }}>{sessionState.currentUser ? sessionState.currentUser.nickname : ""}</div>
                        <div style={{ marginLeft: 4 }}><CaretDownOutlined /></div>
                    </div>

                </Dropdown>
            </div>
        </div>
    )
}

export default LayoutHeader