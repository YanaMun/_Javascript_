/*
j++ - название нашего низкоуровнего языка.

first.jpp - первый файл. Вычисление факториала числа.
second.jpp - второй файл. Нахождение НОД двух натуральных чисел.
jin - для ввода
arg1 - адрес куда поместить значение
set arg1 arg2 - куда поместить и что поместить
mov arg1 arg2 - значение arg2 скопировать в arg1
add arg1 arg2 arg3 - адрес первого слагаемого, адрес второго слагаемого, адрес суммы
sub arg1 arg2 arg3 - вычитание
mult arg1 arg2 arg3 - умножение
mod arg1 arg2 arg3 - остаток от деления

jout - для вывода
cmpj arg1 arg2 - принимает два аргумента на сравнение. И если arg1<arg2 тогда прыгай к arg3 
если нет, то двигайся дальше
*/

let argumentsFromConsole = process.argv;
let inputFile = argumentsFromConsole[2];

try {
	let testTxt = (inputFile.slice(-4) == '.jpp');

	if (testTxt) {
		const fs = require('fs');
		const readlineSync = require('readline-sync');
		let mem = new Array();
		const prog = fs.readFileSync(inputFile, { encoding: 'utf8', flag: 'r' });
		mem = prog.split(/ |\r\n/);
		ip = 0;

		while (mem[ip] != 'exit')
			switch (mem[ip]) {

				case 'jin': // jin arg1 - аналог cin
					in_num = readlineSync.question("input a number: ");
					mem[mem[ip + 1]] = parseInt(in_num);
					ip += 2
					break

				case 'jout': // jout arg1 - аналог cout
					console.log((mem[mem[ip + 1]]));
					ip += 2;
					break;

				case 'set': // set arg1 arg2 - значение arg2 положить в arg1
					mem[mem[ip + 1]] = parseInt(mem[ip + 2]);
					ip += 3;
					break;

				case 'mov': // mov arg1 arg2 - значение arg2 скопировать в arg1
					mem[mem[ip + 1]] = mem[mem[ip + 2]];
					ip += 3;
					break;

				case 'add': // add arg1 arg2 arg3 - сложение (arg3 - адрес суммы)
					mem[mem[ip + 3]] = mem[mem[ip + 1]] + mem[mem[ip + 2]];
					ip += 4;
					break;

				case 'mult': // mult arg1 arg2 arg3 - умножение (arg3 - адрес произведения)
					mem[mem[ip + 3]] = mem[mem[ip + 1]] * mem[mem[ip + 2]];
					ip += 4;
					break;
	
				case 'sub': // sub arg1 arg2 arg3 - вычитание (arg3 - адрес разности)
					mem[mem[ip + 3]] = mem[mem[ip + 1]] - mem[mem[ip + 2]];
					ip += 4;
					break;

				case 'mod': // mod arg1 arg2 arg3 - остаток от деления (arg3 - адрес остатка)
					mem[mem[ip + 3]] = mem[mem[ip + 1]] % mem[mem[ip + 2]];
					ip += 4;
					break;

				case 'cmpj': // cmpj arg1 arg2 arg3 arg4
					if (mem[mem[ip + 1]] < mem[mem[ip + 2]]) {
						// Если значение в arg1 меньше значения в arg2, прыгнуть на адрес arg3
						ip = parseInt(mem[ip + 3]);
					}
					else {
						// Иначе прыгнуть на адрес arg4
						ip = parseInt(mem[ip + 4]);
					}
					break;
		    }
	}
}

catch (error) {
	console.log("Error. We can't open your file");
	console.log(error.message);
	console.log("Please, try again");
}
