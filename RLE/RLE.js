function rle_encode(input){
    let result = '';
    let i = 0;
    
    while (i<input.length) {
        let currentSimbol = input[i];
        let count = 1;
        
        while (currentSimbol == input[count+i]){
            count++;
        }
    
        if (count<=2){
            result += currentSimbol.repeat(count);
        }

        else{
            result += count + currentSimbol;
        }
        i += count;
        
    }
    return result;
}

function rle_decode(input){
    let result = '';
    let i = 0;
    let numbers = "1234567890";

    while (i<input.length) {
        var count = '';
        while(numbers.indexOf(input[i])!=-1){
            count+=input[i];
            i++;
        }
        if(count.length>0){
            count = Number(count)
            result += input[i].repeat(count-1);
        }
        else{
            result += input[i]
            i++;
        }

        
        
    }

    return result;
}

let fs = require('fs'); 

const args = process.argv
const op = args[2]; 
const inputFile = args[3];
const outputFile = args[4];
const inText = fs.readFileSync(inputFile); 

let res;
if (op === 'code') {
	var a = inText.toString() 
	res=rle_encode(a);
	console.log("Compression ratio = ", a.length/res.length); 
    }else if (op === 'decode') {
		var b = inText.toString() 
		res=rle_decode(b);
		console.log("Compression ratio = ", res.length/b.length);
	}
	
fs.writeFileSync(outputFile, res); 

