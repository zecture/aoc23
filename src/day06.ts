const prodData = (
`Time:        50     74     86     85
Distance:   242   1017   1691   1252`
)
    
const testData = (
`Time:      7  15   30
Distance:  9  40  200`
);


const test = false;
const data = test ? testData : prodData;


function parseData(string):[ times: number[], records: number[] ]  {
    const [ times, records] = string.split('\n').map(row => { 
        //magically turn a string into an array of numbers
        return ([...row.match(/\d+/g)]).map(string => { return parseInt(string) }); 
    });
    return [ times, records ];
}
function parseDataPartTwo(string: string):[ number, number ]  {
    const [ times, records] = string.split('\n').map(row => { 
        return parseInt(row.split(':')[1].replace(/ +/g,''));
    })
    return [ times, records ];
}

function beatRecord(time: number,record: number):number {
    let wins = 0;
    for (let charge = 1; charge<=time; charge++) {
        wins += (charge*(time-charge) > record) && 1
        
    }
    return wins;
}

function partOne() {
    const [ times, records ] = parseData(data)
    const wins = [];
    times.forEach((number, index) => {
        wins.push(beatRecord(number, records[index]));
    })
}

function partTwo() {
    const [ times, records ] = parseDataPartTwo(data)
    const wins = beatRecord(times, records);
}


function benchMark() {

const partOneBench = [];
const partTwoBench = [];

for (let i = 0;i<100; i++) {
    const t1 = performance.now()
    partOne();
    partOneBench.push(performance.now() - t1);
 
    const t2 = performance.now()
    partTwo();
    partTwoBench.push(performance.now() - t2);
}

function avgTime(list: number[]) {
    let totalTime = list.reduce((x,y) => {
        return x+y;
    })
    return totalTime / list.length
}
console.log('Part One avg time: ',avgTime(partOneBench),'ms')
console.log('Part Two avg time: ',avgTime(partTwoBench),'ms')

}

benchMark();