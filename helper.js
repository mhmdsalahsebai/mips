const reg = require('./register');
let register = reg.register;

const instruction = new Set(['add', 'sub', 'mul', 'or', 'addi', 'ori', 'sll', 'srl']);
module.exports = {
    isItSupportedInstruction: function(inst) {
        return instruction.has(inst[0]);
    },

    isItValidInstruction: function(inst) {
        if(isItSupportedInstruction(inst) || inst[0].includes(':') && inst.length <= 4)
            return true;
        
        return false;
    },

    isItValidRegistered: function (input) {
        return register.hasOwnProperty(input);
    }
}
