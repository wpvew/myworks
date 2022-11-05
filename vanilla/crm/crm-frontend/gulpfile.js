import gulp from 'gulp';
import svgSprite from 'gulp-svg-sprite';

const sprites = () => {
  return gulp.src('img/svg/**/*.svg')
    .pipe(svgSprite({
      mode: {
        symbol: {
          sprite: '../sprite.svg'
        }
      }
    }))
    .pipe(gulp.dest('img/svg'))
}

export { sprites };
