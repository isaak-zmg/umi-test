import hosts from '@/config/host'
import Service from '@/config/service_config'

const paths = {
    me: '/users/me'
}

const identity_api = hosts["identity_api"]

class UserService {
    
    me(){
        return Service.authGet(`${identity_api}${paths.me}`,{})
    }
}

export default UserService