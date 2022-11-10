export const copy = () => {
  return app.gulp.src(app.path.src.files)
    .pipe(app.gulp.dest(app.path.build.files))
}

export const copyJsModules = () => {
  return app.gulp.src(app.path.src.jsModules)
    .pipe(app.gulp.dest(app.path.build.jsModules))
}

// export const copyPhpFiles = () => {
//   return app.gulp.src(app.path.src.phpFiles)
//     .pipe(app.gulp.dest(app.path.build.phpFiles))
// }

// export const copyPhpMail = () => {
//   return app.gulp.src(app.path.src.phpMail)
//     .pipe(app.gulp.dest(app.path.build.phpMail))
// }
