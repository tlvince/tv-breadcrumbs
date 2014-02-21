'use strict';

var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({ port: LIVERELOAD_PORT });
var mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};

module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '// <%= pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "// " + pkg.homepage + "\\n" : "" %>' +
      '// © <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
      '// License: <%= pkg.license %>\n',
    // Task configuration.
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      dist: {
        src: ['src/**/*.js', '.tmp/**/*.js'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src: '<%= concat.dist.dest %>',
        dest: 'dist/<%= pkg.name %>.min.js'
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      sources: {
        src: ['src/**/*.js']
      }
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      sources: {
        files: '<%= jshint.sources.src %>',
        tasks: ['jshint:sources']
      },
      serve: {
        options: {
          livereload: LIVERELOAD_PORT
        },
        files: [
          'sample/*.{css,js,html}',
        ]
      }
    },
    connect: {
      options: {
        port: 9000,
        hostname: 'localhost'
      },
      livereload: {
        options: {
          middleware: function (connect) {
            return [
              lrSnippet,
              mountFolder(connect, 'sample')
            ];
          }
        }
      }
    },
    open: {
      server: {
        url: 'http://localhost:<%= connect.options.port %>/index.html'
      }
    },
    html2js: {
      options: {
        module: 'tv.breadcrumbs.tpls'
      },
      main: {
        src: ['src/**/*.html'],
        dest: '.tmp/templates.js'
      },
    },
    ngmin: {
      dist: {
        files: [{
          src: '<%= concat.dist.dest %>',
          dest: '<%= concat.dist.dest %>',
        }]
      }
    },
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-html2js');
  grunt.loadNpmTasks('grunt-ngmin');

  // Default task.
  grunt.registerTask('default', ['jshint', 'html2js', 'concat', 'ngmin', 'uglify']);

  grunt.registerTask('serve', ['connect:livereload', 'open', 'watch']);

};
