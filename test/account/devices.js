'use strict';
const expect  = require('chai').expect;
const Account = require('../../account');
const token   = '000f0800-fc4b-11e5-b15e-f77cdcbbb9e4';

suite('Account - Devices', () => {
    const myacc      = new Account(token);
    suite('List', () => {
        test('Success', (done) => {
            myacc.devices.list()
                .then((x) => {
                    expect(x).to.exist;
                    expect(x.url).to.be.equal('/device');
                    expect(x.method).to.be.equal('GET');
                    expect(x.token).to.be.equal(token);
                    done();
                });
        });

    });

    suite('Create', () => {
        test('Success', (done) => {
            myacc.devices.create({'name':'Test'})
                .then((x) => {
                    expect(x).to.exist;
                    expect(x.url).to.be.equal('/device');
                    expect(x.method).to.be.equal('POST');
                    expect(x.token).to.be.equal(token);
                    done();
                });
        });
    });

    suite('Edit', () => {
        test('Success', (done) => {
            myacc.devices.edit('xxx', {'name':'Another Test'})
                .then((x) => {
                    expect(x).to.exist;
                    expect(x.url).to.be.equal('/device/xxx');
                    expect(x.method).to.be.equal('PUT');
                    expect(x.token).to.be.equal(token);
                    done();
                });
        });
    });

    suite('Get Token List', () => {
        test('Success', (done) => {
            myacc.devices.token_list('xxx')
                .then((x) => {
                    expect(x).to.exist;
                    expect(x.url).to.be.equal('/device/token/xxx');
                    expect(x.method).to.be.equal('GET');
                    expect(x.token).to.be.equal(token);
                    done();
                });
        });
    });

    suite('Create Token', () => {
        test('Success', (done) => {
            myacc.devices.gen_token('xxx', {'name':'New Token', 'permission':'Full', 'expire_time':'never'})
                .then((x) => {
                    expect(x).to.exist;
                    expect(x.url).to.be.equal('/device/token');
                    expect(x.method).to.be.equal('POST');
                    expect(x.token).to.be.equal(token);
                    done();
                });
        });
    });

    suite('Delete Token', () => {
        test('Success', (done) => {
            myacc.devices.del_token('xxx')
                .then((x) => {
                    expect(x).to.exist;
                    expect(x.url).to.be.equal('/device/token/xxx');
                    expect(x.method).to.be.equal('DELETE');
                    expect(x.token).to.be.equal(token);
                    done();
                });
        });
    });

    suite('Info', () => {
        test('Success', (done) => {
            myacc.devices.info('xxx')
                .then((x) => {
                    expect(x).to.exist;
                    expect(x.url).to.be.equal('/device/xxx');
                    expect(x.method).to.be.equal('GET');
                    expect(x.token).to.be.equal(token);
                    done();
                });
        });

        test('Error', (done) => {
            myacc.devices.info('')
                .catch((x) => {
                    expect(x).to.be.equal('Device ID parameter is obrigatory.');
                    done();
                });
        });
    });

    suite('Delete', () => {
        test('Success', (done) => {
            myacc.devices.delete('xxx')
                .then((x) => {
                    expect(x).to.exist;
                    expect(x.url).to.be.equal('/device/xxx');
                    expect(x.method).to.be.equal('DELETE');
                    expect(x.token).to.be.equal(token);
                    done();
                });
        });

    });
});
