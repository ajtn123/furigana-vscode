import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  console.log('furigana-vscode is activated.');

  let disposable = vscode.commands.registerCommand('furigana-inserter.insertFurigana', () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      vscode.window.showInformationMessage('No editor is active');
      return;
    }

    const selection = editor.selection;
    const selectedText = editor.document.getText(selection);

    const textToInsert = `<ruby>${selectedText}<rt>ふりがな</rt></ruby>`;

    editor.edit((editBuilder) => {
      editBuilder.replace(selection, textToInsert);
    });
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}

