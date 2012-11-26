var TataBlack = TataBlack || {};

$(function() {
    var uploaderCount = $('#uploader-strip').data('uploaderCount'),
        runtimes = ['html4', 'html5', 'gears', 'flash', 'silverlight', 'browserplus'],
        uploaders = [];

    var refreshAll = _.bind(function() {
        for (var i = 0; i < uploaders.length; i++) {
            if (uploaders[i]) uploaders[i].refresh();
        }
    }, this);

    for (var i = 0; i < runtimes.length; i++) {
        uploaders[i] = new TataBlack.Uploader({
            runtime: runtimes[i],
            idx: i,
            fieldName: 'imageData',
            callback: refreshAll
        });
    }
});
