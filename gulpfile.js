const gulp = require('gulp');
const rename = require('gulp-rename');
const htmlmin = require('gulp-htmlmin');
const cssmin = require('gulp-cssmin');
const jsmin = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const concat = require('gulp-concat');
const sprite = require('gulp.spritesmith');
const less = require('gulp-less');
const path = require('path');


// 1. 压缩html
// gulp-htmlmin          
// $ cnpm i gulp-htmlmin -D
gulp.task('htmlmin', function() {
    return gulp.src('./src/html/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('./dist/html'));
});

// 2. 压缩css
// gulp-cssmin
// $ cnpm i gulp-cssmin -D
gulp.task('cssmin', function() {
    return gulp.src('./src/css/*.css')
        .pipe(cssmin())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('dist/css'));
});

// 3. 压缩js
// gulp-uglify
// $ cnpm i gulp-uglify -D
gulp.task('jsmin', function() {
    return gulp.src('./src/js/*.js')
        .pipe(jsmin())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('dist/js'));
});

// 4. 图片压缩
// gulp-imagemin
// $ cnpm i gulp-imagemin -D
gulp.task('imagemin', function() {
    return gulp.src('./img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/img'));
});

// 5. 合并文件
// gulp-concat
// $ cnpm i gulp-concat -D
// 减少HTTP请求次数(前端优化手段)
gulp.task('concatjs', function() {
    return gulp.src(['./src/js/jquery.js', './src/js/index.js'])
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./src/js'));
});

// 6. 精灵图
// gulp.spritesmith
// $ cnpm i gulp.spritesmith -D
gulp.task('sprite', function() {
    return gulp.src('./src/img/*')
        .pipe(sprite({
            imgName: 'sprite.png',
            cssName: 'sprite.css'
        }))
        .pipe(gulp.dest('./src/css'));
});

// 7. less编译
// gulp-less
// $ cnpm i gulp-less -D
gulp.task('less', function() {
    return gulp.src('./src/styles/*.less')
        .pipe(less({
            paths: [path.join(__dirname, 'less', 'includes')]
        }))
        .pipe(gulp.dest('./src/css'));
});

// 8. 文件监听
gulp.task('watchless', function() {
    // 监听less文件 如果文件发生改变
    // 自动执行less任务
    gulp.watch('./src/styles/*.less', gulp.series('less'));
});

// 9. 自动构建
gulp.task('dev', function() {
    gulp.watch(['./src/styles/*.less', './*.html', './src/js/*.js'], gulp.series('htmlmin', 'concatjs', 'less', 'cssmin', 'jsmin'));
});