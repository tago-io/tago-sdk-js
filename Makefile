# Executables
MOCHA_EXEC  = ./node_modules/.bin/mocha
JSHINT_EXEC = ./node_modules/jshint/bin/jshint

test: jshint test-device

jshint:
	@echo "\n---| JSHINT |---"
	@find . \
	-name "*.js" -not -path "*node_modules*" -print0 | xargs -0 $(JSHINT_EXEC)

test-device:
	@echo "\n---| Mocha |---"
	@NODE_ENV="TEST" $(MOCHA_EXEC) \
	--reporter spec \
	--ui tdd \
	--slow 5000 \
	--recursive \
	--check-leaks \
	--bail \
	--inline-diffs \
	test/

.PHONY: test jshint test-device
