function bruteForceSearch(text, pattern) {
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

    for (let i = 0; i <= textLength - patternLength; i++) {
        let match = true; // Предполагаем, что совпадение найдено
        for (let j = 0; j < patternLength; j++) {
            stats.characterComparisons++; // Увеличиваем счётчик сравнений символов
            if (text[i + j] !== pattern[j]) {
                match = false; // Если символы не совпадают, устанавливаем match в false
                break; // Выходим из внутреннего цикла
            }
        }
        if (match) {
            stats.matches.push(i); // Записываем индекс совпадения
            stats.exactMatches++; // Увеличиваем количество точных совпадений
        } else {
            stats.collisions++; // Увеличиваем счётчик коллизий, если совпадение не найдено
        }
    }

    stats.executionTime = performance.now() - startTime; // Вычисляем время выполнения
    return stats; // Возвращаем статистику
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
        stats.characterComparisons++; // Увеличиваем счётчик сравнений символов
        if (currentHash === patternHash) { // Если хэши совпадают
            let match = true; // Предполагаем, что совпадение найдено
            for (let j = 0; j < patternLength; j++) {
                stats.characterComparisons++; // Увеличиваем счётчик сравнений символов
                if (text[i + j] !== pattern[j]) {
                    match = false; // Если символы не совпадают, устанавливаем match в false
                    break; // Выходим из внутреннего цикла
                }
            }
            if (match) {
                stats.matches.push(i); // Записываем индекс совпадения
                stats.exactMatches++; // Увеличиваем количество точных совпадений
            } else {
                stats.collisions++; // Увеличиваем счётчик коллизий, если совпадение не найдено
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

    // Вычисляем хэш для первого окна строки
    let currentHash = 0;
    for (let i = 0; i < patternLength; i++) {
        currentHash += text.charCodeAt(i) * Math.pow(2, patternLength - i - 1);
    }

    const startTime = performance.now(); // Запоминаем время начала поиска

    // Сдвигаем шаблон по строке и сравниваем хэши
    for (let i = 0; i <= textLength - patternLength; i++) {
        stats.characterComparisons++; // Увеличиваем счётчик сравнений символов
        if (currentHash === patternHash) { // Если хэши совпадают
            // Проверяем посимвольное совпадение
            let match = true;
            for (let j = 0; j < patternLength; j++) {
                stats.characterComparisons++; // Увеличиваем счётчик сравнений символов
                if (text[i + j] !== pattern[j]) {
                    match = false; // Если символы не совпадают, устанавливаем match в false
                    break; // Выходим из внутреннего цикла
                }
            }
            if (match) {
                stats.matches.push(i); // Записываем индекс совпадения
                stats.exactMatches++; // Увеличиваем количество точных совпадений
            } else {
                stats.collisions++; // Увеличиваем счётчик коллизий
            }
        }

        // Обновляем хэш текущего окна, если оно существует
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
    console.log('')
}
catch(error){
    console.log("Возникла ошибка:")
    console.log(error.message);
}

// console.log(bruteForceSearch(inputText, "князь Андрей"));
// console.log(simpleHashSearch(inputText, "князь Андрей"));
// console.log(rabinKarpSearch(inputText, "князь Андрей"));