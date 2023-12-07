import * as fs from 'fs';

const data = fs.readFileSync(process.env.TEST ? './data/day05.test.txt' : './data/day05.txt', 'utf-8');

function getSeedList(string): { start: number,end: number}[] {
    const array = [];
    const inputArray = string.trim().split(': ')[1];
    inputArray.split(' ').map((val, index) => {
        if (val) {
            if (index % 2 === 0) {
                array.push({
                    start: parseInt(val),
                    end: 0
                })
            } else {
                array[array.length-1].end = parseInt(val);
            }
        }
    });
    return array;
}

function getOperation(list):object {
    const object = {};
    list.map(item => {
        const lines = item.split('\n');
        const name = lines[0].replace(':','').trim();
        const map = []
        lines.slice(1).map(line => {
            const [destRange, sourceRange, range] = line.split(' ').map(Number);
            map.push({
                destRange,
                sourceRange,
                range,
            });
        })
        if (map.length > 0){
            object[name] = map;

        }
    })
    return object;
}


function partOne() {

    function findNextNumber(source: number,map: number):number {
        let sourceNumber = source;
        operations[Object.keys(operations)[map]].map(obj => {
            if (source >= obj.sourceRange && source <= obj.sourceRange+obj.range && sourceNumber === source) {
                sourceNumber = source-obj.sourceRange + obj.destRange;
            }
        })
        if (map === Object.keys(operations).length-1) {
            return sourceNumber
        } else {
            return findNextNumber(sourceNumber,map+1)
        }
    }

    const maps = data.split('\n\n');
    const seeds: { start: number, end: number }[] = getSeedList(maps[0]);
    maps.shift();
    const operations = getOperation(maps);
    const location = [];

    seeds.map((item) => {
        location.push(findNextNumber(item.start,0));
    })
    //console.log(Math.min(...location));
}

async function partTwo() {

    function findReverseNumber(source: number, map: number):number {
        let newSource = source;
        operations[Object.keys(operations)[map]].map(obj => {
            if (source >= obj.destRange && source <= obj.destRange+obj.range) {
                newSource = source + (obj.sourceRange - obj.destRange)
            }
        })
        if (map === 0) {
            let seed = -1;
            seeds.map(item => {
                if (newSource >= item.start && newSource <= item.start+item.end){
                    seed = newSource
                }
            })
            return seed;
        
        } else {
            return findReverseNumber(newSource,map-1);
        }
    }

    const maps = data.split('\n\n');
    const seeds: { start: number, end: number }[] = getSeedList(maps[0]);
    maps.shift();
    const operations = getOperation(maps);
    const operationsIndex = Object.keys(operations).length-1;

    const closestLocation = {
        location: null,
        seed: null
    };

    for (let i = 0; closestLocation.location === null; i++){
        let lowestSeed = findReverseNumber(i,operationsIndex);
        if (lowestSeed !== -1) {
            closestLocation.location = i;
            closestLocation.seed = lowestSeed;
        }
    }
    //console.log(closestLocation);

}


const partOneBench = [];
const partTwoBench = [];

for (let i = 0;i<10; i++) {
    const t1 = performance.now()
    partOne();
    partOneBench.push(performance.now() - t1);
 
    const t2 = performance.now()
    partTwo();
    partTwoBench.push(performance.now() - t2);
    console.log('Part 2, Run',i,'took :',performance.now()-t2) 
}

function avgTime(list: number[]) {
    let totalTime = list.reduce((x,y) => {
        return x+y;
    })
    return totalTime / list.length
}
console.log('Part One avg time: ',avgTime(partOneBench),'ms')
console.log('Part Two avg time: ',avgTime(partTwoBench),'ms')