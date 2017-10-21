'use strict';
const expect = require('chai').expect;
const Device = require('./../../device/');
const token  = '000f0800-fc4b-11e5-b15e-f77cdcbbb9e4';

suite('Device - Remove', () => {
  const mydev = new Device(token);
  suite('Success', () => {
    test('Simple Remove', (done) => {
      mydev.remove()
        .then((x) => {
          expect(x).to.exist;
          expect(x.url).to.be.equal('/data');
          expect(x.method).to.be.equal('DELETE');
          expect(x.token).to.be.equal(token);
          done();
        });
    });
    test('Remove with ID', (done) => {
      mydev.remove('571920982c452fa00c6af660')
        .then((x) => {
          expect(x).to.exist;
          expect(x.url).to.be.equal('/data/571920982c452fa00c6af660');
          expect(x.method).to.be.equal('DELETE');
          expect(x.token).to.be.equal(token);
          done();
        });
    });
    test('Remove with variable name', (done) => {
      mydev.remove('testvar')
        .then((x) => {
          expect(x).to.exist;
          expect(x.url).to.be.equal('/data/testvar');
          expect(x.method).to.be.equal('DELETE');
          expect(x.token).to.be.equal(token);
          done();
        });
    });

    test('Remove with qty', (done) => {
      mydev.remove('testvar', 10)
        .then((x) => {
          expect(x).to.exist;
          expect(x.url).to.be.equal('/data/testvar?qty=10');
          expect(x.method).to.be.equal('DELETE');
          expect(x.token).to.be.equal(token);
          done();
        });
    });
  });
});