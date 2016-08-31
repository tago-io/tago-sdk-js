'use strict';
const expect = require('chai').expect;
const Device = require('./../../device/');
const token  = '000f0800-fc4b-11e5-b15e-f77cdcbbb9e4';

suite('Device - Edit', () => {
    const mydev = new Device(token);
    test('Edit value', (done) => {
        mydev.edit('57c730af5c00ce0c7046c3c2', {'value':'154'})
            .then((x) => {
                expect(x).to.exist;
                expect(x.url).to.be.equal('/data/57c730af5c00ce0c7046c3c2');
                expect(x.method).to.be.equal('PUT');
                expect(x.token).to.be.equal(token);
                done();
            });
    });
});