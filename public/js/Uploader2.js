var TataBlack = TataBlack || {};

TataBlack.Uploader = function(options) {
    var init = function(up, params) {
        $('#uploader-runtime-' + options.idx).addClass('available').html('Using:<br><b>' + params.runtime + '</b>');
    };

    var error = function(up, err) {
        var message;

        if (err.code === -500) {
            message = '<b>' + options.runtime + '</b><br>not available';
            $(up.settings.browse_button).addClass('uploader-disabled');
        } else {
            message = err.message;
            if (err.file) {
                message += " File: " + err.file.name;
            }
        }

        $('#uploader-runtime-' + options.idx).addClass('unavailable').append(message);
    };

    var filesAdded = function(up, files) {
        var list = '#uploader-list-' + options.idx;

        $.each(files, function(i, file) {
            $(list).html(
                '<div id="' + file.id + '">' +
                    file.name + ' (' + plupload.formatSize(file.size) + ') <b></b>' +
                    '</div>');
        });
    };

    var fileUploaded = function(up, file) {
        $('#' + file.id + " b").html("100%");
    };


    var uploader = new plupload.Uploader({
        runtimes: options.runtime,
        max_retries: 1,
        multi_selection: false,
        file_data_name: 'imageData',

        browse_button: 'file-picker-' + options.idx,
        browse_button_hover: 'uploader-hovered',

        max_file_size: '10mb',

        resize: { width :1024, height : 1024, quality : 92 },

        url: '/upload',

        flash_swf_url: '/js/lib/plupload2/Moxie.swf',
        silverlight_xap_url: '/js/lib/plupload2/Moxie.xap',

        filters: {
            mime_types: [
                { title: 'Image files', extensions: 'jpg,jpeg,png' }
            ],

            max_file_size: '8mb'
        }
    });

    uploader.bind('Init', init);
    uploader.bind('Error', error);
    uploader.bind('FilesAdded', filesAdded);
    uploader.bind('FileUploaded', fileUploaded);
    uploader.bind('QueueChanged', uploader.start);

    uploader.init();

    return uploader;
};
