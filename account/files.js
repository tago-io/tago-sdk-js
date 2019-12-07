
const request          = require('../comum/tago_request.js');
const paramsSerializer = require('../comum/paramsSerializer.js');
const config           = require('../config.js');
const default_headers  = require('../comum/default_headers.js');
const FormData         = require('form-data');

class Files {
  constructor(acc_token) {
    this.token = acc_token;
    this.default_options = {
      json: true,
      headers: default_headers(this),
    };
  }

  /**
   * list
   * @param {String} path
   * @param {String} pagination_token
   * @param {Number} qty
   */
  list(path = '/', pagination_token = undefined, qty = 300) {
    const url = `${config.api_url}/files`;
    const method = 'GET';

    const options = { ...this.default_options,
      url,
      method,
      paramsSerializer,
      params: {
        path,
        pagination_token,
        qty,
      } };

    return request(options);
  }

  /**
   * uploadBase64
   * @param {Array.<{filename:String, file:String, public:Boolean}>} arrayOfFileObjects
   * Upload an array of files to TagoIO
   *
   * The filename parameter is also full path
   *
   * Exemple:
   *  [ { filename: '/myfiles/myfile.ext', file: 'StringWithBase64' }]
   */
  uploadBase64(arrayOfFileObjects) {
    const url = `${config.api_url}/files`;
    const method = 'POST';

    const options = { ...this.default_options,
      url,
      method,
      paramsSerializer,
      data: arrayOfFileObjects };

    return request(options);
  }

  /**
   * Move/Rename Files
   * @param {Array.<{from:String, to:String}>} arrayOfFileObjects
   *
   * Exemple:
   *  [ { from: '/myfiles/myOldName.ext', to: '/myfiles/newFolder/andNewName.ext' }]
   */
  move(arrayOfFileObjects) {
    const url = `${config.api_url}/files`;
    const method = 'PUT';

    const options = { ...this.default_options,
      url,
      method,
      paramsSerializer,
      data: arrayOfFileObjects };

    return request(options);
  }

  /**
   * Delete Folder or Files
   * @param {Array<String>} arrayOfFiles Array with files to be deleted
   *
   * Exemple:
   * ['/myfiles/myOldName.ext', /myfiles/newFolder/test.ext']
   */
  delete(arrayOfFiles) {
    const url = `${config.api_url}/files`;
    const method = 'DELETE';

    const options = { ...this.default_options,
      url,
      method,
      paramsSerializer,
      data: arrayOfFiles };

    return request(options);
  }

  /**
   * Check if file is private or public
   * @param {String} file Path of file
   *
   */
  checkPermission(file) {
    const url = `${config.api_url}/files/permission`;
    const method = 'GET';

    const options = { ...this.default_options,
      url,
      method,
      paramsSerializer,
      params: {
        file,
      } };

    return request(options);
  }

  /**
   * Make the file private or public
   * @param {Array.<{file:String, public:Boolean}>} arrayOfFileObjects
   *
   * Exemple:
   *  [ { file: '/myfiles/myFile.txt', public: true }]
   */
  changePermission(arrayOfFileObjects) {
    const url = `${config.api_url}/files/permission`;
    const method = 'PUT';

    const options = { ...this.default_options,
      url,
      method,
      paramsSerializer,
      data: arrayOfFileObjects };

    return request(options);
  }

  /**
   * Get file with authenticate token for privates files
   * @param {String} url Full TagoIO File url
   * Get a file with authenticate token valid for 120 seconds.
   */
  getFileURLSigned(url) {
    const method = 'GET';
    if (String(url).indexOf('.tago.io/file/') === -1) {
      return Promise.reject(`${url} is not a TagoIO files url`);
    }

    const options = { ...this.default_options,
      url,
      method,
      params: {
        noRedirect: true,
      } };

    return request(options);
  }

  /**
   * Creates a multipart upload instance.
   * @param {String} filename the path + filename for the file. (e.g. /myfiles/file.txt).
   * @param {Boolean} isPublic if the file can be accessed by anybody with a link or not.
   * @returns {String} The upload ID for the multipart upload. You should save this string
   *  to use on future requests using the uploadPart function.
   * @private
   */
  _createMultipartUpload(filename, isPublic) {
    const url = `${config.api_url}/files`;
    const method = 'POST';

    const options = {
      ...this.default_options,
      url,
      method,
      paramsSerializer,
      data: {
        multipart_action: 'start',
        filename,
        public: isPublic,
      },
    };

    return request(options);
  }

