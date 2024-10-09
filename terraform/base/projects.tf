resource "google_project" "main" {
  name            = "Prime Number Demo"
  project_id      = var.project_id
  org_id          = var.organization_id
  billing_account = var.billing_account_id
}