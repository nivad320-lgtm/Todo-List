class RemoveComplete {
    static removeCompleteTodo(index, array) {
        const spliced = array.splice(index, 1);
        console.log(`Deleted the following...`)
        
        //now spliced is another CreateTodo Object
        console.log(spliced) 
    }
}

export default RemoveComplete