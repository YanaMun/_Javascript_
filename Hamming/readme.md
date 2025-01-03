# Постановка задачи
Подается строка, состоящая из 4 контрольных битов.
Необходимо создать код Хэмминга, который содержит 4 бита данных и дополнительные проверочные биты для выявления и исправления однобитовых ошибок.

# Алгоритм
Этот код реализует код Хэмминга для кодирования и декодирования бинарных данных с возможностью обнаружения и коррекции одиночных ошибок.
Код Хэмминга позволяет добавлять контрольные биты к данным, что делает их более устойчивыми к ошибкам.

## Описание

Код Хэмминга используется для обеспечения целостности данных, передаваемых по ненадежным каналам связи.
Он добавляет контрольные биты к исходным данным и позволяет обнаруживать и исправлять одиночные ошибки в кодированных данных.

## Использование

1. Введите 4 бита (0 или 1) в поле `Input data`.
2. Нажмите кнопку `Code`, чтобы сгенерировать кодированные данные. Кодированные данные будут отображены в поле `Coded data`.
3. Введите 7 бит (кодированные данные) в поле `Coded data`, чтобы декодировать данные.
4. Нажмите кнопку `Decode`, чтобы получить декодированные данные и информацию об ошибках. Декодированные данные будут отображены в поле `Decoded data`, а информация об ошибках — в поле `error_info`.

### Пример использования

1. Введите `1101` в поле `Input data`.
2. Нажмите кнопку `Code`, чтобы получить кодированные данные (например, `1101001`).
3. Введите кодированные данные в поле `Coded data`.
4. Нажмите кнопку `Decode`, чтобы получить исправленные данные и информацию об ошибках.

## Реализация

### Функция `code`

Эта функция добавляет контрольные биты к введенным данным, проверяя их на корректность и формируя 7-битное кодированное сообщение.

### Функция `decode`

Эта функция выполняет проверку на наличие ошибок в кодированных данных и исправляет их, если это возможно. Она анализирует входные данные и выводит исправленные данные, а также информацию о том, в каком бите произошла ошибка.
