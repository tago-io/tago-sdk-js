'use strict';
const expect = require('chai').expect;
const Device = require('./../../device/');
const token  = '000f0800-fc4b-11e5-b15e-f77cdcbbb9e4';

suite('Device - Info', () => {
    const mydev = new Device(token);
    test('Request Info', (done) => {
        mydev.info()
            .then((x) => {
                expect(x).to.exist;
                expect(x.url).to.be.equal('/info');
                expect(x.method).to.be.equal('GET');
                expect(x.token).to.be.equal(token);
                done();
            });
    });
});