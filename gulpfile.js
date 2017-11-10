const gulp = require('gulp');
const typescript = require('gulp-typescript');
const rename = require('gulp-rename');

/**
 * Transpiles TypeScript for given paths
 * @param {string} source 
 * @param {string} dest 
 */
const ts = (source) => {
    const project = typescript.createProject('./tsconfig.json');
    return tsResult = gulp
        .src(source)
        .pipe(project());
}

gulp.task("build", () => 
   ts([
       "./src/**/*.ts",
       "!./src/**/*.spec.ts"
    ])
   .pipe(rename({
       extension: ".js"
   }))
   .pipe(gulp.dest("./dist")));
