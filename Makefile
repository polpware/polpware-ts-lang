# deployment


BuildDist := ./dist/polpware/$(Project)
BuildDoc := ./docs
BuildTarget := @polpware/$(Project)
DeployTarget := ./deployment/polpware-$(Project)

include Makefile.deployment

include Makefile.TinymceUtil.inc
