## Only for lib developers

#### Run tests
```
$ TAGO_TOKEN_DEVICE="c67ad420-5313-11e4-abbc-fb636882321b" TAGO_TOKEN_ACCOUNT="c67ad490-5313-11e4-abbc-fb636874321b" make test

We recommend to build a simple script to run tests. One example is given below.

$ echo 'TAGO_TOKEN_DEVICE="c67ad420-5313-11e4-abbc-fb636882321b" TAGO_TOKEN_ACCOUNT="c67ad490-5313-11e4-abbc-fb636874321b" make test' > run_tests.sh
$ chmod +x run_tests.sh
$ ./run_tests.sh
```
