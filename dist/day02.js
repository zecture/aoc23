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
const data = fs.readFileSync('./data/day02.txt', 'utf-8').split('\n');
function partOne() {
    let t1 = performance.now();
    const maxCubes = {
        red: 12,
        green: 13,
        blue: 14
    };
    let totalPoints = 0;
    data.map(row => {
        let isValid = true;
        row.match(/\d{1,2}\s[A-Za-z]{3,5}/g).map(item => {
            if (item.split(' ')[0] > maxCubes[item.split(' ')[1]])
                isValid = false;
        });
        totalPoints += isValid && parseInt(row.split(':')[0].match(/\d{1,3}/)[0]);
    });
    let t3 = performance.now();
    return (t3 - t1);
}
function partTwo() {
    let t2 = performance.now();
    let totalPoints = 0;
    data.map(row => {
        const minimumAmounts = { red: 0, blue: 0, green: 0 };
        row.match(/\d{1,2}\s[A-Za-z]{3,5}/g).map(item => {
            let [amount, color] = item.split(' ');
            if (minimumAmounts[color] < parseInt(amount)) {
                minimumAmounts[color] = parseInt(amount);
            }
        });
        totalPoints += Object.values(minimumAmounts).reduce((x, y) => { return x * y; });
    });
    //console.log(totalPoints);
    let t4 = performance.now();
    return (t4 - t2);
}
const partOneBench = [];
const partTwoBench = [];
for (let i = 0; i < 10000; i++) {
    partOneBench.push(partOne());
    partTwoBench.push(partTwo());
}
function avgTime(list) {
    let totalTime = list.reduce((x, y) => {
        return x + y;
    });
    return totalTime / list.length;
}
console.log('Part One avg time: ', avgTime(partOneBench));
console.log('Part Two avg time: ', avgTime(partTwoBench));
