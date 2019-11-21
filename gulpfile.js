var gulp = require("gulp");

var files = ['*.php'];

var printFile = function (file) {
    console.log(file);
};

gulp.task('monitor', function () {
    gulp.watch(files)
        .on('change', printFile)
        .on('add', printFile);
});


