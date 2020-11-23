import { observer } from "mobx-react-lite";
import React from 'react';
import { useLocation, Redirect } from 'umi';
import AppLoader from '../components/Apploader';
import './style.less'
import { decode } from '../../utils/qeuryString';
import { LoginForm } from './components/LoginForm';
import { useStores } from '@/CustomHooks/useStores';


const Login = () => {
    const {sessionState, isAuthenticated} = useStores()
    const location = useLocation()

    const handleSubmit = async (values) => {
        var loader = AppLoader.show()

        try {
            await sessionState.login(values.username, values.password)
        } catch (error) {
            console.log(error)
        } finally {
            loader.close()
        }
    }

    var { search } = location
    const queryParams = decode(search) || {}
    const next = queryParams.next || "/"

    if (isAuthenticated) {
        return <Redirect to={next}></Redirect>
    }

    return (
        <div className="login-container">
            <div className="login-page">
                <div className="login-logo">
                    logo
                    </div>

                <div>
                    <LoginForm onSubmit={handleSubmit} />
                </div>

            </div>
        </div>
    )
}

export default observer(Login)