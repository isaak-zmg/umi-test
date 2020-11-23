import { MatesService } from "@/services/mates/mates";
import { observable } from 'mobx';
import { MateItemState } from './mateItem';
import { createContext } from 'react';

class MateState {

    matesService: MatesService

    constructor() {
        this.matesService = new MatesService()
    }

    records = []
    totalCount = 0
    @observable loadingRecordsStatus = true
    loadRecords = async (params) => {
        this.loadingRecordsStatus = true
        var res = await this.matesService.loadMates(params)
        this.records = res.data.result.items.map(item => new MateItemState(item))
        this.totalCount = +res.data.result.total_count
        this.loadingRecordsStatus = false
    }

}

export default createContext(new MateState())