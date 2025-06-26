import * as vscode from 'vscode';
// @ts-ignore
import Kuroshiro from 'kuroshiro';
// @ts-ignore
import KuromojiAnalyzer from 'kuroshiro-analyzer-kuromoji';

export function activate(context: vscode.ExtensionContext) {
  console.log('furigana-vscode is activated.');

  const disposable = vscode.commands.registerCommand('furigana-vscode.insertFurigana', insertFurigana);

  context.subscriptions.push(disposable);
}

export function deactivate() {}

async function insertFurigana() {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    vscode.window.showInformationMessage('No active editor.');
    return;
  }

  const selection = getSelection(editor);
  let text = editor.document.getText(selection);

  try {
    let ruby = await processString(text);

    if (!ruby) {
      return;
    }

    editor.edit((editBuilder) => {
      editBuilder.replace(selection, ruby);
    });
  } catch (err) {
    if (err instanceof Error) {
      vscode.window.showErrorMessage('Furigana conversion failed: ' + err.message);
    } else {
      vscode.window.showErrorMessage('Furigana conversion failed (non-error): ' + String(err));
    }
  }
}

async function processString(input: string): Promise<string | undefined> {
  await ensureInitialized();

  if (!Kuroshiro.Util.hasJapanese(input)) {
    vscode.window.showInformationMessage('Please select Japanese text.');
    return;
  }

  const result: string = await kuroshiro.convert(input, {
    to: 'hiragana', // hiragana / katakana / romaji
    mode: 'okurigana', // normal / spaced / okurigana / furigana
    delimiter_start: '{',
    delimiter_end: '}',
  });

  return result;
}

function getSelection(editor: vscode.TextEditor): vscode.Range {
  const selection = editor.selection;
  if (!selection.isEmpty) {
    return selection;
  } else {
    const pos = selection.active;
    const lineText = editor.document.lineAt(pos.line).text;

    let start = pos.character;
    let end = pos.character;

    while (start > 0 && Kuroshiro.Util.isKanji(lineText[start - 1])) {
      start--;
    }
    while (end < lineText.length && Kuroshiro.Util.isKanji(lineText[end])) {
      end++;
    }

    const range = new vscode.Range(new vscode.Position(pos.line, start), new vscode.Position(pos.line, end));

    return range;
  }
}

const kuroshiro = new Kuroshiro();
let initialized = false;

async function ensureInitialized() {
  if (!initialized) {
    await kuroshiro.init(new KuromojiAnalyzer());
    initialized = true;
  }
}

