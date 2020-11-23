import { types, Instance } from "mobx-state-tree";
import { SessionState } from './session';
import { SoulsState } from './souls/souls';
import { WalletState } from './wallets/wallet';


export const RootState = types
    .model(
        "rootState", {

        sessionState: types.optional(SessionState, {
            roles: [],
            currentUser: undefined
        }),

        soulsState: types.optional(SoulsState, {
            records: [],
            totalCount: 0
        }),

        walletState: types.optional(WalletState, {
            records: []
        })
    })


    .views(self => ({
        get isAuthenticated() {
            return self.sessionState.currentUser !== undefined;
        }
    }))

export interface IStore extends Instance<typeof RootState> { }