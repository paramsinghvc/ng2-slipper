export default {
    entry     : 'dist/index.js',
    dest      : 'dist/bundles/slipper.umd.js',
    format    : 'umd',
    external  : [
        '@angular/core',
        '@angular/common',
        'rxjs/Rx'
    ],
    globals   : {
        '@angular/core': 'ng.core',
    },
    moduleName: 'slipper'
}