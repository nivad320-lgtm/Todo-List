class RemoveComplete {
    static removeCompleteTodo(index, array) {
        const spliced = array.splice(index, 1);
        console.log(`${spliced} is deleted!`)
        return spliced
    }
}

export default RemoveComplete