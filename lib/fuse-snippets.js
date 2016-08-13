'use babel';

import FuseSnippetsView from './fuse-snippets-view';
import { CompositeDisposable } from 'atom';

export default {

  fuseSnippetsView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.fuseSnippetsView = new FuseSnippetsView(state.fuseSnippetsViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.fuseSnippetsView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'fuse-snippets:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.fuseSnippetsView.destroy();
  },

  serialize() {
    return {
      fuseSnippetsViewState: this.fuseSnippetsView.serialize()
    };
  },

  toggle() {
    console.log('FuseSnippets was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
