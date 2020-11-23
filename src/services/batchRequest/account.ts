import { AccountService } from '../account/account';



export class Batch_account {
    accountService: AccountService

    constructor() {
        this.accountService = new AccountService()
    }


    request_token: { [key: string]: { resolve, reject } } = {};

    //请求延迟时间
    _timer;

    //请求缓存,防止重复请求
    request_cache = {};
    data_cached_ = {};
    queue = [];

    removeReqCache(account) {
        delete this.request_cache[account];
    }

    //请求sdk获取用户信息
    async getByIds(ids: string[]) {
        try {
            //TODO:通过react桥获取用户资料
            var res = await this.accountService.loadAccounts({
                Ids: ids.join(','),
                skip: 0,
                limit: ids.length
            });
            var { items } = res.data.result;
            for (var item of items) {
                var token = this.request_token[item.id];
                token.resolve(item);
                delete this.request_token[item.id];
            }

            for (var temp of ids) {
                var fail_token = this.request_token[temp];
                if (fail_token) {
                    fail_token.resolve(null);
                    delete this.request_token[temp];
                }
            }
        } catch (ex) {
            for (var id of ids) {
                var token = this.request_token[id];
                token.reject({ code: 0, msg: ex.message });
                delete this.request_token[id];
                this.removeReqCache(id);
            }
        }
    }

    exec(){
        if(this.queue.length==0){
            return;
        }
        clearTimeout(this._timer);
        this._timer = setTimeout(() => {
            var ids = this.queue.splice(0, 100);
            this.getByIds(ids);
            this.exec();
        }, 300);
    }


    //排队获取用户信息
    queueGet = async (id) => {
        clearTimeout(this._timer);
        this.queue.push(id);
        this.exec();
    }

    //获取用户信息Promise化
    getAsync = async (id) => {
        return new Promise((resolve, reject) => {
            this.request_token[id] = { resolve, reject }
            this.queueGet(id);
        });
    }

    get(id): Promise<any> {
        if (!this.request_cache[id]) {
            this.request_cache[id] = this.getAsync(id);
        }
        return this.request_cache[id];
    }

    async  getData(id) {
        if (!this.data_cached_[id]) {
            this.data_cached_[id] = await this.get(id)
        }
        return this.data_cached_[id];
    }
}