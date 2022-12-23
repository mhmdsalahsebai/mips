const fs = require('fs');
const ex = require('./execute');

const program = fs.readFileSync('code.mps').toString().split("\n")
.map(word => { // tokens (lexical analysis)
    word = word.toLowerCase();
    let token = '';
    for(let i = 0; i < word.length; i++) {
        if(word[i] !== ',' && word[i] !== ';')
        token = token.concat(word[i]);
    }
    return token;
})
.map(line => line.split(' ')); // parsing


// Execute
for(let i = 0; i < program.length; i++) {
    const inst = program[i];

    const [line, ok] = ex.execute(inst, i);
    i = line;
    
    if(!ok) {
        console.log(`Syntax Error at line ${i + 1}`);
        return;
    }
}