function charComparison(text, idx, pattern, stats) { //функция для посимвольного сравнения подходящей строки и подсчётом количества посимволльных сравнений для статистики
    for (let i = 0; i < pattern.length; i++) {
        stats.characterComparisons++; // Увеличиваем счётчик сравнений символов
        if (text[idx + i] !== pattern[i]) { // Сравниваем символы начиная с idx
            return false; // Если символы не совпадают, возвращаем false
        }
    }
    return true; // Если все символы совпали, возвращаем true
}

function bruteForceSearch(text, pattern ) {
    const stats = {
        executionTime: 0,      // Время выполнения поиска
        matches: [],           // Индексы всех совпадений
        exactMatches: 0,       // Количество точных совпадений
        characterComparisons: 0 // Количество сравнений символов
    };

    const patternLength = pattern.length;
    const textLength = text.length;

    let startTime = performance.now();  //в переменную записываем время данного момента(для time)
    for (let i = 0; i <= textLength - patternLength; i++){          //начало цикла, в котором мы проходимся по каждой позиции строки файла
        if (charComparison(text, i, pattern, stats)) {
            stats.matches.push(i);    // Записываем индекс совпадения
            stats.exactMatches++;        // Увеличиваем количество точных совпадений
        }
    }
    stats.executionTime = performance.now() - startTime; // Вычисляем время выполнения 
    return stats;                                   //вывод статистики
}


function simpleHashSearch(text, pattern) {
    const stats = {
        executionTime: 0,      // Время выполнения поиска
        matches: [],           // Индексы всех совпадений
        exactMatches: 0,       // Количество точных совпадений
        collisions: 0,         // Количество коллизий
        characterComparisons: 0 // Количество сравнений символов
    };

    const patternLength = pattern.length;
    const textLength = text.length;

    const startTime = performance.now(); // Запоминаем время начала поиска

    // Вычисляем хэш для подстроки
    let patternHash = 0;
    for (let i = 0; i < patternLength; i++) {
        patternHash += pattern.charCodeAt(i); // Суммируем кодовые точки символов
    }

    // Вычисляем хэш для первого окна текста
    let currentHash = 0;
    for (let i = 0; i < patternLength; i++) {
        currentHash += text.charCodeAt(i); // Суммируем кодовые точки символов для первого окна
    }

    for (let i = 0; i <= textLength - patternLength; i++) {
        if (currentHash === patternHash) { // Если хэши совпадают
            if (charComparison(text, i, pattern, stats)) {
                stats.matches.push(i);    // Записываем индекс совпадения
                stats.exactMatches++;        // Увеличиваем количество точных совпадений
            } else {
                stats.collisions++;          // Увеличиваем счётчик коллизий
            }
        }

        // Обновляем хэш для следующего окна, если оно существует
        if (i < textLength - patternLength) {
            currentHash = currentHash - text.charCodeAt(i) + text.charCodeAt(i + patternLength);
        }
    }

    stats.executionTime = performance.now() - startTime; // Вычисляем время выполнения
    return stats; // Возвращаем статистику
}

function rabinKarpSearch(text, pattern) {
    // Инициализируем статистику
    const stats = {
        executionTime: 0,      // Время выполнения поиска
        matches: [],           // Индексы всех совпадений
        exactMatches: 0,       // Количество точных совпадений
        collisions: 0,         // Количество коллизий
        characterComparisons: 0 // Количество сравнений символов
    };

    const patternLength = pattern.length; // Длина подстроки
    const textLength = text.length;       // Длина текста
    const maxPowerOfTwo = Math.pow(2, patternLength - 1); // Максимальная степень двойки для веса символа

    // Вычисляем хэш для подстроки
    let patternHash = 0;
    for (let i = 0; i < patternLength; i++) {
        patternHash += pattern.charCodeAt(i) * Math.pow(2, patternLength - i - 1);
    }

    //переменная для текущего хэша, мы будем с каждой итерацией сдвигаться на один символ вычитая хэш левого символа и прибавляя хэш правого(плавающий хэш)
    let currentHash = 0;
    for (let i = 0; i < patternLength; i++) {
        currentHash += text.charCodeAt(i) * Math.pow(2, patternLength - i - 1);
    }

    const startTime = performance.now(); // Запоминаем время начала поиска

    // Сдвигаем шаблон по строке и сравниваем хэши
    for (let i = 0; i <= textLength - patternLength; i++) {
        if (currentHash === patternHash) { // Если хэши совпадают
            if (charComparison(text, i, pattern, stats)) {
                stats.matches.push(i);    // Записываем индекс совпадения
                stats.exactMatches++;        // Увеличиваем количество точных совпадений
            } else {
                stats.collisions++;          // Увеличиваем счётчик коллизий
            }
        }

        // Обновляем текущий хэш, если он существует
        if (i < textLength - patternLength) {
            currentHash = 2 * (currentHash - text.charCodeAt(i) * maxPowerOfTwo) + text.charCodeAt(i + patternLength);
        }
    }

    stats.executionTime = performance.now() - startTime; // Вычисляем время выполнения
    return stats; // Возвращаем статистику
}

try{
    const fs = require('fs');
    let inputText = fs.readFileSync('input.txt', 'utf8');  

    console.log("\nBrute Force\n");
    console.log(bruteForceSearch(inputText, "ananas"));        
    console.log("\nHash\n");
    console.log(simpleHashSearch(inputText, "ananas"));
    console.log("\nRabin-Karp\n");
    console.log(rabinKarpSearch(inputText, "ananas"));
}
catch(error){
    console.log("Возникла ошибка:")
    console.log(error.message);
}
