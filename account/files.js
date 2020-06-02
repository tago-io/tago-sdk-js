
const request          = require('../comum/tago_request.js');
const paramsSerializer = require('../comum/paramsSerializer.js');
const config           = require('../config.js');
const default_headers  = require('../comum/default_headers.js');
const FormData         = require('form-data');

/**
 * Helper.
 * Waits using a promise for X milliseconds.
 */
async function wait(millis) {
  await new Promise((resolve) => {
    setTimeout(resolve, millis);
  });
}

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
   * Get file md5 with authenticate token for privates files
   * @param {String} url Full TagoIO File url
   * Response is the md5 of the file
   */
  getFileMD5(url) {
    const method = 'GET';
    if (String(url).indexOf('.tago.io/file/') === -1) {
      return Promise.reject(`${url} is not a TagoIO files url`);
    }

    const options = { ...this.default_options,
      url,
      method,
      params: {
        md5: true,
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
   * @param {Object} opts the upload options for this file.
   * @private
   */
  _createMultipartUpload(filename, isPublic, opts) {
    const url = (opts.dashboard && opts.widget)
      ? `${config.api_url}/data/files/${opts.dashboard}/${opts.widget}`
      : `${config.api_url}/files`;
    const method = 'POST';

    const data = {
      multipart_action: 'start',
      filename,
      public: isPublic,
    };

    if (opts.contentType) {
      data.contentType = opts.contentType;
    }

    const options = {
      ...this.default_options,
      url,
      method,
      paramsSerializer,
      data,
    };

    return request(options);
  }

  /**
   * Uploads a single part to TagoIO.
   * @param {String} filename the path + filename for the file. (e.g. /myfiles/file.txt).
   * @param {String} uploadID the upload ID acquired by the 'createMultipartUpload' function call.
   * @param {Number} partNumber the sequential part number for the upload. This should be 1 in the first call, then 2 in the second call, so on and so forth.
   * @param {Buffer | Blob} blob the portion of the file to be uploaded.
   * @param {Object} opts the upload options for this file.
   * @private
   */
  async _uploadPart(filename, uploadID, partNumber, blob, opts) {
    const url = (opts.dashboard && opts.widget)
      ? `${config.api_url}/data/files/${opts.dashboard}/${opts.widget}`
      : `${config.api_url}/files`;
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
   * @param {Object} opts the upload options for this file.
   * @private
   */
  _completeMultipartUpload(filename, uploadID, parts, opts) {
    const url = (opts.dashboard && opts.widget)
      ? `${config.api_url}/data/files/${opts.dashboard}/${opts.widget}`
      : `${config.api_url}/files`;
    const method = 'POST';

    // we need to order the parts before sending them
    const partsOrdered = parts.sort((a, b) => a.PartNumber - b.PartNumber);

    const options = {
      ...this.default_options,
      url,
      method,
      paramsSerializer,
      data: {
        multipart_action: 'end',
        upload_id: uploadID,
        filename,
        parts: partsOrdered,
      },
    };

    return request(options);
  }

  /**
   * Adds an upload to the queue.
   *
   *
   * It will try to upload for 'opts.maxTriesForEachChunk' and fail
   * if it couldn't upload after those many tries.
   *
   * @param {String} filename the path + filename for the file. (e.g. /myfiles/file.txt).
   * @param {String} uploadID the upload ID acquired by the 'createMultipartUpload' function call.
   * @param {Number} partNumber the sequential part number for the upload. This should be 1 in the first call, then 2 in the second call, so on and so forth.
   * @param {Buffer | Blob} blob the portion of the file to be uploaded.
   * @param {Object} opts see the uploadFile function.
   * @private
   */
  async _addToQueue(filename, uploadID, partNumber, blob, opts) {
    const maxTries = opts.maxTriesForEachChunk || 5;
    const timeout  = opts.timeoutForEachFailedChunk || 2000;

    let tries = 0;

    while (tries < maxTries) {
      try {
        const result = await this._uploadPart(filename, uploadID, partNumber, blob, opts);
        return result;
      } catch (ex) {
        await wait(timeout); // waits a bit before trying again

        tries += 1;
        if (tries >= maxTries) {
          throw new Error(`Could not upload part number ${partNumber}: ${ex.message}`);
        }
      }
    }
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
   * @param {String} opts.contentType The file's content type. This is optional.
   * @param {Boolean} opts.isPublic if the file can be accessed by anybody with a link or not.
   * @param {Boolean} opts.chunkSize the byte size of each chunk sent to TagoIO. This will influence how many requests this function will perform.
   * @param {Boolean} opts.maxTriesForEachChunk the maximum amount of tries to upload each chunk to TagoIO. After this many unsuccessful tries of a single chunk, the upload is aborted.
   * @param {Boolean} opts.timeoutForEachFailedChunk timeout before trying to upload the same chunk if the request failed.
   * @param {Function} opts.onProgress will provide the upload percentage for this file.
   * @param {Function} opts.onCancelToken will provide a cancel token for you to cancel the request.
   * @param {String} opts.dashboard will upload simulating an input form on the dashboard. widget also needs to be specified with this.
   * @param {String} opts.widget will upload simulating an input form on the dashboard. dashboard also needs to be specified with this.
   */
  async uploadFile(file, filename, opts = {}) {
    let cancelled = 0;
    if (opts.onCancelToken) {
      opts.onCancelToken(() => {
        cancelled = true; // marks the upload as cancelled.
      });
    }

    if (cancelled) {
      throw new Error('Cancelled request');
    }

    const uploadID = await this._createMultipartUpload(filename, opts.isPublic, opts);

    const bytesPerChunk = opts.chunkSize || 1024 * 1024 * 7; // 10MB chunk sizes if none is specified.
    const fileSize      = file.length || file.size;
    const chunkAmount   = Math.floor(fileSize / bytesPerChunk) + 1;
    const partsPerTime  = 3;

    if (chunkAmount > 1 && bytesPerChunk < 5242880) {
      // chunks cannot be smaller than 5 megabytes if the upload has multiple parts
      throw new Error('Chunk sizes cannot be lower than 5mb if the upload will have multiple parts');
    }

    let start   = 0; // start offset
    let end     = bytesPerChunk; // end offset
    let part    = 1; // part number
    let error   = null; // error thrown by a promise
    const parts = []; // upload results
    const promises = [];

    if (cancelled) {
      throw new Error('Cancelled request');
    }

    while (start < fileSize) {
      const sliced = file.slice(start, end);

      while (promises.length >= partsPerTime) {
        if (cancelled) {
          throw new Error('Cancelled request');
        }
        if (error) {
          throw error;
        }
        await wait(1000); // waits a bit
      }

      const promise = this._addToQueue(filename, uploadID, part, sliced, opts);
      promises.push(promise);

      promise.then((partData) => { // promise finished, remove it from the array
        if (promises.indexOf(promise) >= 0) {
          promises.splice(promises.indexOf(promise), 1);
        }

        // adds result to parts
        parts.push(partData);

        // reports progress
        if (opts.onProgress) {
          const percentage = (parts.length * 100) / chunkAmount;
          const limitedPercentage = Math.min(percentage, 100).toFixed(2);
          const roundedPercentage = Number(limitedPercentage);
          opts.onProgress(roundedPercentage);
        }
      });

      // eslint-disable-next-line no-loop-func
      promise.catch((err) => { // promise threw
        error = err;
      });

      if (cancelled) {
        throw new Error('Cancelled request');
      }

      await wait(500); // waits a bit between chunks

      start = end; // increase the offset
      end = start + bytesPerChunk; // increase the offset
      part += 1; // increase the part
    }

    while (promises.length > 0) { // waits for all the chunks to finish
      if (cancelled) {
        throw new Error('Cancelled request');
      }
      if (error) {
        throw error;
      }
      await wait(1000);
    }

    if (cancelled) {
      throw new Error('Cancelled request');
    }

    for (let i = 0; i < 3; i += 1) {
      // we need to make sure we close the upload, otherwise bad things can happen.
      // so we try 3 times to close the multipart, just in case there is a slow connection.
      try {
        return this._completeMultipartUpload(filename, uploadID, parts, opts);
      } catch (ex) {
        await wait(1000); // wait a bit before trying again
        if (i === 2) {
          throw ex;
        }
      }
    }
  }
}

module.exports = Files;
