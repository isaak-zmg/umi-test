import { types, Instance, flow } from "mobx-state-tree"
import { AccountService } from '@/services/account/account'
import { Batch_account } from '@/services/batchRequest/account'
import moment from 'moment'
import { WalletState } from '../wallets/wallet'


const accountService = new AccountService()
const batchAccount = new Batch_account()

export const SoulItemState = types
    .model("soulItemState", {
        id: types.identifier,
        user_id: types.string,
        nickname: types.string,
        birthday: types.string,
        gender: types.string,
        comment_statistics: types.maybeNull(types.model({
            count: types.union(types.number, types.string)
        })),
        has_block: types.optional(types.boolean, false),
    })
    .views(self => ({
        get commentCount() {
            return +(self.comment_statistics?.count || 0)
        },
        get displayBirthday() {
            return moment(self.birthday).format("YYYY-MM-DD")
        }
    }))
    .actions(self => {
        const afterCreate = flow(function* () {
            var result = yield batchAccount.getData(self.user_id)
            self.has_block = result.has_blocked
        })

        const block = flow(function* () {
            try {
                yield accountService.block(self.user_id)
                self.has_block = true
            } catch (error) {
                throw error
            }
        })

        const unBlock = flow(function* () {
            try {
                yield accountService.unBlock(self.user_id)
                self.has_block = false
            } catch (error) {
                throw error
            }
        })

        return { afterCreate, block, unBlock }
    })



export interface ISoulItemState extends Instance<typeof SoulItemState> { }
