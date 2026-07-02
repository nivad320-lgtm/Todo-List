import SetPriority from "./set-priority.js";
/* 

1. How to Access priority of first todo values -- there must be a better way
console.log(Object.values(project1)[0][0]['priority']);

2. Instead of having a separate class, I could turn this to a new 
prototype function for AssembleTodo.

*/


class ChangePriority {
    static newPriority(todoObj, index, newPriority) {
        const currentPriority = Object.values(todoObj)[0][index]['priority'];
        const nextPriority = SetPriority.returnPriority(newPriority);
        Object.values(todoObj)[0][index]['priority'] = SetPriority.returnPriority(newPriority);
        console.log(`Priority changed from ${currentPriority} --> ${nextPriority} [Todo No.${index}]`)
    }
}

export default ChangePriority;