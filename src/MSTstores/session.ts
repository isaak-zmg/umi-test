import { types, flow } from "mobx-state-tree"
import UserService from '@/services/user'
import SessionService from '@/services/session'



const userService = new UserService()
const sessionService = new SessionService()


export const User = types.model(
    "User",
    {
        nickname: types.string
    }
)

export const SessionState = types
    .model("sessionState",
        {
            roles: types.array(types.string),
            currentUser: types.maybe(User),
        })
    .actions(self => {

        const login = flow(function* (username: string, password: string) {
            yield sessionService.login(username, password);
            var res = yield userService.me()
            if (res) {
                self.currentUser = res.data.result
                self.roles = res.data.result.roles
            }
        });

        const getCurrentUser = flow(function* () {
            var res = yield userService.me()
            if (res) {
                self.currentUser = res.data.result
                self.roles = res.data.result.roles
            }
        })

        const logout = () => {
            self.currentUser = undefined
            self.roles.clear()
        }

        return {
            login,
            getCurrentUser,
            logout
        }
    })