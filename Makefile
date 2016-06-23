# Executables
MOCHA_EXEC    = ./node_modules/.bin/mocha
MOCHA__EXEC   = ./node_modules/.bin/_mocha
ESLINT_EXEC   = ./node_modules/.bin/eslint

test: showtodo countconsolelog eslint test-exec

eslint:
	@echo "\n---| ESLINT |---"
	@$(ESLINT_EXEC) .

test-exec:
	-@killall node
	@node mock_server.js &
	@sleep 1
	@echo "\n---| Mocha (Unit) |---"
	@TAGO_API=http://localhost:5000 $(MOCHA_EXEC) \
	--reporter spec \
	--ui tdd \
	--recursive \
	--check-leaks \
	--bail \
	--inline-diffs \
	--timeout 5000 \
	test/
	-@killall node

showtodo:
	@find . \
	-not -path "*node_modules*" \
	-not -path "*coverage*" \
	-not -path "*.git*" \
	-not -path "*Makefile*" \
	-not -path "*wercker.yml*" \
	-type f \
	-exec egrep --color -inH "TODO|FIXME" {} \;

countconsolelog:
	@echo "Number of console.log on all code:"
	@find . \
	-not -path "*node_modules*" \
	-not -path "*coverage*" \
	-not -path "*.git*" \
	-not -path "*Makefile*" \
	-type f \
	-exec egrep --color -inH "console.log" {} \; | wc -l

showconsolelog:
	@find . \
	-not -path "*node_modules*" \
	-not -path "*coverage*" \
	-not -path "*.git*" \
	-not -path "*Makefile*" \
	-type f \
	-exec egrep --color -inH "console.log" {} \;

.PHONY: test eslint test-exec showtodo countconsolelog showconsolelog
