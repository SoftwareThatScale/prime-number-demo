resource "google_dns_managed_zone" "main" {
  name     = "prime-number-demo"
  dns_name = "${var.domain}."
}