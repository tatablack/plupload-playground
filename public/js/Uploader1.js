var TataBlack = TataBlack || {};

TataBlack.Uploader = function(options) {
    var init = function(up, params) {
        $('#uploader-runtime-' + options.idx).addClass('available').html('Using:<br><b>' + params.runtime + '</b>');
        options.callback(); // Reposition Flash/Silverlight
    };

    var error = function(up, err) {
        var message;

        if (err.code === -500) {
            message = '<b>' + options.runtime + '</b><br>not available';
            $('#' + up.settings.browse_button).addClass('uploader-disabled');
        } else {
            message = err.message;
            if (err.file) {
                message += " File: " + err.file.name;
            }
        }

        $('#uploader-runtime-' + options.idx).addClass('unavailable').append(message);

        options.callback(); // Reposition Flash/Silverlight
    };

    var filesAdded = function(up, files) {
        var list = '#uploader-list-' + options.idx;

        $.each(files, function(i, file) {
            $(list).html(
                '<div id="' + file.id + '">' +
                    file.name + ' (' + plupload.formatSize(file.size) + ') <b></b>' +
                    '</div>');
        });

        options.callback(); // Reposition Flash/Silverlight
    };

    var fileUploaded = function(up, file) {
        $('#' + file.id + " b").html("100%");
        options.callback(); // Reposition Flash/Silverlight
    };


    var uploader = new plupload.Uploader({
        runtimes: options.runtime,

        multi_selection: false,
        browse_button: 'file-picker-' + options.idx,
        browse_button_hover: 'uploader-hovered',

        file_data_name: 'imageData',
        max_file_size: '10mb',

        resize: { width :1024, height : 1024, quality : 92 },

        url: '/upload',

        flash_swf_url: '/js/lib/plupload1/plupload.flash.swf',
        silverlight_xap_url: '/js/lib/plupload1/plupload.silverlight.xap',

        filters: [
            {
                title: "Image files",
                extensions: "jpg,png"
            }
        ]
    });

    uploader.bind('Init', init);
    uploader.bind('Error', error);
    uploader.bind('FilesAdded', filesAdded);
    uploader.bind('FileUploaded', fileUploaded);
    uploader.bind('QueueChanged', uploader.start);

    uploader.init();

    return uploader;
};
