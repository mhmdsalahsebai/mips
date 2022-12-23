const ds = require('./ds');

let register = ds.register;
const instruction = ds.instruction;

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