  /**
   * Uploads a single part to TagoIO.
   * @param {String} filename the path + filename for the file. (e.g. /myfiles/file.txt).
   * @param {String} uploadID the upload ID acquired by the 'createMultipartUpload' function call.
   * @param {Number} partNumber the sequential part number for the upload. This should be 1 in the first call, then 2 in the second call, so on and so forth.
   * @param {Buffer | Blob} blob the portion of the file to be uploaded.
   * @private
   */
  async _uploadPart(filename, uploadID, partNumber, blob) {
    const url = `${config.api_url}/files`;
    const method = 'POST';

    const form = new FormData();
    form.append('filename', filename);
    form.append('upload_id', uploadID);
    form.append('part', partNumber);
    form.append('file', blob, filename);
    form.append('multipart_action', 'upload');

    let headers = { 'Content-Type': 'multipart/form-data' };
    if (form.getHeaders) {
      headers = form.getHeaders();
    }

    const options = {
      ...this.default_options,
      url,
      method,
      paramsSerializer,
      data: form,
      maxContentLength: Infinity, // disables max-length check for files
      headers: {
        ...headers,
        ...this.default_options.headers,
      },
    };

    const result = await request(options);
    return {
      ETag: result.ETag,
      PartNumber: partNumber,
    };
  }

  /**
   * Finishes a multipart upload instance.
   * @param {String} filename the path + filename for the file. (e.g. /myfiles/file.txt).
   * @param {String} uploadID the upload ID acquired by the 'createMultipartUpload' function call.
   * @param {Array<{ ETag: String, PartNumber: number }} parts all the parts uploaded to the file. This should be an array
   *  of the results acquired from the 'uploadPart' calls.
   * @private
   */
  _completeMultipartUpload(filename, uploadID, parts) {
    const url = `${config.api_url}/files`;
    const method = 'POST';

    const options = {
      ...this.default_options,
      url,
      method,
      paramsSerializer,
      data: {
        multipart_action: 'end',
        upload_id: uploadID,
        filename,
        parts,
      },
    };

    return request(options);
  }

  /**
   * Uploads a single file to TagoIO.
   * The upload is multipart, meaning that the file will be divided and sent in chunks, resulting in multiple requests being made.
   *
   *
   * @param {Buffer | Blob} file the file to be uploaded.
   * @param {String} filename the path + filename for the file. (e.g. /myfiles/file.txt).
   * @param {Object} opts the upload options for this file.
   *
   * @param {Boolean} opts.isPublic if the file can be accessed by anybody with a link or not.
   * @param {Boolean} opts.chunkSize the byte size of each chunk sent to TagoIO. This will influence how many requests this function will perform.
   * @param {Boolean} opts.maxTriesForEachChunk the maximum amount of tries to upload each chunk to TagoIO. After this many unsuccessful tries of a single chunk, the upload is aborted.
   * @param {Boolean} opts.timeoutForEachFailedChunk timeout before trying to upload the same chunk if the request failed.
   * @param {Function} opts.onProgress will provide the upload percentage for this file.
   */
  async uploadFile(file, filename, opts = {}) {
    const uploadID = await this._createMultipartUpload(filename, opts.isPublic);

    const BYTES_PER_CHUNK = opts.chunkSize || 1024 * 1024 * 10; // 10MB chunk sizes if none is specified.
    const FILE_SIZE       = file.length || file.size;
    const MAX_TRIES       = opts.maxTriesForEachChunk || 5;
    const TIMEOUT         = opts.timeoutForEachFailedChunk || 2000;
    const CHUNK_AMOUNT    = Math.floor(FILE_SIZE / BYTES_PER_CHUNK) + 1;

    if (CHUNK_AMOUNT > 1 && BYTES_PER_CHUNK < 5242880) {
      // chunks cannot be smaller than 5 megabytes if the upload has multiple parts
      throw new Error('Chunk sizes cannot be lower than 5mb if the upload will have multiple parts');
    }

    let start   = 0; // start offset
    let end     = BYTES_PER_CHUNK; // end offset
    let part    = 1; // part number
    let tries   = 0; // amount of tries for current chunk
    const parts = []; // upload results

    while (start < FILE_SIZE) {
      const sliced = file.slice(start, end);

      try {
        const result = await this._uploadPart(filename, uploadID, part, sliced);
        if (opts.onProgress) {
          const percentage = (part * 100) / CHUNK_AMOUNT;
          const limitedPercentage = Math.min(percentage, 100).toFixed(2);
          const roundedPercentage = Number(limitedPercentage);
          opts.onProgress(roundedPercentage);
        }
        parts.push(result);
      } catch (ex) {
        await new Promise((resolve) => setTimeout(resolve, TIMEOUT)); // waits a bit before trying again

        tries += 1;
        if (tries >= MAX_TRIES) {
          throw new Error(`Could not upload part number ${part}: ${ex.message}`);
        }
        continue;
      }

      tries = 0; // reset the tries to send the chunk
      start = end; // increase the offset
      end = start + BYTES_PER_CHUNK; // increase the offset
      part += 1; // increase the part
    }

    return this._completeMultipartUpload(filename, uploadID, parts);
  }
}

module.exports = Files;
