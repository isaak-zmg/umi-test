import { types } from 'mobx-state-tree';

export const TodoItemState = types
    .model("todoItemState", {
        id: types.identifier,
        title: types.string,
        isCompleted: types.boolean
    })
    .actions(self => {

        const setTitle = (text) => {
            self.title = text
        }

        const updateStatus = (status) =>{
            self.isCompleted = status
        }

        return {
            setTitle,
            updateStatus,
        }
    })