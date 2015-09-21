module.exports = function(grunt) {

    'use strict';

    // 读取requirejs配置信息
    var gruntCfg = grunt.file.readJSON('gruntCfg.json');
    var requirejsCfg = gruntCfg.requirejs;

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        mainDir: 'dist/',
        allMergeName: 'main',

        // 删除 dist 文件
        clean:["dist/*"],

        // 合并 css
        concat: {
            css: {
                src: ['css/*.css'],
                dest: '<%= mainDir %>css/<%= allMergeName %>.css'
            }
        },

        // requirejs amd 模块合并
        requirejs: {
            compile: requirejsCfg
        },

        cssmin: {
            options: {
                //banner: '/* <%= pkg.name %><%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: ['<%= mainDir %>css/<%= allMergeName %>.css'],
                dest: '<%= mainDir %>css/<%= allMergeName %>.min.css'
            }
        },

        // 将js下的js文件压缩到dist/js下
        uglify: {
            options: {
                //banner: '/* <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                expand: true,
                cwd: 'js',
                src: ['**/*.js'],
                dest: '<%= mainDir %>js/'
            },
            dist: {
                src: ['<%= mainDir %>js/<%= allMergeName %>.js'],
                dest: '<%= mainDir %>js/<%= allMergeName %>.min.js'
            }
        },

        // js语法检测
        // jshint: {
        //     // files: ['gruntfile.js', 'js/bar.js', '<%= mainDir %>*.js'],
        //     files: ['js/a.js'],
        //     options: {
        //         globals: {
        //             exports: true
        //         }
        //     }
        // },

        // 实时监听
        watch: {
            js: {
                files: ['js/*.js'],
                tasks: ['requirejs', 'uglify']
            },
            css: {
                options: {
                    livereload: true
                },
                files: ['css/*.css'],
                tasks: [ 'concat:css', 'cssmin']
            }
        }
    });

    // 合并文件
    grunt.loadNpmTasks( 'grunt-contrib-concat' );

    // 合并 amd js模块
    grunt.loadNpmTasks( 'grunt-contrib-requirejs' );

    // 压缩css
    grunt.loadNpmTasks( 'grunt-contrib-cssmin' );

    // 负责压缩js
    grunt.loadNpmTasks( 'grunt-contrib-uglify' );

    // 负责js代码验证
    // grunt.loadNpmTasks( 'grunt-contrib-jshint' );

    // 负责删除文件
    grunt.loadNpmTasks('grunt-contrib-clean');

    // 负责监听文件变化
    grunt.loadNpmTasks( 'grunt-contrib-watch' );

    // Default task(s).
    // grunt.registerTask( 'default', ['clean', 'requirejs' , 'concat', 'cssmin', 'uglify', 'jshint'] );
    grunt.registerTask( 'default', ['clean', 'requirejs' , 'concat', 'cssmin', 'uglify'] );
    grunt.registerTask( 'w', 'watch' );
};