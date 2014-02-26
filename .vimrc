setlocal wildignore+=*/dist

" Syntastic options
let g:syntastic_html_tidy_ignore_errors = [
  \ 'trimming empty <span>'
  \ , ' proprietary attribute "ng-'
  \ , ' proprietary attribute "ui-'
  \ , ' proprietary attribute "tv-'
  \ , '<html> proprietary attribute "class"'
  \ , 'unescaped & which should be written as &amp;'
  \ , '<tv-breadcrumbs> is not recognized!'
  \ , 'discarding unexpected <tv-breadcrumbs>'
  \ , 'discarding unexpected </tv-breadcrumbs>'
  \ ]

" javascript-libraries-syntax.vim
let g:used_javascript_libs = 'angularjs,angularui'
