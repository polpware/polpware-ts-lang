SRC_DIR := deps/tinymce/modules/tinymce/src/core/main/ts
DST_DIR := projects/polpware/tinymce-util/src/lib


UTIL_FILES := ArrUtils.ts LazyEvaluator.ts Predicate.ts Private.ts Uuid.ts

API_FILES := Env.ts

API_UTIL_FILES := Class.ts Delay.ts FakeStorage.ts JSON.ts JSONRequest.ts Observable.ts Tools.ts VK.ts \
 Color.ts EventDispatcher.ts I18n.ts JSONP.ts LocalStorage.ts Promise.ts URI.ts XHR.ts

UTIL_FILES_SOURCES := $(addprefix ${DST_DIR}/util/,${UTIL_FILES})
API_FILES_SOURCES := $(addprefix ${DST_DIR}/api/,${API_FILES})
API_UTIL_FILES_SOURCES := $(addprefix ${DST_DIR}/api/util/,${API_UTIL_FILES})

pre:
	mkdir -p projects/polpware/tinymce-util/src/lib/util
	mkdir -p projects/polpware/tinymce-util/src/lib/api/util

projects/polpware/tinymce-util/src/lib/util/%.ts: deps/tinymce/modules/tinymce/src/core/main/ts/util/%.ts
	cp $< $@

projects/polpware/tinymce-util/src/lib/api/%.ts: deps/tinymce/modules/tinymce/src/core/main/ts/api/%.ts
	cp $< $@

files: pre ${UTIL_FILES_SOURCES} ${API_FILES_SOURCES} ${API_UTIL_FILES_SOURCES}
	echo "start"

clean:
	rm -rf projects/polpware/tinymce-util/src/lib/util
	rm -rf projects/polpware/tinymce-util/src/lib/api/util


BuildDist4TinymceUtil := ./dist/polpware/tinymce-util
BuildDoc4TinymceUtil := ./docs
DeployTarget4TinymceUtil := ./deployment/polpware-tinymce-util

build-tinymce-util:
	echo "Build ..."
	npm run tinymce-util
	echo "Build done"

copy-tinymce-util:
	echo "Clean old files ..."
	cd $(DeployTarget4TinymceUtil) && find . -path ./.git -prune -o -name "README.md" -prune -o -type f -exec rm {} \;
	echo "Clean old files done"
	echo "Copy files ..."
	cp -r $(BuildDist4TinymceUtil)/* $(DeployTarget4TinymceUtil)/
	echo "Copy files done"


doc-tinymce-util:
	echo "Build doc ..."
	npm run doc
	echo "Build doc done"
	echo "Copy doc ..."
	mkdir -p $(DeployTarget4TinymceUtil)/docs
	cp -r $(BuildDoc4TinymceUtil)/* $(DeployTarget4TinymceUtil)/docs/
	echo "Copy doc done"

push-tinymce-util:
	echo "Find new files ..."
	cd $(DeployTarget4TinymceUtil) && find . -path ./.git -prune -o -name "README.md" -prune -o -type f -exec git add {} \;
	echo "Find new files done"
	echo "Commit ..."
	cd $(DeployTarget4TinymceUtil) && git commit -am "New publish"
	echo "Commit done ..."
	echo "Push ..."
	cd $(DeployTarget4TinymceUtil) && git push
	echo "Push done"

deploy-tinymce-util: build-tinymce-util copy-tinymce-util push-tinymce-util


.PHONY: build-tinymce-util copy-tinymce-util doc-tinymce-util push-tinymce-util deploy-tinymce-util
