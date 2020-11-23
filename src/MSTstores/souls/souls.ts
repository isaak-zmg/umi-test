import { types, flow, Instance } from 'mobx-state-tree'
import { SoulItemState } from './soulImte'
import { UsersService } from '@/services/users/users'


const usersService = new UsersService()

export const SoulsState = types
    .model(
        "soulsState",
        {
            totalCount: types.number,
            records: types.optional(types.array(SoulItemState), []),
            loadingRecords: types.optional(types.boolean, false),
            currentSoul: types.maybe(types.reference(SoulItemState))
        }
    )
    .actions(self => {

        const loadRecords = flow(function* (params) {
            self.loadingRecords = true
            var res = yield usersService.loadUsers(params)
            var result = res.data.result
            self.totalCount = +result.total_count
            self.records = result.items.map(item => SoulItemState.create(item))
            self.loadingRecords = false
        })

        const loadCurrentRecord = flow(function*(id){
            var res = yield usersService.loadUserItem(id)
            self.currentSoul =  SoulItemState.create(res.data.result)
        })

        return {
            loadRecords,
            loadCurrentRecord
        }
    })
    .views(self => ({
        get displayRecords() {
            return self.records.toJSON()
        }
    }))

export interface ISoulsState extends Instance<typeof SoulsState> { }