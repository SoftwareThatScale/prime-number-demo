resource "google_artifact_registry_repository" "docker" {
  location      = var.region
  repository_id = "docker"
  description   = "Main docker registry"
  format        = "DOCKER"
}