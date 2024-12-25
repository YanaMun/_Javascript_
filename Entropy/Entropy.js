const fs = require('fs');

let args = process.argv;
let inputFile = args[2];
let input = fs.readFileSync(inputFile, 'utf8');
let alph = new Object();
let inLength = input.length;

// Подсчитывается количество каждого различного элемента.
for(let i=0;i<inLength;i++) {
    if(alph[input.charAt(i)])
        alph[input.charAt(i)] ++
    else
        alph[input.charAt(i)] =1;
}

let alphPower=0;
// Вычисляется мощность алфавита и каждое количество различного символа делится на общее количество символов (длину строки).
for(let i in alph) {
	alphPower++;
    alph[i]/=inLength;
}

// Вычисление энтропии
let entropy=0;
if (alphPower>1) {
	for(let i in alph)
		entropy-=alph[i]* Math.log(alph[i]); 
	entropy /= Math.log(alphPower);
}

console.log("Алфавит с частотами: ", alph);
console.log("Энтропия равна =", entropy);
