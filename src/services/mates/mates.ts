import hosts from "@/config/host"
import Service from '@/config/service_config'

const pahts = {
    mates: '/admin/mates'
}

const content_api = hosts["content_api"]

export class MatesService {
    loadMates(params) {
        return Service.authGet(`${content_api}${pahts.mates}`, params)
    }
}