import { compile } from 'typescript';
import * as fs from 'fs';
import * as path from 'path';

const entryFile = path.join(__dirname, 'index.ts');
const outputDir = path.join(__dirname, 'dist');

function compileTypeScript() {
    const result = compile(entryFile, {
        outDir: outputDir,
        target: 'ES6',
        module: 'commonjs',
        strict: true,
        esModuleInterop: true,
    });

    if (result.diagnostics.length) {
        result.diagnostics.forEach(diagnostic => {
            console.error(diagnostic.messageText);
        });
    } else {
        console.log('Compilation successful. Executable generated in dist directory.');
    }
}

function runApp() {
    console.log('Running the application...');
    // Add application logic here
}

compileTypeScript();
runApp();