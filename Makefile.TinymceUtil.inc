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

deploy-tinymce-util: build-tinymce-util copy-tinymce-util doc-tinymce-util push-tinymce-util


.PHONY: build-tinymce-util copy-tinymce-util doc-tinymce-util push-tinymce-util deploy-tinymce-util
