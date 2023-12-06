import * as fs from 'fs';
import test from 'node:test';

const data = fs.readFileSync('./data/day04.txt', 'utf-8');

const testData = (
`Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`
);

function partOne() {
    const dataArray = data.split('\n');
    let total = 0;
    dataArray.map(item => {
        const [game,win, numbers] = item.split(/[|,:]/g);
        const winningNumber = win.split(' ').map(numb => { if (parseInt(numb)) return numb });
        const myNumbers = numbers.split(' ').map(numb => { if (parseInt(numb)) return numb });
        /* console.log(winningNumber);
        console.log(myNumbers); */
        let rowTotal = 0.5;
        myNumbers.map(item => {
            if (item && winningNumber.indexOf(item) !== -1) { rowTotal = rowTotal*2; }
        })
        if (rowTotal >= 1) { total += rowTotal;}

    })
    //console.log(total);

}

function partTwo() {
    interface Game {
        gameNo: number;
        winningNumbers: string[];
        numbers: string[];
        hands: number;
    }
    //const dataArray = data.split('\n');
    let hands = 0;
    const dataArray: Game[] = data.trim().split('\n').map(item => {
        const [gameNumber, win, myNumbers] = item.split(/[|,:]/g);
        return {
            gameNo: parseInt(gameNumber.split(' ')[1]),
            winningNumbers: win.trim().split(' '),
            numbers: myNumbers.trim().split(' '),
            hands: 1
        } as Game;
    });

    dataArray.map((game,index) => {
        hands += game.hands
        let wins = 0;
        let iterator = 1;
        game.numbers.map(number => {
            if (number && game.winningNumbers.indexOf(number) !== -1) { 
                dataArray[index+iterator].hands = dataArray[index+iterator].hands + game.hands;
                iterator++;
            }
        })

    })
    //const hands: number = dataArray.reduce((x,y) =>  x.hands + y.hands)
    //console.log(hands);

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
