import { types } from 'mobx-state-tree';



export const Loadable = types
    .model('Loadable', {
        loading: types.optional(types.boolean, false)
    })
    .actions(self => ({
        setLoading(loading: boolean) {
            self.loading = loading;
        }
    }));
