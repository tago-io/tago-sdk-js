const expect  = require('chai').expect;
const Account = require('./../../account/');
const tagoRequest = require('../../comum/tago_request');

suite.only('Tago - Request', () => {
    const acc = new Account('abc');
    test('Success', (done) => {
        let count_for = 0;
        const axios = () => {
            count_for += 1;
            return Promise.resolve({ data: { result: 'worked', status: true }});
        };
        const tr = tagoRequest.bind({axios});
        tr({ url: ''}).then(() => {
            expect(count_for).to.be.equal(1);
            done();
        }).catch((x) => { 
            expect(x).to.be.false; 
            done(); 
        });
    });
    test('Failure', (done) => {
        let count_for = 0;
        const axios = () => {
            count_for += 1;
            return Promise.reject({ data: { result: 'error', status: false }});
        };
        const tr = tagoRequest.bind({axios});
        tr({ url: '' }).then((x) => {
            expect(x).to.be.false; 
            done();
        }).catch(() => {
            expect(count_for).to.be.equal(1);
            done(); 
        });
    });
    test('Timeout Failure', (done) => {
        let count_for = 0;
        const axios = () => {
            count_for += 1;
            return Promise.reject({ response: {data: { message: 'Timeout' }}});
        };
        const tr = tagoRequest.bind({axios});
        tr({ url: '' }).then((x) => {
            expect(x).to.be.false; 
            done();
        }).catch(() => {
            expect(count_for).to.be.equal(3);
            done(); 
        });
    });
    test('Timeout Success', (done) => {
        let count_for = 0;
        const axios = () => {
            count_for += 1;
            if (count_for == 3) return Promise.resolve({ data: { result: 'worked', status: true }});
            return Promise.reject({ response: {data: { message: 'Timeout' }}});
        };
        const tr = tagoRequest.bind({axios});
        tr({ url: '' }).then((x) => {
            expect(x).to.be.false; 
            done();
        }).catch(() => {
            expect(count_for).to.be.equal(3);
            done(); 
        });
    });
});
