//Huffman
const fs = require('fs'); // Подключаем библиотеку

let args = process.argv;
let op = args[2];
let inputFile = args[3];
let tableFile = args[4];
let outputFile = args[5];

try{
    let testTxt = (inputFile.slice(-4) == '.txt');
    let input = fs.readFileSync(inputFile, 'utf8');

    if (testTxt && op == 'code'){
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

        let table = "";
                for (let i = 0; i < alphPower; i++){
                    let temp1 = associative[i].name;
                    let temp2 = associative[i].code;
                    table += (temp1+" "+temp2+'\n');
                }

        fs.writeFileSync(outputFile, result);
        fs.writeFileSync(tableFile, table);
    }

    else if(testTxt && op == 'decode'){

        let table = fs.readFileSync(tableFile, 'utf8');
        let i = 0;
        let codeTable = new Object();
        let alphPower = 0;

        while(i<table.length){
            let temp = table[i];
            alphPower++;
            i+=2;
            let str = "";
            while(table[i]!='\n'){
                str+=table[i];
                i++;
            }
            codeTable[str] = temp;
            i++;
        }

        let tempText = '';
        let res = '';
        for (let k = 0; k < input.length; k++){
            tempText+=input[k];
            if (codeTable[tempText]){
                res += codeTable[tempText];
                tempText='';
            }
        }
        
        fs.writeFileSync(outputFile, res);

    }
}catch(error){
        console.log(error.message);
    }
