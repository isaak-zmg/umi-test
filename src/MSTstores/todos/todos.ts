import { types, destroy } from 'mobx-state-tree';
import { TodoItemState } from './todoItem';

export const TodosState = types
.model("todosState",{
    todos: types.array(TodoItemState),
    filter: types.string
})
.views(self=>({
    get displayTodos(){
        switch(self.filter){
            case "Completed":
                return self.todos.filter(item => item.isCompleted)
            case "Uncompleted":
                return self.todos.filter(item => !item.isCompleted)
            default:
                return self.todos
        }
    },

    get status(){
        const totalCount = self.todos.length
        const CompoletedCount = self.todos.filter(item => item.isCompleted).length
        const UncompletedCount = totalCount - CompoletedCount
        var temp = ((CompoletedCount / totalCount) * 100).toFixed(2)
        const CompletedPercent = totalCount === 0 ? 0 : +temp

        return {
            totalCount,
            CompoletedCount,
            UncompletedCount,
            CompletedPercent
        }
    }
}))
.actions(self => {

    const addTodo = (item) =>{
        self.todos.push(TodoItemState.create(item))
    }

    const deleteTodo = (item) =>{
        destroy(item)
    }

    const filterChange = (filter) =>{
        self.filter = filter
    }

    return {
        addTodo,
        deleteTodo,
        filterChange
    }
})