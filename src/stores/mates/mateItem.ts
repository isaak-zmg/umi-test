export class MateItemState {

    commentCount

    constructor(item) {
        for (const key in item) {
            this[key] = item[key]
        }

        this.commentCount = item.comment_statistics ? +item.comment_statistics.count : 0
    }
}