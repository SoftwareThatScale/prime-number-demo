locals {
  api_enabled = [
    "iam.googleapis.com",
    "dns.googleapis.com",
    "storage.googleapis.com",
    "compute.googleapis.com",
    "artifactregistry.googleapis.com",
    "run.googleapis.com",
    "monitoring.googleapis.com"
  ]
}

resource "google_project_service" "project" {
  for_each = toset(local.api_enabled)
  service  = each.key
}