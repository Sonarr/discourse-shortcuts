function findTokenValue (token) {
  var tokens = {
    'debug log': 'https://github.com/Sonarr/Sonarr/wiki/Log-Files',
    'debug logs': 'https://github.com/Sonarr/Sonarr/wiki/Log-Files',
    'log files': 'https://github.com/Sonarr/Sonarr/wiki/Log-Files',
    'faq': 'https://github.com/Sonarr/Sonarr/wiki/FAQ'
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
