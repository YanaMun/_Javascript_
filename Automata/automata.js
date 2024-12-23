function automata(text, pattern) {
    // Инициализация статистики
    let statistic = {'Time': 0, 'Indices': 0};
    let indices = [];
    let pointer = 0;

    let textLength = text.length;			  // Длина текста
    let patternLength = pattern.length;       // Длина подстроки
    let alph = new Array();                   // Переменная для мощности алфавита

    // Время начала поиска
    let startTime = performance.now();

    // Определение алфавита  шаблона
    for (let i = 0; i < patternLength; i++) {
        alph[pattern.charAt(i)] = 0;
    }

    //В массиве массивов del хранится таблица переходов
    let del = new Array(patternLength + 1);
    for (let j = 0; j <= patternLength; j++) {
        del[j] = new Array();
    }

    // Инициализация таблицы переходов
    for (let i in alph) {
        del[0][i] = 0;
    }

    // Формирование таблицы переходов
    for (let j = 0; j < patternLength; j++) {
        let prev = del[j][pattern.charAt(j)];
        del[j][pattern.charAt(j)] = j + 1;
        for (let i in alph) {
            del[j + 1][i] = del[prev][i];
        }
    }

    // Выполнение поиска
    let state = 0; // Текущее состояние автомата (где просматриваем подстроку на данный момент)
    for (let i = 0; i < textLength; i++) {
        if (text.charAt(i) in alph) {
            state = del[state][text.charAt(i)];
        } else {
            state = 0; // Сброс состояния при несоответствии
        }

        if (state === patternLength) {
            indices[pointer]=(i-patternLength+1);
            pointer++;
        }
    }

    statistic['Time'] = performance.now() - startTime;
    statistic['Indices'] = indices;

	// Вывод таблицы переходов
	console.log("The transition table:");
    for (let j = 0; j <= patternLength; j++) {
        let out = '';
        for (let i in alph) {
            out += del[j][i] + ' ';
        }
        console.log(out);
    }
	
    console.log("Statistics:")
	return statistic; //Возвращение статистики
}

try {
    const fs = require('fs');
    let inputText = fs.readFileSync('input.txt', 'utf8');
    let string = inputText.toString();

    console.log(automata(string, "кол"));
} catch (error) {
    console.log("Возникла ошибка:");
    console.log(error.message);
}
