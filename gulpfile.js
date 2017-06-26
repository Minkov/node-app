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

const { Server } = require('./test/browser/utils/setup-server');
gulp.task('test:browser', () => {
    const url = 'http://localhost:3001/';
    const dbConnectionString = 'mongodb://localhost/todos-app-test';
    const port = 3002;
    const server = new Server(url, dbConnectionString, port);

    return server.start()
        .then(() => {
            return gulp.src('./test/browser/*.js', { read: false })
                .pipe(mocha({
                    reporter: 'nyan',
                    timeout: 10000,
                }));
        });
});

gulp.task('test', gulpsync.sync([
    'lint', 'test:unit', 'test:integration', 'test:browser',
]));
