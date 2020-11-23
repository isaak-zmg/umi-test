import hosts from "@/config/host";
import Service from '@/config/service_config'


const member_api = hosts["member_api"]


class WalletService {
    loadWallets(params){
        return Service.authGet(`${member_api}/admin/wallets`,params)
    }
}

export default WalletService