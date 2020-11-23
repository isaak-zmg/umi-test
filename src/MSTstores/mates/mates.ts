import { types, flow } from 'mobx-state-tree';
import { MateItemState } from './mateItem';
import { MatesService } from '@/services/mates/mates';


const matesService = new MatesService()


export const MatesState = types
    .model("matesState", {
        records: types.optional(types.array(MateItemState), []),
        totalCount: types.number
    })
    .actions(self => {

        const loadRecords = flow(function* (params) {
            var res = yield matesService.loadMates(params)
        })

        return {

        }
    })