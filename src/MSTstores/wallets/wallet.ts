import WalletService from "@/services/wallet/wallet";
import { types, flow } from 'mobx-state-tree';
import { WalletItemState } from './walletItem';



const walletService = new WalletService()





export const WalletState = types
    .model("walletState", {
        records: types.optional(types.array(WalletItemState), [])
    })
    .actions(self => {

        const loadRecords = flow(function* (owner_id) {
            var res = yield walletService.loadWallets({ owner_ids: owner_id })
            self.records = res.data.result.items.map(item => WalletItemState.create(item))
        })

        return { loadRecords }
    })