module.exports = function (grunt, options) {

  return {

    'from-develop': {
      options: {
        cwd: '',
        branch: 'develop',
        message: 'Merge release v<%= pkg.version %>'
      }
    }

  }

};
