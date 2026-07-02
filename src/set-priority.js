class SetPriority {
    #priority;
    // 0 = Low, 1 = Middle, 2 = High
    static returnPriority(param) {
        if (param === 0) {
            this.priority = 'Low';
            return this.priority;
        } else if (param === 1) {
            this.priority = 'Middle';
            return this.priority;
        } else if (param === 2) {
            this.priority = 'High';
            return this.priority;
        }
    }
}

export default SetPriority;