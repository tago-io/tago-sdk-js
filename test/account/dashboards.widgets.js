'use strict';
const expect  = require('chai').expect;
const Account = require('../../account');
const token   = '000f0800-fc4b-11e5-b15e-f77cdcbbb9e4';

suite('Account - Widgets', () => {
    const myacc      = new Account(token);
    suite('Create', () => {
        test('Success', (done) => {
            myacc.dashboards.widgets.create('xxx', {'name':'Test'})
                .then((x) => {
                    expect(x).to.exist;
                    expect(x.url).to.be.equal('/dashboard/xxx/widget/');
                    expect(x.method).to.be.equal('POST');
                    expect(x.token).to.be.equal(token);
                    done();
                });
        });
    });

    suite('Edit', () => {
        test('Success', (done) => {
            myacc.dashboards.widgets.edit('xxx', 'yyyy', {'name':'Another Test'})
                .then((x) => {
                    expect(x).to.exist;
                    expect(x.url).to.be.equal('/dashboard/xxx/widget/yyyy');
                    expect(x.method).to.be.equal('PUT');
                    expect(x.token).to.be.equal(token);
                    done();
                });
        });
    });

    suite('Info', () => {
        test('Success', (done) => {
            myacc.dashboards.widgets.info('xxx', 'yyyy')
                .then((x) => {
                    expect(x).to.exist;
                    expect(x.url).to.be.equal('/dashboard/xxx/widget/yyyy');
                    expect(x.method).to.be.equal('GET');
                    expect(x.token).to.be.equal(token);
                    done();
                });
        });

        test('Error', (done) => {
            myacc.dashboards.widgets.info('xxx', '')
                .catch((x) => {
                    expect(x).to.be.equal('Widget ID parameter is obrigatory.');
                    done();
                });
        });
    });

    suite('Delete', () => {
        test('Success', (done) => {
            myacc.dashboards.widgets.delete('xxx', 'yyyy')
                .then((x) => {
                    expect(x).to.exist;
                    expect(x.url).to.be.equal('/dashboard/xxx/widget/yyyy');
                    expect(x.method).to.be.equal('DELETE');
                    expect(x.token).to.be.equal(token);
                    done();
                });
        });
    });
    suite('DeleteData', () => {
        test('Success', (done) => {
            myacc.dashboards.widgets.deleteData('xxx', 'yyyy', ['123','456'])
                .then((x) => {
                    expect(x).to.exist;
                    expect(x.url).to.be.equal('/data/xxx/yyyy?ids[]=123&ids[]=456');
                    expect(x.method).to.be.equal('DELETE');
                    expect(x.token).to.be.equal(token);
                    done();
                });
        });
    });
    suite('RunAnalysis', () => {
        test('Success', (done) => {
            myacc.dashboards.widgets.runAnalysis('xxx', 'yyyy')
                .then((x) => {
                    expect(x).to.exist;
                    expect(x.url).to.be.equal('/data/xxx/yyyy/run');
                    expect(x.method).to.be.equal('POST');
                    expect(x.token).to.be.equal(token);
                    done();
                });
        });
    });
});
