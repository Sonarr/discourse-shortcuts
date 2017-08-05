import { registerOption } from 'pretty-text/pretty-text';

const tokenMatchingRegex = /\(\((.+?)\)\)/g;

const shortcutTokens = {
  'appdata': 'https://github.com/Sonarr/Sonarr/wiki/AppData-Directory',
  'appdata folder': 'https://github.com/Sonarr/Sonarr/wiki/AppData-Directory',
  'appdata directory': 'https://github.com/Sonarr/Sonarr/wiki/AppData-Directory',
  'appdata path': 'https://github.com/Sonarr/Sonarr/wiki/AppData-Directory',
  'API': 'https://github.com/Sonarr/Sonarr/wiki/API',
  'debug log': 'https://github.com/Sonarr/Sonarr/wiki/Log-Files',
  'debug logs': 'https://github.com/Sonarr/Sonarr/wiki/Log-Files',
  'debug logging': 'https://github.com/Sonarr/Sonarr/wiki/Log-Files',
  'trace log': 'https://github.com/Sonarr/Sonarr/wiki/Log-Files',
  'trace logs': 'https://github.com/Sonarr/Sonarr/wiki/Log-Files',
  'trace logging': 'https://github.com/Sonarr/Sonarr/wiki/Log-Files',
  'log files': 'https://github.com/Sonarr/Sonarr/wiki/Log-Files',
  'faq': 'https://github.com/Sonarr/Sonarr/wiki/FAQ',
  'backup': 'https://github.com/Sonarr/Sonarr/wiki/Backup-and-Restore',
  'backups': 'https://github.com/Sonarr/Sonarr/wiki/Backup-and-Restore',
  'restore': 'https://github.com/Sonarr/Sonarr/wiki/Backup-and-Restore',
  'restoring': 'https://github.com/Sonarr/Sonarr/wiki/Backup-and-Restore',
  'backup and restore': 'https://github.com/Sonarr/Sonarr/wiki/Backup-and-Restore',
  'release branches': 'https://github.com/Sonarr/Sonarr/wiki/Release-Branches',
  'develop branch': 'https://github.com/Sonarr/Sonarr/wiki/Release-Branches'
};

registerOption((siteSettings, opts) => {
  opts.features.shortcuts = true;
  opts.shortcutTokens = shortcutTokens;
});

function replaceShortcut(text, tokens) {
  const result = text.replace(tokenMatchingRegex, function (match, possibleToken) {
    const possibleTokenLowerCase = possibleToken.toLowerCase();

    if (tokens.hasOwnProperty(possibleTokenLowerCase)) {
      return `[${possibleToken}] (${tokens[possibleTokenLowerCase]})`;
    }

    return match;
  });

  return result;
};

export function setup(helper) {
  helper.addPreProcessor(text => {
    return replaceShortcut(text, helper.getOptions().shortcutTokens);
  });
}
