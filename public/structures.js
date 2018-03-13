const hashFunc = (value) => {
    let stringValue = "" + value;
    let salt = "REACT";

    let sumSalt = 0;
    for(let i = 0; i < salt.length; i++){
        sumSalt += salt.charCodeAt(i);
    }


    let sum = 0;
    if(typeof value === "object" &&
            value !== null &&
            !Array.isArray(value)
    ){
        for(key in value){
            sum += (hashFunc(key) * sumSalt);
            if(value[key] === value){
                continue;
            }
            sum += hashFunc(value[key]);
        }
    } else {
        for(let i = 0; i < stringValue.length; i++){
            sum += stringValue.charCodeAt(i);
        }
    }

    return sum * sumSalt;
}

let countries = {
    add(contry){
        let lowerContry = contry.toLowerCase();
        this[hashFunc(lowerContry)] = contry;
    },
    getContry(contry){
        let lowerContry = contry.toLowerCase();
        return this[hashFunc(lowerContry)];
    }
}

class Queue{
    constructor(){
        this.functionList = [];
        this.paused = false;
    }

    add(func, ...args){ // 1, 2, 3 -> [1, 2, 3]
        if(typeof func === 'function'){
            this.functionList.push(
                func.bind(this, ...args)
                // [1, 2, 3] -> 1, 2, 3
            );
        }
        return false;
    }

    start(){
        if(!this.paused && this.functionList.length > 0){
            let func = this.functionList.shift();
            setTimeout(() => {
                func()
                this.start();
            }, 0);
        }

    }

    pause(){
        this.paused = !this.paused;
    }

    clear(){
        this.functionList = [];
    }
}
let queue = new Queue();
queue.add(() => {
    console.log(1)
})
queue.add(() => {
    console.log(2)
})
queue.add(() => {
    console.log(3)
})