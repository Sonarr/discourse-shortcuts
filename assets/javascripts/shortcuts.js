function findTokenValue (token) {
  var tokens = {
    'debug log': 'https://github.com/Sonarr/Sonarr/wiki/Log-Files',
    'debug logs': 'https://github.com/Sonarr/Sonarr/wiki/Log-Files',
    'debug logging': 'https://github.com/Sonarr/Sonarr/wiki/Log-Files',
    'trace log': 'https://github.com/Sonarr/Sonarr/wiki/Log-Files',
    'trace logs': 'https://github.com/Sonarr/Sonarr/wiki/Log-Files',
    'trace logging': 'https://github.com/Sonarr/Sonarr/wiki/Log-Files',
    'log files': 'https://github.com/Sonarr/Sonarr/wiki/Log-Files',
    'faq': 'https://github.com/Sonarr/Sonarr/wiki/FAQ',
    'backup': 'https://github.com/Sonarr/Sonarr/wiki/Backup-and-Restore',
    'restore': 'https://github.com/Sonarr/Sonarr/wiki/Backup-and-Restore',
    'restoring': 'https://github.com/Sonarr/Sonarr/wiki/Backup-and-Restore',
    'backup and restore': 'https://github.com/Sonarr/Sonarr/wiki/Backup-and-Restore',
    'release branches': 'https://github.com/Sonarr/Sonarr/wiki/Release-Branches',
    'develop branch': 'https://github.com/Sonarr/Sonarr/wiki/Release-Branches'
  }

  var tokenValue = tokens[token.toLowerCase()];

  if (tokenValue) {
    return tokenValue;
  }

  return null;
}

Discourse.Dialect.inlineBetween({
  start: '((',
  stop: '))',
  rawContents: true,

  emitter: function(token) {
    var tokenValue = findTokenValue(token);

    if (tokenValue) {
      return ['a', {"href": tokenValue}, token];
    }
  }
});
