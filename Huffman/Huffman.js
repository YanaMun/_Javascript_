//Huffman
const fs = require('fs'); // Подключаем библиотеку

let args = process.argv;
let inputFile = args[2];
let codeoutputFile = args[3];
let decodedoutputFile = args[4];
let input = fs.readFileSync(inputFile, 'utf8');

alph = new Object();
tree=new Array();

function Node(name,freq,used,link, code){
	this.name = name; //имя
	this.freq = freq; //частота
	this.used = used; //использованный элемент
	this.link = link; // ссылка на детей (родитель)
	this.code = code; // 0 или 1
}

for(let i=0;i<input.length;i++) { //сколько раз повторяются
    if(alph[input.charAt(i)])
       alph[input.charAt(i)] ++
    else
       alph[input.charAt(i)] =1;
}


alphPower =0;
for(let i in alph) {
	alphPower++;
    newNode= new Node(i,alph[i],false,undefined,'');
	tree.push(newNode); //Запушиваем в дерево элементы
}

for (let i = 1; i < alphPower; i++){
        el1 = {ind: 0, val: Number.MAX_VALUE};
        el2 = {ind: 0, val: Number.MAX_VALUE};
        for (k = 0; k < tree.length; k++){
            if ((!tree[k].used) && (tree[k].freq < el1.val)){
                el1.ind=k;
                el1.val=tree[k].freq;
            }
            else if ((!tree[k].used) && (tree[k].freq <= el2.val)){
                el2.ind=k;
                el2.val=tree[k].freq;
            }
        }
        newNode = new Node(tree[el1.ind].name + tree[el2.ind].name, tree[el1.ind].freq + tree[el2.ind].freq, false, undefined, '');
        tree.push(newNode);
        tree[el1.ind].used = true;
        tree[el1.ind].link = k; //ссылка на нового родителя
        tree[el1.ind].code = '0';
        tree[el2.ind].used = true;
        tree[el2.ind].link = k; // ссылка на нового родителя
        tree[el2.ind].code = '1';
}

function Code(name,code){
	this.name = name;
	this.code = code;
}

// Функция для кодирования строки
function Huffman_code(name,tree){
	let res='';
	let linkparent='';
	let linkchild='';
	for (let i=0;i<tree.length;i++){
		if (tree[i].name==name){
			linkchild=tree[i].link;
			res+=tree[i].code;
			while (linkchild!= undefined){
				linkparent=linkchild;
				linkchild=tree[linkparent].link;
				if (linkchild!= undefined){
					res=tree[linkparent].code +res;
				}
			}
			return res;
		}
	}
}


associative = new Array();
for (let i = 0; i < alphPower; i++){
    newCode = new Code(tree[i].name, Huffman_code(tree[i].name,tree));
    associative.push(newCode);
}

let result = '';
for (let i = 0; i < input.length; i++) {
    let letter = input[i];
    let numLetter = -1; // Инициализируем переменную с недопустимым значением
    for (let j = 0; j < associative.length; j++) {
        if (associative[j].name === letter) {
            numLetter = j; // Сохраняем индекс, если нашли совпадение
            break; // Прерываем цикл, так как нашли нужный индекс
        }
    }
    
    // Проверяем, найден ли символ в таблице
    if (numLetter !== -1) {
        result += associative[numLetter].code; // Добавляем код к результату
	}
}
fs.writeFileSync(codeoutputFile, result);

// Функция для раскодирования закодированной строки
function Huffman_decode(codedStr) {
    let decodedStr = '';
    let currentCode = '';

    for (let bit of codedStr) {
        currentCode += bit;

        // Проверяем, есть ли текущий код в массиве ассоциативных кодов
        for (let i = 0; i < associative.length; i++) {
            if (associative[i].code === currentCode) { // Если текущий код найден
                decodedStr += associative[i].name; // Добавляем соответствующий символ к результату
                currentCode = ''; // Сбрасываем текущий код
				 break; // Прерываем цикл после нахождения кода
            }
        }
    }

    return decodedStr;
}

// Раскодируем полученную строку и записываем результат в файл
let decodedResult = Huffman_decode(result);
fs.writeFileSync(decodedoutputFile, decodedResult);