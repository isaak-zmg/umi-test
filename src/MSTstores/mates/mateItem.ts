import { types } from 'mobx-state-tree';

export const MateItemState = types
    .model("mateItemState",{
        about: types.string,
        id: types.identifier,
        user_id: types.string
    })