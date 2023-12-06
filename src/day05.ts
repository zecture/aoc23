import * as fs from 'fs';

const inputdata = fs.readFileSync('./data/day05.txt', 'utf-8');

const testData = (
`seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`
);

const flowPath = [
    'seed-to-soil map', 
    'soil-to-fertilizer map',
    'fertilizer-to-water map',
    'water-to-light map',
    'light-to-temperature map',
    'temperature-to-humidity map',
    'humidity-to-location map'
];
/* seeds: 79 14 55 13 */
function getSeedList(string): { start: number,end: number}[] {
    const array = [];
    const inputArray = string.trim().split(': ')[1];
    console.log(inputArray);
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

    function findNextNumber(source,map, isDone?):number {
        console.log('findNext',flowPath[map], source)
        let sourceNumber = source
        if (!isDone){
            data[flowPath[map]].map(obj => {
                console.log(obj);
                if (source > obj.sourceRange && source < obj.sourceRange+obj.range) {
                    sourceNumber = source+(obj.destRange-obj.sourceRange);
                    
                }
            })
        }
        if (flowPath[map] === 'humidity-to-location map') {
            return sourceNumber
        } else {
            return findNextNumber(sourceNumber,map+1)
        }
    }

    const data = {};
    const seedToLocationMap = []
    const location = [];
    const asd = inputdata.split('\n\n');
    const seeds = asd[0].replace(/seeds:/,'').trim().split(' ').map(Number);

    asd.map(item => {
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
            data[name] = map;

        }
    })


    
    seeds.map((item,index) => {
        const loc = findNextNumber(item,0)
        seedToLocationMap.push({
            seed: item,
            location: loc
        }),
        location.push(loc);

        
    })
    console.log(Math.min(...location));
}

async function partTwo() {

    function findReverseNumber(source: number, map: number):number {
        //let sourceNumber = source;
        operations[flowPath[map]].map(obj => {
            if (source > obj.destRange && source < obj.destRange+obj.range) {
                source +=obj.sourceRange-obj.destRange
            }
        })
        if (map === 0) {
            let seed = -1;
            seeds.map(item => {
                if (source >= item.start && source <= item.start+item.end){
                    seed = source
                }
            })
            return seed;
        
        } else {
            return findReverseNumber(source,map-1);
        }
    }

    function findNextNumber(source: number,map: number):number {
        //return new Promise(async (resolve,reject) => {
            let sourceNumber = source
            operations[flowPath[map]].map(obj => {
                if (source > obj.sourceRange && source < obj.sourceRange+obj.range) {
                    sourceNumber += obj.destRange-obj.sourceRange;
                }
            })
            if (flowPath[map] === 'humidity-to-location map') {
                return sourceNumber
            } else {
                return findNextNumber(sourceNumber,map+1)
            }
    }

    const t = performance.now();

    const maps = testData.split('\n\n');
    const seeds: { start: number, end: number }[] = getSeedList(maps[0]);
    maps.shift();
    const operations = getOperation(maps);
    const operationsIndex = Object.keys(operations).length;
    const lowest = {
        location: null,
        seed: null
    };
/*     let i = 0;
    while (lowest.location === null) {
        let lowestSeed = findReverseNumber(i,flowPath.length-1);
        if (lowestSeed !== -1) {
            lowest.location = i-1;
            lowest.seed = lowestSeed;
        }
        i++;
    } */

    for (let i = 0; lowest.location === null; i++){
        let lowestSeed = findReverseNumber(i,flowPath.length-1);
        console.log(i, lowestSeed);
        if (lowestSeed !== -1) {
            lowest.location = i;
            lowest.seed = lowestSeed;
        }
    }
    console.log(findReverseNumber(lowest.location,flowPath.length-1));
    console.log('Reverse lowest:',lowest);
    console.log('Reverse inverse check', findNextNumber(lowest.seed,0));


    
    //console.log(avgTime(times));
    console.log('Total Time', performance.now()-t);
    console.log(Object.keys(operations).length);


}





partTwo();
/* 
const partOneBench = [];
const partTwoBench = [];

for (let i = 0;i<20000; i++) {
    const t1 = performance.now()
    partTwo();
    partTwoBench.push(performance.now() - t1);

}

function avgTime(list: number[]) {
    let totalTime = list.reduce((x,y) => {
        return x+y;
    })
    return totalTime / list.length
}

console.log('Part Two avg time: ',avgTime(partTwoBench))
 */