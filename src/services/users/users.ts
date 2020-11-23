
import hosts from '@/config/host'
import Service from '@/config/service_config'


const paths = {
    users: '/admin/souls'
}

const content_api = hosts["content_api"]


export class UsersService {
    loadUsers(params) {
        return Service.authGet(`${content_api}${paths.users}`, params)
    }

    loadUserItem(id) {
        return Service.authGet(`${content_api}/admin/souls/${id}`)
    }
}