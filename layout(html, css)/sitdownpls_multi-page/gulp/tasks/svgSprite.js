import sprite from 'gulp-svg-sprite';

export const svgSprite = () => {
  return app.gulp.src(app.path.src.svgicon)
    .pipe(app.plugins.plumber(
      app.plugins.notify.onError({
        title: "SVG",
        message: "Error: <%= error.message %>"
      })
    ))
    .pipe(sprite({
      mode: {
        symbol: {
          sprite: '../sprite.svg'
        }
      }
    }))
    .pipe(app.gulp.dest(app.path.build.images))
}
