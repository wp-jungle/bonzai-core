module.exports = function (grunt, options) {

  return {

    develop: {
      options: {
        cwd: '',
        branch: 'develop',
        create: false,
        overwrite: false
      }
    },

    master: {
      options: {
        cwd: '',
        branch: 'master',
        create: false,
        overwrite: false
      }
    }

  }

};
