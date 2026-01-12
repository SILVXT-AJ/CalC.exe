import * as fs from 'fs';
import * as path from 'path';
import * as ts from 'typescript';

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
  result.diagnostics.forEach((diagnostic: ts.Diagnostic) => {
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

let resultCalc: number;
switch (op) {
  case '+': resultCalc = a + b; break;
  case '-': resultCalc = a - b; break;
  case '*': resultCalc = a * b; break;
  case '/': resultCalc = b === 0 ? NaN : a / b; break;
  default:
    console.error('Unsupported operator. Use + - * /');
    process.exit(1);
}

console.log(`${a} ${op} ${b} = ${resultCalc}`);

// show a runtime file if present
const sample = path.join(__dirname, 'data.txt');
if (fs.existsSync(sample)) console.log('data.txt found');
else console.log('no data.txt');