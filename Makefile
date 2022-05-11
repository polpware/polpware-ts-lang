# deployment


BuildDist := ./dist/polpware/$(Project)
BuildDoc := ./docs
BuildTarget := @polpware/$(Project)
DeployTarget := ./deployment/polpware-$(Project)

prepare-current:
	echo "Make sure that we are the master branch"
	cd $(DeployTarget) && git checkout master && git pull

prepare-ngx13:
	echo "Make sure that we are the ngx13 branch"
	cd $(DeployTarget) && git checkout ngx13 && git pull

include Makefile.deployment

include Makefile.TinymceUtil.inc
