import hosts from "@/config/host"
import Service from '@/config/service_config'



const identity_api = hosts["identity_api"]

export class AccountService {
    loadAccountItem(id) {
        return Service.authGet(`${identity_api}/admin/accounts/${id}`)
    }

    loadAccounts(params) {
        return Service.authGet(`${identity_api}/admin/accounts`, params)
    }

    block(id){
        return Service.authPut(`${identity_api}/admin/accounts/${id}/block`)
    }

    unBlock(id){
        return Service.authPut(`${identity_api}/admin/accounts/${id}/unblock`)
    }
}