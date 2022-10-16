.PHONY: default install build-libs build

default:
	make install
	make build-libs

install:
	yarn install --frozen-lock

build:
	yarn build

build-libs:
	# prisma
	yarn generate

	# build first
	yarn build:libs