function my_function(data, result){
    str = "f5 is done!";
    result = data.concat(str);

    return result;
}

module.exports.my_function = my_function;