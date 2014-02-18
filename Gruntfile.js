module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    'string-replace': {
      options: {
        replacements: [
        {
          pattern: /(\$inject)/ig,
          replacement: '\$opalInject'
        }, 
        {
          pattern: /(\$scope)/ig,
          replacement: '\$opalScope'
        }
        ]
      },     
      dist: {
        files: {
          'tmp/': ['asciidoctorjs/dist/*.js']
        },
      }
    },
    concat: {
      options: {
        stripBanners: true,
        banner: '/*!\n <%= pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %> \n\n' +
        '======================================= \n' +
        'opal version : <%= pkg.asciidoc.opal %> \n' +
        'opal-sprockets version : <%= pkg.asciidoc.opalsprockets %> \n' +
        'asciidoctor version : <%= pkg.asciidoc.asciidoctor %> \n' +
        '*/\n\n',
      },
      dist: {
        src: [
          // Do not change order
          'tmp/asciidoctorjs/dist/opal.js',
          'tmp/asciidoctorjs/dist/asciidoctor.js',
          'src/<%= pkg.file %>.js',
        ],
        dest: 'dist/<%= pkg.file %>.all.js',
      },
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            'tmp',
            'dist/*',
          ]
        }]
      }
    },
    copy: {
      main: {
        files: [
          // includes files within path
          {
            expand: true, 
            cwd: 'asciidoctorjs/examples/',
            src: [
              '*.css',
              '!*.js',
              '!*.html',
              '!*.rb'
              ], 
            dest: 'dist/',
            filter: 'isFile'
          }
        ]
      }
    },
    // Test settings
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        singleRun: true
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  // 
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-string-replace');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-karma');

  // Default task(s).
  grunt.registerTask('default', ['dist']);
  grunt.registerTask('dist', ['clean', 'string-replace', 'concat', 'copy']);// Default task.
  grunt.registerTask('test', ['dist', 'karma']);

};