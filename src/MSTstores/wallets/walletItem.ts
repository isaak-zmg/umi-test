import { types } from 'mobx-state-tree';


export const Balance = types
    .model("balance", {
        balance: types.number,
        currency_code: types.string
    })


export const WalletItemState = types
    .model("walletItemState", {
        id: types.identifier,
        creator_user_id: types.maybeNull(types.string),
        owner: types.model({
            id: types.identifier,
            user_id: types.string,
            type: types.string
        }),
        currency_balances: types.optional(types.array(Balance), [])
    })