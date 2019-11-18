import { registerOption } from 'pretty-text/pretty-text';

const shortcutTokens = {
  'appdata': 'https://github.com/Sonarr/Sonarr/wiki/AppData-Directory',
  'appdata folder': 'https://github.com/Sonarr/Sonarr/wiki/AppData-Directory',
  'appdata directory': 'https://github.com/Sonarr/Sonarr/wiki/AppData-Directory',
  'appdata path': 'https://github.com/Sonarr/Sonarr/wiki/AppData-Directory',
  'API': 'https://github.com/Sonarr/Sonarr/wiki/API',
  'debug log': 'https://github.com/Sonarr/Sonarr/wiki/Logging-and-Log-Files',
  'debug logs': 'https://github.com/Sonarr/Sonarr/wiki/Logging-and-Log-Files',
  'debug logging': 'https://github.com/Sonarr/Sonarr/wiki/Logging-and-Log-Files',
  'trace log': 'https://github.com/Sonarr/Sonarr/wiki/Logging-and-Log-Files',
  'trace logs': 'https://github.com/Sonarr/Sonarr/wiki/Logging-and-Log-Files',
  'trace logging': 'https://github.com/Sonarr/Sonarr/wiki/Logging-and-Log-Files',
  'log files': 'https://github.com/Sonarr/Sonarr/wiki/Logging-and-Log-Files',
  'faq': 'https://github.com/Sonarr/Sonarr/wiki/FAQ',
  'backup': 'https://github.com/Sonarr/Sonarr/wiki/Backup-and-Restore',
  'backups': 'https://github.com/Sonarr/Sonarr/wiki/Backup-and-Restore',
  'restore': 'https://github.com/Sonarr/Sonarr/wiki/Backup-and-Restore',
  'restoring': 'https://github.com/Sonarr/Sonarr/wiki/Backup-and-Restore',
  'backup and restore': 'https://github.com/Sonarr/Sonarr/wiki/Backup-and-Restore',
  'release branches': 'https://github.com/Sonarr/Sonarr/wiki/Release-Branches',
  'develop branch': 'https://github.com/Sonarr/Sonarr/wiki/Release-Branches'
};

function replaceShortcut(buffer, matches, state) {
  const [match, possibleToken] = matches;

  const possibleTokenLowerCase = possibleToken.toLowerCase();

  if (shortcutTokens.hasOwnProperty(possibleTokenLowerCase)) {
    const tag = 'a'
    const tokenHref = shortcutTokens[possibleTokenLowerCase]

    const openToken = new state.Token('shortcut_open', tag, 1);
    openToken.attrs = [['href', tokenHref]];
    buffer.push(openToken);

    const contentToken = new state.Token('text', '', 0);
    contentToken.content = possibleToken;
    buffer.push(contentToken);

    const closeToken = new state.Token('shortcut_close', tag, -1);
    buffer.push(closeToken);
  }
}

export function setup(helper) {
  helper.registerPlugin(md => {
    md.core.textPostProcess.ruler.push('shortcuts', {
      matcher: /\(\(([^(].+?[^)])\)\)/,  //regex flags are NOT supported
      onMatch: replaceShortcut
    });
  });
}
