# Использование
Вы можете запустить скрипт из командной строки. Скрипт принимает путь к файлу, из которого происходит считывание текста, для подсчёта энтропии.

`node Entropy.js <inputFile>`
# Основной код
Подсчитывается количество каждого различного элемента.
```javascript
for(let i=0;i<inLength;i++) {
    if(alph[input.charAt(i)])
        alph[input.charAt(i)] ++
    else
        alph[input.charAt(i)] =1;
}
```

Вычисляется мощность алфавита `alphPower` и каждое количество различного символа делится на общее количество символов (длину строки).
```javascript
for(let i in alph) {
	alphPower++;
    alph[i]/=inLength;
}
```

Если мощность алфавита больше одного, вычисляется энтропия. Энтропия вычисляется по формуле Шеннона, где вместо `2` мы используем `alphPower`. `Pi` - это количество различного символа, делённое на длину строки.

![image](https://github.com/user-attachments/assets/7efc61fe-bdc7-4359-8b70-c0887bbc392d)

```javascript
if (alphPower>1) {
	for(let i in alph)
		entropy-=alph[i]* Math.log(alph[i]); 
	entropy /= Math.log(alphPower);
}
```

При мощности алфавита `<=1`, энтропия будет равна `0`.

При выводе в консоль получим энтропию и таблицу с частотами каждой буквы.
