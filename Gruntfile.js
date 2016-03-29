module.exports = function(grunt) {

  // Init grunt configuration
  grunt.initConfig({
    // Read package configuration
    pkg: grunt.file.readJSON('package.json'),

    // Define clean task
    clean: {
      options: {
        dot: true
      },
      dist: ['tmp', 'dist/*']
    },

    // Define string-replace task
    'string-replace': {
      options: {
        // replace $inject by $opalInject
        replacements: [{
          pattern: /(\$inject)/ig,
          replacement: '\$opalInject'
        },
        // replace $scope by $opalScope
        {
          pattern: /(\$scope)/ig,
          replacement: '\$opalScope'
        },
        // replace inject by opalInject
        {
          pattern: /(\inject)/g,
          replacement: '\opalInject'
        }]
      },
      dist: {
        files: {
          'tmp/': ['bower_components/asciidoctor.js/dist/asciidoctor-all.min.js']
        }
      }
    },

    // Define concat task
    concat: {

      options: {
        stripBanners: true,
        banner: '/*!\n <%= pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %> \n\n' +
        '======================================= \n' +
        'opal version : <%= pkg.asciidoc.opal %> \n' +
        'asciidoctor version : <%= pkg.asciidoc.asciidoctor %> \n' +
        '*/\n\n',
      },
      dist: {
        src: [
        'tmp/bower_components/asciidoctor.js/dist/asciidoctor-all.min.js',
        'src/asciidoc.js'
        ],
        dest: 'dist/asciidoc.all.js'
      }
    },

    // Define copy task
    copy: {
      dist: {
        files: [{
          expand: true,
          cwd: 'bower_components/asciidoctor.js/examples/',
          src: ['*.css'],
          dest: 'dist/',
          filter: 'isFile'
        }]
      }
    },

    // Define Karma task
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        singleRun: true
      }
    }

  });

  // Load tasks
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-string-replace');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-karma');

  // Define defaults task
  grunt.registerTask('default', ['dist']);
  grunt.registerTask('dist', ['clean', 'string-replace', 'concat', 'copy']);
  grunt.registerTask('test', ['dist', 'karma']);

};
