module.exports = function(grunt) {

  grunt.initConfig({
    jshint: {
      files: ['Gruntfile.js', 'lib/**/*.js', 'index.js'],
      options: {
        "undef": true,
        "unused": true,
        "node": true
      }
    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jsbeautifier', 'jshint']
    },
    jsbeautifier: {
      files: ['<%= jshint.files %>'],
      options: {
        js: {
          indentSize: 2,
        }
      }
    },
    mochaTest: {
      src: ['test/**/*.js'],
      options: {
        timeout: 15000,
        color: true
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks("grunt-jsbeautifier");
  grunt.loadNpmTasks('grunt-mocha-test');

  grunt.registerTask('default', ['watch']);
  grunt.registerTask('build', ['jshint', 'jsbeautifier']);
  grunt.registerTask('test', ['jshint', 'mochaTest']);

};
