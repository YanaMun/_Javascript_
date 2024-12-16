function rle_code(input) {
    let result = '';
    let i = 0;

    while (i < input.length) {
        let currentSymbol = input[i];
        let count = 1;

        while (currentSymbol === input[i + count]) {
            count++;
        }

        if (count <= 3) { // Если число повторений меньше трех, то повторяем символ указанное количество раз
            result += currentSymbol.repeat(count);
        } else {
            result += `#${count}${currentSymbol}`; // Записываем через # + число повторений + текущий символ
        }
        i += count;
    }

    return result;
}

function rle_decode(input) {
    let result = '';
    let i = 0;

    while (i < input.length) {
        if (input[i] === '#') {
            i++; // Пропускаем символ #
            let count = '';
            while (!isNaN(input[i]) && i < input.length) { // Читаем число (считываем пока символ — цифра)
                count += input[i];
                i++;
            }
            if (input[i] === '#') { // Если следующий символ также #
                result += '#'.repeat(Number(count)); // Повторяем символ # указанное число раз
            } else {
                result += input[i].repeat(Number(count)); // Повторяем текущий символ указанное число раз
            }
        } else {
            result += input[i]; // Обычный символ, добавляем его как есть
        }
        i++;
    }

    return result;
}


let fs = require('fs'); // Подключаем библиотеку

const args = process.argv;
const op = args[2]; // code или decode
const inputFile = args[3];
const outputFile = args[4];
const inText = fs.readFileSync(inputFile).toString(); // Считываем из файла как строку

let res;
if (op === 'code') {
    res = rle_code(inText);
    console.log("Compression ratio = ", inText.length / res.length); // Степень сжатия
} else if (op === 'decode') {
    res = rle_decode(inText);
    console.log("Compression ratio = ", res.length / inText.length);
}

fs.writeFileSync(outputFile, res); // Записываем результат в файл
