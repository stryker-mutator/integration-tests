'use strict';


module.exports = function (grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    clean: {
      build: {
        src: ['+(test|src)/**/*+(.d.ts|.js|.map)']
      },
      coverage: {
        src: ['coverage']
      }
    },

    mochaTest: {
      integration: {
        options: {
          reporter: 'spec',
          timeout: 5000
        },
        src: ['test/**/*.js']
      }
    },
    ts: {
      options: {
        failOnTypeErrors: true
      },
      build: {
        tsconfig: {
          passThrough: true
        }
      },
    },

    'npm-contributors': {
      options: {
        commitMessage: 'chore: update contributors'
      }
    },
    tslint: {
      test: {
        src: ['test/**/*.ts']
      }
    }
  });

  grunt.registerTask('default', ['test']);
  grunt.registerTask('test', ['build', 'mochaTest']);
  grunt.registerTask('build', ['clean', 'tslint', 'ts']);

  grunt.registerTask('release', 'Build, bump and publish to NPM.', function (type) {
    grunt.task.run([
      'test',
      'npm-contributors'
    ]);
  });

};
