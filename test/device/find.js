'use strict';
const expect = require('chai').expect;
const Device = require('./../../device/');
const token  = '000f0800-fc4b-11e5-b15e-f77cdcbbb9e4';

suite('Device - Find', () => {
    const mydev = new Device(token);
    suite('Success', () => {
        test('Simple Query', (done) => {
            mydev.find()
                .then((x) => {
                    expect(x).to.exist;
                    expect(x.url).to.be.equal('/data');
                    expect(x.method).to.be.equal('GET');
                    expect(x.token).to.be.equal(token);
                    done();
                });
        });
        test('By Variable', (done) => {
            mydev.find({'variable':'testvar'})
                .then((x) => {
                    expect(x).to.exist;
                    expect(x.url).to.be.equal('/data?variable=testvar');
                    expect(x.method).to.be.equal('GET');
                    expect(x.token).to.be.equal(token);
                    done();
                });
        });
        test('By Multiple Variables', (done) => {
            mydev.find({'variable':['testvar','othervar']})
                .then((x) => {
                    expect(x).to.exist;
                    expect(x.url).to.be.equal('/data?variable[]=testvar&variable[]=othervar');
                    expect(x.method).to.be.equal('GET');
                    expect(x.token).to.be.equal(token);
                    done();
                });
        });
        test('Query Last Value', (done) => {
            mydev.find({'variable':'testvar','query':'last_value'})
                .then((x) => {
                    expect(x).to.exist;
                    expect(x.url).to.be.equal('/data?variable=testvar&query=last_value');
                    expect(x.method).to.be.equal('GET');
                    expect(x.token).to.be.equal(token);
                    done();
                });
        });
        test('Query End Date', (done) => {
            mydev.find({'variable':'testvar','end_date':'2016-10-11'})
                .then((x) => {
                    expect(x).to.exist;
                    expect(x.url).to.be.equal('/data?variable=testvar&end_date=2016-10-11');
                    expect(x.method).to.be.equal('GET');
                    expect(x.token).to.be.equal(token);
                    done();
                });
        });
        test('Query Start Date', (done) => {
            mydev.find({'variable':'testvar','start_date':'2016-10-11'})
                .then((x) => {
                    expect(x).to.exist;
                    expect(x.url).to.be.equal('/data?variable=testvar&start_date=2016-10-11');
                    expect(x.method).to.be.equal('GET');
                    expect(x.token).to.be.equal(token);
                    done();
                });
        });
    });
});