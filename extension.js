const vscode = require('vscode');
const axios = require('axios');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    console.log('Congratulations, your extension "planto" is now active!');

    let disposable = vscode.commands.registerCommand('planto.helloWorld', async function () {
        console.log('Command "planto.helloWorld" triggered');
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const document = editor.document;
            const selection = editor.selection;
            const text = document.getText(selection);

            try {
                const response = await axios.post('https://api.gemini.com/v1/completions', {
                    prompt: text,
                    max_tokens: 100,
                    temperature: 0.5,
                }, {
                    headers: {
                        'Authorization': `Bearer your-gemini-api-key`,
                        'Content-Type': 'application/json'
                    }
                });
                const completion = response.data.choices[0].text.trim();
                editor.edit(editBuilder => {
                    editBuilder.insert(selection.end, completion);
                });
            } catch (error) {
                console.error('Error:', error);
            }
        }
    });

    context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
}
