const fs = require('fs');

let args = process.argv;
let inputFile = args[2];
let input = fs.readFileSync(inputFile, 'utf8');
let alph = new Object();
let inLength = input.length;
for(let i=0;i<inLength;i++) {
    if(alph[input.charAt(i)])
        alph[input.charAt(i)] ++
    else
        alph[input.charAt(i)] =1;
}

let alphPower=0;

for(let i in alph) {
	alphPower++;
    alph[i]/=inLength;
}

let entropy=0;
if (alphPower>1) {
	for(let i in alph)
		entropy-=alph[i]* Math.log(alph[i]); 
	entropy /= Math.log(alphPower);
}

console.log("Алфавит с частотами: ", alph);
console.log("Энтропия равна =", entropy);
