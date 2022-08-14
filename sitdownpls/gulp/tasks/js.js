import babel from "gulp-babel";
import uglifyjs from "gulp-uglify-es";
import webpack from "webpack-stream";

const {default: uglify} = uglifyjs;

// var minify = composer(uglify, console);

export const js = () => {
  return app.gulp.src(app.path.src.js, {sourcemaps: app.isDev})
    .pipe(app.plugins.plumber(
      app.plugins.notify.onError({
        title: "JS",
        message: "Error: <%= error.message %>"
      })
    ))
    // .pipe(webpack({
    //   mode: app.isBuild ? 'production' : 'development',
    //   output: {
    //     filename: 'app.min.js'
    //   }
    // }))
    .pipe(
      app.plugins.if(
        app.isBuild,
        babel({
          presets: ['@babel/env']
        })
      )
    )
    .pipe(app.plugins.concat('app.js'))
    .pipe(app.gulp.dest(app.path.build.js))
    .pipe(app.plugins.if(
      app.isBuild,
      uglify()
      )
    )
    .pipe(app.plugins.if(
      app.isBuild,
      app.plugins.rename({
        extname: '.min.js'
      })
      )
    )
    .pipe(app.gulp.dest(app.path.build.js))
    .pipe(app.plugins.browsersync.stream())
}
