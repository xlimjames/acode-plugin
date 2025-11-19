/* global acode */

class VarSuggestPlugin {
  constructor() {
    this.id = 'var-suggest';
    this.name = 'Variable Suggest';
    this._editorListenerSet = false;
  }

  async init() {
    const editorManager = acode.require('editorManager');

    // When switching files
    editorManager.on('switch-file', () => {
      const editor = editorManager.editor;
      if (editor) {
        this.setupAutocomplete(editor);
      }
    });

    // For current active file, if any
    const editor = editorManager.editor;
    if (editor) {
      this.setupAutocomplete(editor);
    }
  }

  async destroy() {
    // You can clean up here if needed (e.g., remove completers)
  }

  setupAutocomplete(editor) {
    // Avoid setting up twice
    if (editor._varSuggestEnabled) return;
    editor._varSuggestEnabled = true;

    /**
     * ACE EDITOR COMPLETER
     * editor.completers is used by Ace to gather completion sources
     */
    if (!editor.completers) {
      editor.completers = [];
    }

    const varCompleter = {
      getCompletions: (ed, session, pos, prefix, callback) => {
        try {
          const code = session.getValue();
          const vars = this.extractVars(code);

          const completions = vars.map((name) => ({
            caption: name,  // what you see in list
            value: name,    // what is inserted
            meta: 'var',    // small label on the right
            score: 1000     // priority
          }));

          callback(null, completions);
        } catch (e) {
          callback(null, []);
        }
      }
    };

    editor.completers.push(varCompleter);
  }

  /**
   * Extract variable names from JS-like code:
   *  const bayag = 123;
   *  let pepe = 'hey';
   *  var utong = true;
   */
  extractVars(code) {
    const names = new Set();
    const varRegex = /\b(const|let|var)\s+([a-zA-Z_$][\w$]*)/g;
    let match;

    while ((match = varRegex.exec(code)) !== null) {
      names.add(match[2]);
    }

    return [...names];
  }
}

if (window.acode) {
  const plugin = new VarSuggestPlugin();

  acode.setPluginInit('var-suggest', async () => {
    await plugin.init();
  });

  acode.setPluginUnmount('var-suggest', async () => {
    await plugin.destroy();
  });
}
