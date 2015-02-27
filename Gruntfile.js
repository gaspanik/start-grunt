module.exports = function(grunt) {

  grunt.initConfig({
    // get the configuration info from package.json
    // this way we can use things like name and version (pkg.name)
    pkg: grunt.file.readJSON('package.json'),

    // configure jshint to validate js files
    jshint: {
      options: {
        reporter: require('jshint-stylish')
      },
      build: ['Gruntfile.js', 'src/**/*.js']
    },

    // configure uglify to minify js files
    uglify: {
      options: {
        // This will add a nice comment to the top of our minified file.
        // Notice we are using the pkg.name from the package.json file.
        banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
      },
      build: {
        files: {
          'dist/js/magic.min.js': 'src/js/magic.js'
            // 'dist/js/magic.min.js': ['src/js/magic.js', 'src/js/magic2.js']
        }
      }
    },

    // compile less stylesheets to css
    less: {
      build: {
        files: {
          'dist/css/pretty.css': 'src/css/pretty.less'
        }
      }
    },

    // configure cssmin to minify css files
    cssmin: {
      options: {
        banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
      },
      build: {
        files: {
          'dist/css/style.min.css': 'src/css/style.css'
        }
      }
    },

    // configure watch to auto update
    watch: {
      stylesheets: {
        // for stylesheets, watch css and less files only run less and cssmin
        files: ['src/**/*.css', 'src/**/*.less'],
        tasks: ['less', 'cssmin']
      },
      scripts: {
        // for stylesheets
        files: 'src/**/*.js',
        tasks: ['jshint', 'uglify']
      }
    }

  });

  // load grunt plugins

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // create task
  grunt.registerTask('default', ['jshint', 'uglify', 'cssmin', 'less', 'watch']);

};
