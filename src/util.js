// Reference http://docs.aws.amazon.com/AmazonS3/latest/API/sigv4-post-example.html

var Account_Box_File_Upload = {

    /**
     * Store file size to toggle loading image
     */
    uploaded_file_size: 0,

    /**
     * To fix loading image issue when multiple files sent frequently
     */
    uploaded_file_count: 0,

    /**
     * To fix loading image issue when multiple files sent frequently
     */
    uploaded_success_file_count: 0,

    /**
     * To send the file resource path to the visitor
     */
    file_resource_path: "",

    /**
     * Selecter file
     */
    selected_file: "",

    /**
     * Bucket URL
     */
    //old_amazon_bucket_url : "https://s3.amazonaws.com/accb-uploads/",
    //old_amazon_bucket_url1 : "https://accb-uploads.s3.amazonaws.com/",

    amazon_bucket_url: "https://dashboardassets.eb-pages.com/",
    //amazon_bucket_url1 : "https://ebuploads2.s3.amazonaws.com/",

    /**
     * Upload file in to amazon using browser uploads
     *
     * @param input
     */
    upload_file: function (files, callback, allowedFileTypes) {

        console.log(files);

        // var files = input.files;

        if (!files) {
            // workaround for IE9
            files = [];
            files
                .push({
                    name: input.value.substring(input.value
                        .lastIndexOf("\\") + 1),
                    size: 0, // it's not possible to get file size w/o
                    // flash or so
                    type: input.value.substring(input.value
                        .lastIndexOf(".") + 1)
                });
        }

        console.log(files);

        // to send request to amazon server
        this.construct_form_with_file_data(files, callback, allowedFileTypes);

        // Reset input file value
        // input.value = "";

    },

    /**
     * Multiple files upload
     */
    construct_form_with_file_data: function (files, callback, allowedFileTypes) {

        if (!files || files.length == 0)
            return;

        // Reset file count
        this.uploaded_file_size = 0, this.uploaded_success_file_count = 0,
            this.uploaded_file_count = 0;

        for (var i = 0; files.length > i; i++) {

            var file = files[i];

            Account_Box_File_Upload.uploadByFile(file, callback,
                allowedFileTypes);

        }

    },

    inArrayIgnoreCase: function (file_extension, allowedFileTypes) {
        return !($.inArray(file_extension, allowedFileTypes) == -1 && $.inArray(
            file_extension.toLowerCase(), allowedFileTypes) == -1);
    },

    uploadByFile: function (file, callback, allowedFileTypes) {

        if (!file || !file.name || !file.size)
            return;

        var file_name = file.name.split('.')[0];
        var file_extension = file.name.split('.').pop();

        if (allowedFileTypes && allowedFileTypes.length > 0
            && !this.inArrayIgnoreCase(file_extension, allowedFileTypes)) {
            callback.error("Sorry, you cannot upload such files.", file);
            return;
        }

        if (!file_extension || file_extension.indexOf("exe") == 0) {
            callback.error("Sorry, you cannot upload such files.", file);
            return;
        }

        // if (file.size < 100) {
        // callback.error("Sorry, file size should be atleast 100 bytes.",
        // file);
        // return;
        // }

        if (file.size > (2 * 1024 * 1024 * 1024)) {
            callback.error("Sorry, you cannot upload files larger than 2 GB.",
                file);
            return;
        }

        callback.toggleLoader("show");

        this.uploaded_file_size += 1;
        this.uploaded_file_count += 1;

        file.file_resource = this.file_resource_path = "uploads/"
            + new Date().getTime() + "-" + file_name.replace(/[^a-zA-Z0-9]/g, '_')
            + "." + file_extension;

        // To support file viewing in browser
        var fd = this.getContentTypeFileData(file);

        this.execute_amazon_upload(fd, file, callback);

    },

    getContentTypeFileData: function (file) {

        var fd = new FormData();

        // Construct post data
        fd.append('key', file.file_resource);
        fd.append('acl', 'public-read');
        fd.append('AWSAccessKeyId', 'AKIAIUBC6PDU7ZVBXFJA');
        fd
            .append(
                'policy',
                'ewogICJleHBpcmF0aW9uIjogIjIwMjktMDEtMDFUMTI6MDA6MDAuMDAwWiIsCiAgImNvbmRpdGlvbnMiOiBbCiAgICB7ImJ1Y2tldCI6ICJlYnVwbG9hZHMyIiB9LAogICAgeyJhY2wiOiAicHVibGljLXJlYWQiIH0sCiAgICBbInN0YXJ0cy13aXRoIiwgIiRrZXkiLCAidXBsb2Fkcy8iXSwKICAgIFsic3RhcnRzLXdpdGgiLCAiJENvbnRlbnQtVHlwZSIsICIiXQogIF0KfQo=')
        fd.append('signature', 'yQfJQnt5Jdbomu680QKvK4oD15c=');

        // Get content Type
        var contentType = this.getContentType(file);
        contentType = (!contentType) ? 'binary/octet-stream' : contentType;

        fd.append('Content-Type', contentType);

        fd.append("file", file);

        return fd;

    },

    getFileData: function (file) {

        // Use old_amazon_bucket_url to upload files(without content type,
        // Which will download the file from browser)

        var fd = new FormData();

        // Construct post data
        fd.append('key', this.file_resource_path);
        fd.append('acl', 'public-read');
        fd.append('AWSAccessKeyId', 'AKIAIUBC6PDU7ZVBXFJA');
        fd
            .append(
                'policy',
                'ewogICJleHBpcmF0aW9uIjogIjIwMjktMDEtMDFUMTI6MDA6MDAuMDAwWiIsCiAgImNvbmRpdGlvbnMiOiBbCiAgICB7ImJ1Y2tldCI6ICJlYnVwbG9hZHMyIiB9LAogICAgeyJhY2wiOiAicHVibGljLXJlYWQiIH0sCiAgICBbInN0YXJ0cy13aXRoIiwgIiRrZXkiLCAidXBsb2Fkcy8iXSwKICAgIFsic3RhcnRzLXdpdGgiLCAiJENvbnRlbnQtVHlwZSIsICIiXQogIF0KfQo=')
        fd.append('signature', 'yQfJQnt5Jdbomu680QKvK4oD15c=');
        fd.append("file", file);

        return fd;

    },

    getContentType: function (file) {

        if (!file)
            return;

        var ext = "";
        try {
            ext = file.name.split('.').pop();
        } catch (e) {
        }

        if (!ext)
            return;

        var cTObj = this.getcontentTypeObj();

        return cTObj[ext.toLowerCase()];

    },

    getcontentTypeObj: function () {
        return {

            // Ref
            // http://stackoverflow.com/questions/4212861/what-is-a-correct-mime-type-for-docx-pptx-etc

            'png': 'image/png',
            'svg': 'image/svg+xml',
            'jpg': 'image/jpg',
            'jpeg': 'image/jpeg',
            'gif': 'image/gif',
            'tiff': 'image/tiff',
            'bmp': 'image/bmp',
        };

    },

    /**
     * UPload to amazon
     *
     * @param form_data
     * @param file
     */
    execute_amazon_upload: function (form_data, file, callback) {

        // Construct http request for post request
        var xhr = new window.XMLHttpRequest();
        xhr.upload.addEventListener("progress", function (evt) {
            Account_Box_File_Upload.upload_progress(evt, file, callback)
        }, false);
        xhr.addEventListener("load", function (evt) {
            Account_Box_File_Upload.upload_complete(evt, file, callback)
        }, false);
        xhr.addEventListener("error", function (evt) {
            Account_Box_File_Upload.upload_failed(evt, file, callback)
        }, false);
        xhr.addEventListener("abort", function (evt) {
            Account_Box_File_Upload.upload_canceled(evt, file, callback)
        }, false);

        // Must be last line before send
        xhr.open('POST', Account_Box_File_Upload.amazon_bucket_url, true);

        xhr.send(form_data);

        this.selected_file = form_data;

    },

    /**
     * Progress bar
     *
     * @param evt
     * @param file
     */
    upload_progress: function (evt, file, callback) {
        if (evt.lengthComputable) {
            var percentComplete = Math.round(evt.loaded * 100 / evt.total);
            callback.progress(percentComplete);
        }
    },

    /**
     * Upload completed in amazon
     *
     * @param evt
     * @param file
     */
    upload_complete: function (evt, file, callback) {

        if (!file || !file.file_resource || !this.file_resource_path)
            return;

        var file_json = {};
        file_json.file_url = this.amazon_bucket_url + file.file_resource;

        file_json.file_name = file.name.split('.')[0];

        file_json.file_size = file.size;
        // file_json.file_size = this.get_file_size(file.size);
        file_json.file_extension = file.name.split('.').pop();

        console.log(file_json);

        callback.success(file_json);

        // Reset count
        this.check_uploaded_count(callback);

    },

    /**
     * Upload failed
     *
     * @param evt
     * @param file
     */
    upload_failed: function (evt, file, callback) {

        callback.error("There was an error attempting to upload the file.",
            file);
        this.check_uploaded_count(callback);

    },

    /**
     * Cancelled upload
     *
     * @param evt
     * @param file
     */
    upload_canceled: function (evt, file, callback) {

        callback
            .error(
                "The upload has been canceled by the user or the browser dropped the connection.",
                file);
        this.check_uploaded_count(callback);
    },

    /**
     * Returns file size
     *
     * @param size
     * @returns {String}
     */
    get_file_size: function (size) {

        if (!size)
            return;

        if (size < 1024)
            return size + " Bytes";
        else if (size < 1024 * 1024)
            return this.trim_file_size(size / 1024) + " KB";
        else
            return this.trim_file_size(size / (1024 * 1024)) + " MB";

    },

    /**
     * Roundup size
     *
     * @param size
     * @returns {Number}
     */
    trim_file_size: function (size) {
        return Math.round(size * 100) / 100;
    },

    /**
     * Checks uploaded files count
     */
    check_uploaded_count: function (callback) {

        if (this.uploaded_file_size > 0)
            this.uploaded_file_size -= 1;

        // To show loading image when mutiple files uploaded frequently
        if (this.uploaded_success_file_count < this.uploaded_file_count)
            this.uploaded_success_file_count += 1;

        if (this.uploaded_file_size <= 0
            && this.uploaded_success_file_count >= this.uploaded_file_count)
            callback.toggleLoader("hide", this.uploaded_file_count);

        console.log("this.uploaded_success_file_count = "
            + this.uploaded_success_file_count
            + ", this.uploaded_file_count = " + this.uploaded_file_count);
    }

};

