'use strict';
const request         = require('../comum/tago_request.js');
const config          = require('../config.js');
const default_headers = require('../comum/default_headers.js');

class Buckets {
    constructor(acc_token) {
        this.token = acc_token;
        this.default_options = {
            'json':    true,
            'headers': default_headers(this)
        };
    }

    /** List Buckets
     * @return {Promise}
     */
    list() {
        let url    = `${config.api_url}/bucket`;
        let method = 'GET';

        let options = Object.assign({}, this.default_options, {url, method});
        return request(options);
    }

    /** Create a Bucket
    * @param  {object} data
    * @param  {string} data.name - Name of the bucket
    * @param  {string} data.description - description of the bucket
    * @param  {boolean} data.active - Set if bucket is active or not
    * @param  {object[]} tags[] - bucket tags for categorization
    * @param  {string} tags[].key - key of the tag
    * @param  {string} tags[].value - value of the tag
    * @return {Promise}
     */
    create(data) {
        data       = data || {};
        let url    = `${config.api_url}/bucket`;
        let method = 'POST';

        let options = Object.assign({}, this.default_options, {url, method, data});
        return request(options);
    }

    /** Edit the Bucket
    * @param  {String} bucket id
    * @param  {object} data
    * @param  {string} data.name - Name of the bucket
    * @param  {string} data.description - description of the bucket
    * @param  {boolean} data.active - Set if bucket is active or not
    * @param  {object[]} tags[] - bucket tags for categorization
    * @param  {string} tags[].key - key of the tag
    * @param  {string} tags[].value - value of the tag
    * @return {Promise}
     */
    edit(bkt_id, data) {
        data       = data || {};
        let url    = `${config.api_url}/bucket/${bkt_id}`;
        let method = 'PUT';

        let options = Object.assign({}, this.default_options, {url, method, data});
        return request(options);
    }

    /** Delete the Bucket
    * @param  {String} bucket id
    * @return {Promise}
     */
    delete(bkt_id) {
        let url    = `${config.api_url}/bucket/${bkt_id}`;
        let method = 'DELETE';

        let options = Object.assign({}, this.default_options, {url, method});
        return request(options);
    }

    /** Get Info of the Bucket
    * @param  {String} bucket id
    * @return {Promise}
     */
    info(bkt_id) {
        if (!bkt_id || bkt_id == '') {
            //If ID is send with null, it will get List instead info.
            return new Promise((resolve,reject) => reject('Bucket ID parameter is obrigatory.'));
        }
        let url    = `${config.api_url}/bucket/${bkt_id}`;
        let method = 'GET';

        let options = Object.assign({}, this.default_options, {url, method});
        return request(options);
    }

    /** Get Info of the Backup
    * @param  {String} backup id
    * @return {Promise}
     */
    backupInfo(backup_id) {
        if (!backup_id || backup_id == '') {
            return new Promise((resolve,reject) => reject('Backup ID parameter is obrigatory.'));
        }
        let url    = `${config.api_url}/backup/${backup_id}`;
        let method = 'GET';

        let options = Object.assign({}, this.default_options, {url, method});
        return request(options);
    }

    /** List all backups of the account
    * @return {Promise}
     */
    backupList() {
        let url    = `${config.api_url}/backup`;
        let method = 'GET';

        let options = Object.assign({}, this.default_options, {url, method});
        return request(options);
    }

    /** Delete the Backup 
    * @param  {String} backup_id id
    * @return {Promise}
     */
    backupDelete(backup_id) {
        if (!backup_id || backup_id == '') {
            return new Promise((resolve,reject) => reject('Backup ID parameter is obrigatory.'));
        }
        let url    = `${config.api_url}/backup/${backup_id}`;
        let method = 'DELETE';

        let options = Object.assign({}, this.default_options, {url, method});
        return request(options);
    }

    /** Recover the Backup 
    * @param  {JSON} data object with parameters for recover
    * @param  {String} data.id backup id to be recovered
    * @param  {Array} data.ids multiple id's to be recovered
    * @return {Promise}
     */
    backupRecover(data) {
        data       = data || {};
        let url    = `${config.api_url}/backup/recover`;
        let method = 'POST';

        let options = Object.assign({}, this.default_options, {url, method, data});
        return request(options);
    }
    /** Get share list of the dashboard
    * @param  {String} dashboard id
    * @return {Promise}
     */
    shareList(bucket_id) {
        if (!bucket_id || bucket_id == '') {
            //If ID is send with null, it will get List instead info.
            return new Promise((resolve,reject) => reject('Bucket ID parameter is obrigatory.'));
        }
        let url    = `${config.api_url}/bucket/${bucket_id}/share/list`;
        let method = 'GET';

        let options = Object.assign({}, this.default_options, {url, method});
        return request(options);
    }

    /** Share the bucket with another person
    * @param  {String} bucket id
    * @param  {JSON} data - 
    * @param  {String} data{}.email - Email to receive invitation
    * @param  {String} data{}.message - Scope message for the email
    * @param  {String} data{}.permission - Permission to be applied
    * @param  {boolean} data{}.copy_me - true to send a copy to yourself
    * @return {Promise}
     */
    shareInvite(bucket_id, data) {
        data = data || {};
        if (!bucket_id || bucket_id == '') {
            return new Promise((resolve,reject) => reject('Bucket ID parameter is obrigatory.'));
        } else if (!data.email) {
            return new Promise((resolve,reject) => reject('data.email parameter is obrigatory.'));
        }

        let url    = `${config.api_url}/bucket/${bucket_id}/share/invite`;
        let method = 'POST';

        let options = Object.assign({}, this.default_options, {url, method, data});
        return request(options);
    }

    /** Change permissions of the bucket
    * @param  {String} bucket id
    * @param  {JSON} data - 
    * @param  {String} data{}.email - Email to change permissions
    * @param  {String} data{}.permission - New Permission to be applied
    * @param  {String} data{}.everyone
    * @return {Promise}
     */
    shareChange(bucket_id, data) {
        data = data || {};
        if (!bucket_id || bucket_id == '') {
            return new Promise((resolve,reject) => reject('Bucket ID parameter is obrigatory.'));
        } else if (!data.email) {
            return new Promise((resolve,reject) => reject('data.email parameter is obrigatory.'));
        }

        let url    = `${config.api_url}/bucket/${bucket_id}/share/change`;
        let method = 'PUT';

        let options = Object.assign({}, this.default_options, {url, method, data});
        return request(options);
    }

}

module.exports = Buckets;
