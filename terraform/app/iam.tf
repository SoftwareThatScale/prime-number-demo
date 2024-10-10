resource "google_project_iam_member" "app_logWriter" {
  project = var.project_id
  role    = "roles/monitoring.metricWriter"
  member  = google_service_account.app.member
}

resource "google_project_iam_member" "app_metricWriter" {
  project = var.project_id
  role    = "roles/monitoring.metricWriter"
  member  = google_service_account.app.member
}