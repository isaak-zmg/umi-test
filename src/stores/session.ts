import UserService from '@/services/user'
import { createContext } from 'react'
import SessionService from '@/services/session'
import { observable } from 'mobx'



class SessionState {

    sessionService
    userService

    constructor(){
        this.sessionService = new SessionService()
        this.userService = new UserService()
    }

    @observable isAuthenticated = false

    roles = []
    user = null

    async login(username,password){
        await this.sessionService.login(username,password)
        var res = await this.userService.me()
        this.roles = res.data.result.roles
        this.user = res.data.result

        this.isAuthenticated = true
    }

    async getCurrentUserInfo(){
        var res = await this.userService.me()
        this.user = res.data.result
        this.roles = res.data.result.roles
        this.isAuthenticated = true
    }

    logout(){
        this.sessionService.logout()
        this.roles = []
        this.user = null;
        this.isAuthenticated = false;
    }

}

export default createContext(new SessionState())