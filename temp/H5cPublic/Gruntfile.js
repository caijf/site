module.exports = function(grunt) {

    'use strict';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        fileName: "main",

        concat: {
            js: {
                options: {
                    banner: '/* <%= pkg.name %> <%= pkg.version %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
                    dir: 'js/',
                    separator: ';'
                },
                src: [
                    '<%= concat.js.options.dir %>*.js'
                ],

                dest: 'dist/js/<%= fileName %>.js'
            },
            css: {
                src: ['css/*.css'],
                dest: 'dist/css/<%= fileName %>.css'
            }
        },

        less: { 
            main: {
                expand: true,
                cwd: './less/',
                src: ['**/*.less'],
                dest: './css/',
                ext: '.css' 
            } 
        },

        cssmin: {
            options: {
                banner: '/* <%= pkg.name %><%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'dist/css/<%= fileName %>.css',
                dest: 'dist/css/<%= fileName %>.min.css'
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
            js: {
                files: ['js/*.js'],
                tasks: ['concat:js', 'uglify', 'jshint']
            },
            css: {
                options: {
                    livereload: true
                },
                files: ['less/*.less', 'css/*.css'],
                tasks: ['less', 'concat:css', 'cssmin']
            }
        }
    });

    // 负责合并
    grunt.loadNpmTasks( 'grunt-contrib-concat' );

    // 负责编译less
    grunt.loadNpmTasks( 'grunt-contrib-less' );

    // 负责压缩css
    grunt.loadNpmTasks( 'grunt-contrib-cssmin' );

    // 负责压缩js
    grunt.loadNpmTasks( 'grunt-contrib-uglify' );

    // 负责js代码验证
    grunt.loadNpmTasks( 'grunt-contrib-jshint' );

    // 负责监听文件变化
    grunt.loadNpmTasks( 'grunt-contrib-watch' );

    // Default task(s).
    grunt.registerTask( 'default', ['less', 'concat', 'cssmin', 'uglify', 'jshint'] );
    grunt.registerTask( 'w', 'watch' );
};