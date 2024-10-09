output "main_project" {
  value = google_project.main
}

output "dns_name" {
  value = google_dns_managed_zone.main.name
}