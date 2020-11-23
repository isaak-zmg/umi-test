import { createContext } from 'react';
import { UsersService } from '@/services/users/users';
import { UserItemState } from './userItem';
import { observable } from 'mobx';


class UserState {

    usersService: UsersService

    constructor() {
        this.usersService = new UsersService()
    }


    records = []
    totalCount = 0
    @observable loadingRecordsStatus = true
    loadRecords = async (params) => {
        this.loadingRecordsStatus = true
        var res = await this.usersService.loadUsers(params)
        this.records = res.data.result.items.map(item => new UserItemState(item))
        this.totalCount = +res.data.result.total_count
        this.loadingRecordsStatus = false
    }
}

export default createContext(new UserState())