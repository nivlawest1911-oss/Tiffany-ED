const fs = require('fs');
const report = JSON.parse(fs.readFileSync('eslint-report-v2.json', 'utf8'));
const filesWithErrors = report.filter(f => f.errorCount > 0 || f.warningCount > 0);
let output = '';
filesWithErrors.forEach(f => {
    output += `File: ${f.filePath}\n`;
    output += `Errors: ${f.errorCount}, Warnings: ${f.warningCount}\n`;
    f.messages.forEach(m => {
        output += `  - [${m.severity === 2 ? 'ERROR' : 'WARN'}] ${m.ruleId}: ${m.message} (Line ${m.line}, Col ${m.column})\n`;
    });
    output += '---\n';
});
fs.writeFileSync('eslint-summary.txt', output);
