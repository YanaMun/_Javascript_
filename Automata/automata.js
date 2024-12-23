function automata(text, pattern) {
    // Инициализация статистики
    const stats = {
        executionTime: 0,      // Время выполнения поиска
        matches: [],           // Индексы всех совпадений
        exactMatches: 0,       // Количество точных совпадений
        collisions: 0,         // Количество коллизий
        characterComparisons: 0 // Количество сравнений символов
    };

    let textLength = text.length;			  // Длина текста
    let patternLength = pattern.length;       // Длина подстроки
    let alph = new Array();                   // Переменная для мощности алфавита

    // Время начала поиска
    const startTime = performance.now();

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
        stats.characterComparisons++; // Увеличение счётчик сравнений символов

        if (text.charAt(i) in alph) {
            state = del[state][text.charAt(i)];
        } else {
            state = 0; // Сброс состояния при несоответствии
            stats.collisions++; // Увеличение счётчик коллизий
        }

        if (state === patternLength) {
            stats.matches.push(i - patternLength + 1); // Запись индекса совпадения
            stats.exactMatches++; // Увеличение количество точных совпадений
        }
    }

    stats.executionTime = performance.now() - startTime; // Вычисление времени выполнения

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
	return stats; //Возвращение статистики
}

try {
    const fs = require('fs');
    let inputText = fs.readFileSync('input.txt', 'utf8');

    console.log(automata(inputText, "кол"));
} catch (error) {
    console.log("Возникла ошибка:");
    console.log(error.message);
}