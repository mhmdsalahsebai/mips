module.exports = {
    register: {
        $s0: 0,
        $s1: 2,
        $s2: 5,
        $a0: 0,
        $a1: 3,
        $a2: 3,
        $v0: 0,
        $v1: 1,
        $v2: 2,
        
    },
    instruction:  new Set(
        ['label', 'add', 'sub', 'mul', 'and', 
        'or', 'addi', 'subi', 'andi', 'ori', 'sll', 
        'srl', 'beq', 'bne', 'bgt', 'bge', 'blt', 
        'ble', 'j', 'print']
    ),
    address : new Map(),
}
