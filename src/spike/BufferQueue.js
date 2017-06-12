export default class BufferQueue{
    constructor(length){
        this.pointer = 0;
        this.buffer =[];
        for (var i = 0; i < length; i++) {
            this.buffer.push(0);
        }
        this.length = length;
    }
    get(key){
        if (key < 0){
            return this.buffer[this.pointer+key];
        } else if (key === false){
            return this.buffer[this.pointer - 1];
        } else{
            return this.buffer[key];
        }
    }
    push(item){
      this.buffer[this.pointer] = item;
      this.pointer = (this.pointer + 1) % this.length;
      return item;
    }
    prev(){
        var tmp_pointer = (this.pointer - 1) % this.length;
        this.pointer = tmp_pointer;
        return this.buffer[this.pointer];
    }
    next(){
        this.pointer = (this.pointer + 1) % this.length;
        return this.buffer[this.pointer];
    }
}