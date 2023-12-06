import * as fs from 'fs';

const data = fs.readFileSync('./data/day03.txt', 'utf-8').split('\n');
const testData = (
    `467..114..
    ...*......
    ..35..633.
    ......#...
    617*......
    .....+.58.
    ..592.....
    ......755.
    ...$.*....
    .664.598..`);


interface itemStructure {
    key: number;
    position: number;
    end: number;
    row: number;
}


function restructure(array, rowIndex): itemStructure[] {
    return array.map(item => {
        return {
            key: parseInt(item[0]) || item[0],
            position: item.index,
            end: item.index+item[0].length-1,
            row: rowIndex
        } as itemStructure;
    })
}

function plusMinus(start,end): number[] {
    const array = [];
    for (let i = start-1; i < end+2; i++){
        array.push(i);
    }
    return array;
}

function partOne() {
    const numbers: itemStructure[] = [];
    const symbols: itemStructure[] = [];
    let total = 0;

    data.map((row, index) => {
        const rowNumbers = restructure([...row.matchAll(/\d+/g)],index);
        const rowSymbols = restructure([...row.matchAll(/[^0-9.]/g)],index);
        numbers.push(...rowNumbers);
        symbols.push(...rowSymbols);
    })

    numbers.map((item,index) => {
        let isValid = false
        symbols.filter((symbol) => symbol.row > item.row-2 && symbol.row < item.row +2).map(symbol => {
            if (symbol.row >= item.row-1 && symbol.row <= item.row+1) {
                if (symbol.position >= item.position-1 && symbol.position <= item.end+1) {
                    //console.log(item);
                    isValid = true;
                }
            }  
        })
        total += isValid ? item.key : 0;
    })
    //console.log(total);

}

function partTwo() {
    const numbers: itemStructure[] = [];
    const symbols: itemStructure[] = [];
    let total = 0;

    data.map((row, index) => {
        numbers.push(...restructure([...row.matchAll(/\d+/g)],index));
        symbols.push(...restructure([...row.matchAll(/\*/g)],index));
    })
    symbols.map((item) => {
        let gears = [];
        numbers.filter((number) => number.row > item.row-2 && number.row < item.row +2).map(number => {
            if (plusMinus(number.position,number.end).indexOf(item.position) !== -1) {
                gears.push(number.key)
            }
        })
        if (gears.length === 2){
            total += gears[0]*gears[1];
        }
    })
    //84289137
    //console.log(total);

}

const partOneBench = [];
const partTwoBench = [];

for (let i = 0;i<10000; i++) {
    const t1 = performance.now()
    partOne();
    partOneBench.push(performance.now() - t1);

    const t2 = performance.now()
    partTwo()
    partTwoBench.push(performance.now() - t2);
}

function avgTime(list: number[]) {
    let totalTime = list.reduce((x,y) => {
        return x+y;
    })
    return totalTime / list.length
}

console.log('Part One avg time: ',avgTime(partOneBench))
console.log('Part Two avg time: ',avgTime(partTwoBench))


