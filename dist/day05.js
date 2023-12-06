"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const inputdata = fs.readFileSync('./data/day05.txt', 'utf-8');
const testData = (`seeds: 79 14 55 13

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
56 93 4`);
const flowPath = [
    'seed-to-soil map',
    'soil-to-fertilizer map',
    'fertilizer-to-water map',
    'water-to-light map',
    'light-to-temperature map',
    'temperature-to-humidity map',
    'humidity-to-location map'
];
function partOne() {
    function findNextNumber(source, map, isDone) {
        console.log('findNext', flowPath[map], source);
        let sourceNumber = source;
        if (!isDone) {
            data[flowPath[map]].map(obj => {
                console.log(obj);
                if (source > obj.sourceRange && source < obj.sourceRange + obj.range) {
                    sourceNumber = source + (obj.destRange - obj.sourceRange);
                }
            });
        }
        if (flowPath[map] === 'humidity-to-location map') {
            return sourceNumber;
        }
        else {
            return findNextNumber(sourceNumber, map + 1);
        }
    }
    const data = {};
    const seedToLocationMap = [];
    const location = [];
    const asd = inputdata.split('\n\n');
    const seeds = asd[0].replace(/seeds:/, '').trim().split(' ').map(Number);
    asd.map(item => {
        const lines = item.split('\n');
        const name = lines[0].replace(':', '').trim();
        const map = [];
        lines.slice(1).map(line => {
            const [destRange, sourceRange, range] = line.split(' ').map(Number);
            map.push({
                destRange,
                sourceRange,
                range,
            });
        });
        if (map.length > 0) {
            data[name] = map;
        }
    });
    seeds.map((item, index) => {
        const loc = findNextNumber(item, 0);
        seedToLocationMap.push({
            seed: item,
            location: loc
        }),
            location.push(loc);
    });
    console.log(Math.min(...location));
}
async function partTwo() {
    const t = performance.now();
    function findNextNumber(source, map) {
        //return new Promise(async (resolve,reject) => {
        let sourceNumber = source;
        data[flowPath[map]].map(obj => {
            if (source > obj.sourceRange && source < obj.sourceRange + obj.range) {
                sourceNumber = source + (obj.destRange - obj.sourceRange);
            }
        });
        if (flowPath[map] === 'humidity-to-location map') {
            return sourceNumber;
        }
        else {
            return findNextNumber(sourceNumber, map + 1);
        }
    }
    const data = {};
    //const seedToLocationMap = []
    const asd = inputdata.split('\n\n');
    const seeds = [];
    const asdasd = asd[0].replace(/seeds:/, '').trim().split(' ').map(Number);
    asdasd.map((val, index) => {
        if (val) {
            if (index % 2 === 0) {
                seeds.push({
                    start: val,
                    end: 0
                });
            }
            else {
                seeds[seeds.length - 1].end = val;
            }
        }
    });
    asd.map(item => {
        const lines = item.split('\n');
        const name = lines[0].replace(':', '').trim();
        const map = [];
        lines.slice(1).map(line => {
            const [destRange, sourceRange, range] = line.split(' ').map(Number);
            map.push({
                destRange,
                sourceRange,
                range,
            });
        });
        if (map.length > 0) {
            data[name] = map;
        }
    });
    let iteration = 0;
    const location = [];
    const promises = [];
    seeds.map(item => {
        iteration += item.end + 1;
        for (let i = item.start; i <= item.start + item.end; i++) {
            //promises.push(findNextNumberAsync(i,0))
            location.push(findNextNumber(i, 0));
        }
    });
    //const result = await Promise.all(promises);
    //console.log('async',result.length,'/',iteration,'min:',Math.min(...result));
    console.log('desync', location.length, '/', iteration, 'min:', Math.min(...location));
    //console.log(avgTime(times));
    console.log('Total Time', performance.now() - t);
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
