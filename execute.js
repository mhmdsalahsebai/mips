const reg = require('./register');
const helper = require('./helper');
let register = reg.register;

const address = new Map();

module.exports = {
    execute: function(inst, line) {
        if(helper.isItSupportedInstruction(inst)) {
            return Execute[`${inst[0]}`](inst, line);
        } else if(inst[0].includes(':')) { // use this
            return Execute['label'](inst, line);
        } else {
            return [line, false];
        }
    },
}

const Execute = {
    label: function (tokens, line) {
        address.set(tokens[0], line);
        module.exports.execute(tokens.slice(1), line);
    },

    // r-type
    add: function (tokens, line) {
        let flag = true;
        if(tokens.length !== 4)
            flag = false;

        tokens.forEach((element, i) => {
            if(i > 0 && !helper.isItValidRegistered(element))
                flag = false;
        });    

        if(flag) {
            register = {
                ...register,
                [tokens[1]]: register[tokens[2]] + register[tokens[3]]
            }
        }

        return [line, flag];
    },
    sub: function (tokens, line) {
        let flag = true;
        if(tokens.length !== 4)
            flag = false;

        tokens.forEach((element, i) => {
            if(i > 0 && !helper.isItValidRegistered(element))
                flag = false;
        });    

        if(flag) {
            register = {
                ...register,
                [tokens[1]]: register[tokens[2]] - register[tokens[3]]
            }
        }

        return [line, flag];
    },
    and: function (tokens, line) {
        let flag = true;
        if(tokens.length !== 4)
            flag = false;

        tokens.forEach((element, i) => {
            if(i > 0 && !helper.isItValidRegistered(element))
                flag = false;
        });    

        if(flag) {
            register = {
                ...register,
                [tokens[1]]: register[tokens[2]] && register[tokens[3]]
            }
        }

        return [line, flag];
    },
    or: function (tokens, line) {
        let flag = true;
        if(tokens.length !== 4)
            flag = false;

        tokens.forEach((element, i) => {
            if(i > 0 && !helper.isItValidRegistered(element))
                flag = false;
        });    

        if(flag) {
            register = {
                ...register,
                [tokens[1]]: register[tokens[2]] || register[tokens[3]]
            }
        }

        return [line, flag];
    },
    mul: function (tokens, line) {
        let flag = true;
        if(tokens.length !== 4)
            flag = false;

        tokens.forEach((element, i) => {
            if(i > 0 && !helper.isItValidRegistered(element))
                flag = false;
        });    

        if(flag) {
            register = {
                ...register,
                [tokens[1]]: register[tokens[2]] * register[tokens[3]]
            }
        }

        return [line, flag];
    },

    // i-type
    addi: function (tokens, line) {
        let flag = true;
        if(tokens.length !== 4)
            flag = false;

        if(
        !helper.isItValidRegistered(tokens[1]) 
        && !helper.isItValidRegistered(tokens[2])
        && isNaN(tokens[3])
        ) {
            flag = false;
        }

        if(flag) {
            register = {
                ...register,
                [tokens[1]]: register[tokens[2]] + +tokens[3]
            }
        }

        return [line, flag];
    },
    subi: function (tokens, line) {
        let flag = true;
        if(tokens.length !== 4)
            flag = false;

        if(
        !helper.isItValidRegistered(tokens[1]) 
        && !helper.isItValidRegistered(tokens[2])
        && isNaN(tokens[3])
        ) {
            flag = false;
        }

        if(flag) {
            register = {
                ...register,
                [tokens[1]]: register[tokens[2]] - +tokens[3]
            }
        }

        return [line, flag];
    },
    andi: function (tokens, line) {
        let flag = true;
        if(tokens.length !== 4)
            flag = false;

        if(
        !helper.isItValidRegistered(tokens[1]) 
        && !helper.isItValidRegistered(tokens[2])
        && isNaN(tokens[3])
        ) {
            flag = false;
        }

        if(flag) {
            register = {
                ...register,
                [tokens[1]]: register[tokens[2]] && +tokens[3]
            }
        }

        return [line, flag];
    },
    ori: function (tokens, line) {
        let flag = true;
        if(tokens.length !== 4)
            flag = false;

        if(
        !helper.isItValidRegistered(tokens[1]) 
        && !helper.isItValidRegistered(tokens[2])
        && isNaN(tokens[3])
        ) {
            flag = false;
        }

        if(flag) {
            register = {
                ...register,
                [tokens[1]]: register[tokens[2]] || +tokens[3]
            }
        }

        return [line, flag];
    },

    // shift
    sll: function (tokens, line) {
        let flag = true;
        if(tokens.length !== 4)
            flag = false;

        if(
        !helper.isItValidRegistered(tokens[1]) 
        && !helper.isItValidRegistered(tokens[2])
        && isNaN(tokens[3])
        ) {
            flag = false;
        }

        if(flag) {
            register = {
                ...register,
                [tokens[1]]: register[tokens[2]] << +tokens[3]
            }
        }

        return [line, flag];
    },
    srl: function (tokens, line) {
        let flag = true;
        if(tokens.length !== 4)
            flag = false;

        if(
        !helper.isItValidRegistered(tokens[1]) 
        && !helper.isItValidRegistered(tokens[2])
        && isNaN(tokens[3])
        ) {
            flag = false;
        }

        if(flag) {
            register = {
                ...register,
                [tokens[1]]: register[tokens[2]] >> +tokens[3]
            }
        }

        return [line, flag];
    },

    // branch
    beq: function (tokens, line) {
        let flag = true;
        if(tokens.length !== 4)
            flag = false;

        if(
        !helper.isItValidRegistered(tokens[1]) 
        && !helper.isItValidRegistered(tokens[2])
        && typeof tokens[2] !== 'string'
        ) {
            flag = false;
        }

        if(flag && register[tokens[2]] === register[tokens[3]])
            line = address.get(+tokens[2]) - 1;

        return [line, flag];
    },
    bne: function (tokens, line) {
        let flag = true;
        if(tokens.length !== 4)
            flag = false;

        if(
        !helper.isItValidRegistered(tokens[1]) 
        && !helper.isItValidRegistered(tokens[2])
        && typeof tokens[2] !== 'string'
        ) {
            flag = false;
        }

        if(flag && register[tokens[2]] !== register[tokens[3]])
            line = address.get(+tokens[2]) - 1;

        return [line, flag];
    },
    bgt: function (tokens, line) {
        let flag = true;
        if(tokens.length !== 4)
            flag = false;

        if(
        !helper.isItValidRegistered(tokens[1]) 
        && !helper.isItValidRegistered(tokens[2])
        && typeof tokens[2] !== 'string'
        ) {
            flag = false;
        }

        if(flag && register[tokens[2]] > register[tokens[3]])
            line = address.get(+tokens[2]) - 1;

        return [line, flag];
    },
    bge: function (tokens, line) {
        let flag = true;
        if(tokens.length !== 4)
            flag = false;

        if(
        !helper.isItValidRegistered(tokens[1]) 
        && !helper.isItValidRegistered(tokens[2])
        && typeof tokens[2] !== 'string'
        ) {
            flag = false;
        }

        if(flag && register[tokens[2]] >= register[tokens[3]])
            line = address.get(+tokens[2]) - 1;

        return [line, flag];
    },
    blt: function (tokens, line) {
        let flag = true;
        if(tokens.length !== 4)
            flag = false;

        if(
        !helper.isItValidRegistered(tokens[1]) 
        && !helper.isItValidRegistered(tokens[2])
        && typeof tokens[2] !== 'string'
        ) {
            flag = false;
        }

        if(flag && register[tokens[2]] < register[tokens[3]])
            line = address.get(+tokens[2]) - 1;

        return [line, flag];
    },
    ble: function (tokens, line) {
        let flag = true;
        if(tokens.length !== 4)
            flag = false;

        if(
        !helper.isItValidRegistered(tokens[1]) 
        && !helper.isItValidRegistered(tokens[2])
        && typeof tokens[2] !== 'string'
        ) {
            flag = false;
        }

        if(flag && register[tokens[2]] <= register[tokens[3]])
            line = address.get(+tokens[2]) - 1;

        return [line, flag];
    },

    // jumb

    j: function (tokens, line) {
        let flag = true;
        if(tokens.length !== 2)
            flag = false;

        if(typeof tokens[1] !== 'string') {
            flag = false;
        }

        if(flag)
            line = address.get(+tokens[1]) - 1;
            
        return [line, flag];
    },

    // print
    print: function (tokens, line) {
        let flag = true;
        if(tokens.length !== 2)
            flag = false;

        if(!helper.isItValidRegistered(tokens[1]))
            flag = false;

        console.log(tokens[1], register[tokens[1]]);
            
        return [line, flag];
    },

  }