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

include Makefile.TinymceUtil.inc
