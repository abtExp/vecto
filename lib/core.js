const arrange  = require('./arrange');
const calc_shape= require('./calc_shape');
const calc_size = require('./calc_size');
const clip = require('./clip');
const fill = require('./fill');
const find_dim = require('./find_dim');
const flatten  = require('./flatten');
const form_arr = require('./form_arr');
const form_chunks = require('./form_chunks');
const transpose = require('./transpose');


module.exports = {
    arrange : arrange,
    calc_shape:calc_shape,
    calc_size : calc_size,
    clip : clip,
    fill : fill,
    find_dim : find_dim,
    flatten : flatten,
    form_arr : form_arr,
    form_chunks : form_chunks,
    transpose : transpose
}