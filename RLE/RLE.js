function rle_encode(input) {
    let result = '';
    count=1;

    for (let i = 0; i < input.length; i++) {

        if (input[i] === input[i + 1]) {
            count++;
        } else {
            
            while (count > 255) {
                result += '#' + String.fromCharCode(255) + input[i];
                count -= 255;
            }

            
            if (count >= 4 || input[i] === '#') {
                result += '#' + String.fromCharCode(count) + input[i];
            } else {
                result += input[i].repeat(count);
            }

            count = 1; 
        }
    }

    return result;
}

function rle_decode(input) {
    let result = '';
    let i = 0;

    while (i < input.length) {
        if (input[i] === '#' && i + 1 < input.length) {
            let count = input.charCodeAt(i + 1);
            let char = input[i + 2];

            if (char === '#') {
                result += '#'.repeat(count);
                i += 3;
            } else {
                result += char.repeat(count);
                i += 3;
            }
        } else {
            result += input[i];
            i++;
        }
    }

    return result;
}

let fs = require('fs'); // Подключаем библиотеку

const args = process.argv;
const op = args[2]; // encode или decode
const inputFile = args[3];
const outputFile = args[4];

try{
    const inText = fs.readFileSync(inputFile,'utf8').trim(); // Считываем из файла как строку

    if (!op || !inputFile || !outputFile) {
        console.log("Usage: node RLE.js <operation> <inputFile> <outputFile>");
        process.exit(1);
    }

    let res;
    if (op === 'encode') {
        res = rle_encode(inText);
        let compressionRatio = inText.length / res.length;
        console.log(`Compression ratio: ${compressionRatio.toFixed(2)}`); // Степень сжатия
    } else if (op === 'decode') {
        res = rle_decode(inText);
    } else {
        console.log("Invalid operation. Use 'encode' or 'decode'.");
    }

fs.writeFileSync(outputFile, res,'utf8'); // Записываем результат в файл
} catch (error) {
    console.log("Возникла ошибка:");
    console.log(error.message);
}
