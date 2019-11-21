var gulp    = require("gulp"),
    phpunit = require("gulp-phpunit"),
    plumber = require('gulp-plumber'),
    exec    = require('child_process').exec;

var files = ['app/**/*.php', "tests/**/*.php"];

var isTest = function(file) {
    return file.indexOf("tests/") === 0;
};

var runTest = function(file) {

    var filename = (isTest(file))
        ? file
        : "tests/"+file.replace(".php", "Test.php");

    var options = {
        testClass: filename,
        stopOnFailure: true,
        stopOnError: true
    };
    
    gulp.src(file)
        .pipe(plumber({errorHandler: function () {}}))
        .pipe(phpunit("./vendor/bin/phpunit", options));
};

var checkFile = function (file) {
    var isTest = file.indexOf("Test.php");   
    (isTest >= 0) ? runTest(file) : runTest(file);
};

var monitor = function () {
    gulp.watch(files)
        .on('change', checkFile)
        .on('add', checkFile);
};

exports.monitor = monitor;
