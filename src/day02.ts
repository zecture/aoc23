import * as fs from 'fs';

const data = fs.readFileSync('./data/day02.txt', 'utf-8').split('\n');

function partOne() {
    let t1 = performance.now();
    const maxCubes = {
        red: 12,
        green: 13,
        blue: 14
    }
    let totalPoints = 0;

    data.map(row => {
        let isValid = true
        row.match(/\d{1,2}\s[A-Za-z]{3,5}/g).map(item => { 
            if ( item.split(' ')[0] > maxCubes[item.split(' ')[1]]) isValid = false;
        });
        totalPoints += isValid && parseInt(row.split(':')[0].match(/\d{1,3}/)[0]);
    })
    let t3 = performance.now()
    return (t3 - t1);
}

function partTwo() {
    let t2 = performance.now();
    let totalPoints = 0;

    data.map(row => {
        const minimumAmounts = { red: 0, blue: 0, green: 0 };
        row.match(/\d{1,2}\s[A-Za-z]{3,5}/g).map(item => {
            let [ amount, color ] = item.split(' ');
            if (minimumAmounts[color] < parseInt(amount)) { minimumAmounts[color] = parseInt(amount) }
        });
        totalPoints += Object.values(minimumAmounts).reduce((x,y) => { return x*y })
    })
    //console.log(totalPoints);
    let t4 = performance.now()
    return (t4 - t2);
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



