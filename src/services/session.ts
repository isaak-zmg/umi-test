import hosts from '@/config/host'
import Service from '@/config/service_config'
import { saveToken, destroyToken } from '@/config/auth_config'


const paths = {
    login: '/connect/token'
}

const identity_api = hosts["identity_api"]

class SessionService {
    async login(username, password) {
        var res = await Service.post(`/identity-api${paths.login}`, {
            grant_type: "password",
            username,
            password,
        },
            { Authorization: 'Basic cmVzb3VyY2Vvd25lcjpzb3VubWF0ZQ==' }
        )

        saveToken(res.data.access_token)
    }

    logout() {
        destroyToken()
    }
}

export default SessionService