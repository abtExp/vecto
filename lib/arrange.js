/* a method to arrange or create a Vector from the given elements */

module.exports = function arrange(elems_arr,shape) {
    let base_arr = elems_arr ? elems_arr : core.fill(Math.floor(this.size),"linear"),
    curr_arr = [];
    for(let i=shape.length - 1; i > 0; i--){
        let size = shape[i],no=i>1 ? shape[i-1]*shape[i-2] : shape[i-1];
        curr_arr = core.form_chunks(size,no,base_arr);
        base_arr = curr_arr;
    }
    return base_arr;
}