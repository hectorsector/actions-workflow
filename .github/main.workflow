workflow "Branch management workflow" {
  on = "pull_request"
  resolves = ["branch cleanup"]
}

action "branch cleanup" {
  uses = "jessfraz/branch-cleanup-action@master"
  secrets = ["GITHUB_TOKEN"]
}

workflow "Deployment workflow" {
  on = "push"
  resolves = ["deploy"]
}

action "deploy" {
  uses = "actions/zeit-now@master"
  secrets = ["ZEIT_TOKEN"]
  args = "-e GITHUB_SHA=$GITHUB_SHA -e GITHUB_ACTOR=$GITHUB_ACTOR"
}
