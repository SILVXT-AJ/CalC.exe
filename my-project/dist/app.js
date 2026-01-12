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
const path = __importStar(require("path"));
const ts = __importStar(require("typescript"));
const source = `
const hello: string = "hello";
console.log(hello);
`;
// transpile to CommonJS JS
const result = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2017 },
    reportDiagnostics: true
});
// show diagnostics (typed)
if (result.diagnostics && result.diagnostics.length > 0) {
    result.diagnostics.forEach((diagnostic) => {
        const msg = ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n');
        const pos = diagnostic.file && diagnostic.start !== undefined
            ? diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start)
            : undefined;
        console.error('TS diagnostic:', msg, pos);
    });
    process.exit(1);
}
console.log('Transpiled JS:\n', result.outputText);
console.log('CalC starting');
const args = process.argv.slice(2);
if (args.length === 0) {
    console.log('Usage: calc <a> <op> <b>');
    process.exit(0);
}
const [aStr, op, bStr] = args;
const a = Number(aStr);
const b = Number(bStr);
if (Number.isNaN(a) || Number.isNaN(b)) {
    console.error('Invalid numbers');
    process.exit(1);
}
let resultCalc;
switch (op) {
    case '+':
        resultCalc = a + b;
        break;
    case '-':
        resultCalc = a - b;
        break;
    case '*':
        resultCalc = a * b;
        break;
    case '/':
        resultCalc = b === 0 ? NaN : a / b;
        break;
    default:
        console.error('Unsupported operator. Use + - * /');
        process.exit(1);
}
console.log(`${a} ${op} ${b} = ${resultCalc}`);
// show a runtime file if present
const sample = path.join(__dirname, 'data.txt');
if (fs.existsSync(sample))
    console.log('data.txt found');
else
    console.log('no data.txt');
