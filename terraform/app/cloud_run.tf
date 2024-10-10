locals {
  regions = toset([var.region, var.backup_region])
}

resource "google_cloud_run_v2_service" "app" {
  for_each = local.regions

  name     = "prime-number-demo"
  location = each.key
  ingress  = "INGRESS_TRAFFIC_INTERNAL_LOAD_BALANCER"

  template {
    service_account = google_service_account.app.email
    containers {
      image = "northamerica-northeast1-docker.pkg.dev/prime-number-demo-2/docker/prime-number-demo:${var.tag}"
    }
  }
}

resource "google_cloud_run_v2_service_iam_member" "app" {
  for_each = local.regions

  name     = google_cloud_run_v2_service.app[each.key].name
  location = each.key
  role     = "roles/run.invoker"
  member   = "allUsers"
}