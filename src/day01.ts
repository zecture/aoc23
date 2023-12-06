import * as fs from 'fs';

const data = fs.readFileSync('./data/day01_1.txt', 'utf-8');

function partOne() {
    let t1 = performance.now();
    let sum = 0;
    
    let numbers = data.match(/\d|\n/g).join("").split("\n");
    
    numbers.map(item => {
        let value = parseInt(item.charAt(0)+item.charAt(item.length-1))
        sum += !Number.isNaN(value) && value
    })
    //console.log(sum);
    let t2 = performance.now()
    return (t2 - t1);
    
}

function partTwo() {
    let t1 = performance.now();
    const spelledNumbers = {
        'one': 1,
        'two': 2,
        "three": 3,
        'four': 4,
        'five': 5,
        'six': 6,
        'seven': 7,
        'eight': 8,
        'nine': 9
    }
    const parse = (string) => {
        return !isNaN(parseInt(string)) ? string : spelledNumbers[string].toString() || null;
    }
    let output = 0;

    data.split("\n").forEach(row => {
        const rowNumbers = Array.from(row.matchAll(new RegExp(/(?<=(one|two|three|four|five|six|seven|eight|nine|[1-9]))/g)))
        output += parseInt(parse(rowNumbers[0][1])+parse(rowNumbers[rowNumbers.length-1][1]));
    })

    //console.log(output);
    let t2 = performance.now()
    return (t2 - t1);

}



const partOneBench = [];
const partTwoBench = [];

for (let i = 0;i<10000; i++) {
    
    partOneBench.push(partOne());
    partTwoBench.push(partTwo());
}

function avgTime(list: number[]) {
    let totalTime = list.reduce((x,y) => {
        return x+y;
    })
    return totalTime / list.length
}

console.log('Part One avg time: ',avgTime(partOneBench))
console.log('Part Two avg time: ',avgTime(partTwoBench))