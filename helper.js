const reg = require('./register');
let register = reg.register;

const instruction = new Set(['label', 'add', 'sub', 'mul', 'and', 'or', 'addi', 'subi', 'andi', 'ori', 'sll', 'srl', 'beq', 'bne', 'bgt', 'bge', 'blt', 'ble', 'j', 'print']);
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
