module.exports = function(grunt) {

    'use strict';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        fileName: "main",

        concat: {
            js: {
                options: {
                    banner: '/* <%= pkg.name %> <%= pkg.version %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
                    dir: 'js/'
                },
                src: [
                    '<%= concat.js.options.dir %>*.js'
                ],

                dest: 'dist/js/<%= fileName %>.js'
            }
        },

        uglify: {
            options: {
                banner: '/* <%= pkg.name %><%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'dist/js/<%= fileName %>.js',
                dest: 'dist/js/<%= fileName %>.min.js'
            }
        },

        // qunit: {
        //     files: ['test/*.html']
        // },

        jshint: {
            // files: ['gruntfile.js', 'js/bar.js', 'dist/*.js'],
            files: ['js/bar.js'],
            options: {
                globals: {
                    exports: true
                }
            }
        },

        watch: {
            files: ['js/*.js', 'css/*.css'],
            tasks: ['concat', 'uglify', 'jshint'],
            options: {
                debounceDelay: 250
            }
        }
    });

    // 负责合并
    grunt.loadNpmTasks( 'grunt-contrib-concat' );

    // 负责压缩js
    grunt.loadNpmTasks( 'grunt-contrib-uglify' );

    // 负责单元测试
    // grunt.loadNpmTasks( 'grunt-contrib-qunit' );

    // 负责代码验证
    grunt.loadNpmTasks( 'grunt-contrib-jshint' );

    // 负责监听文件变化
    grunt.loadNpmTasks( 'grunt-contrib-watch' );

    // Default task(s).
    grunt.registerTask( 'default', ['concat', 'uglify', 'jshint'] );
    grunt.registerTask( 'watch', ['concat', 'uglify', 'jshint'] );
};