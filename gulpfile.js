const gulp = require('gulp');
const gulpsync = require('gulp-sync')(gulp);

const mocha = require('gulp-mocha');

const eslint = require('gulp-eslint');

gulp.task('run', () => {
    require('./server');
});

gulp.task('lint', () => {
    return gulp.src(['./app/**/*.js'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('test:unit', () => {
    return gulp.src('./test/unit/**/*.js', { read: false })
        .pipe(mocha({
            reporter: 'nyan',
        }));
});

gulp.task('test:integration', () => {
    return gulp.src('./test/unit/**/*.js', { read: false })
        .pipe(mocha({
            reporter: 'nyan',
        }));
});

gulp.task('test:browser', () => {
    return gulp.src('./test/browser/todos.js', { read: false })
        .pipe(mocha({
            reporter: 'nyan',
            timeout: 10000,
        }));
});

gulp.task('test', gulpsync.sync([
    'lint', 'test:unit', 'test:integration', 'test:browser'
]));



