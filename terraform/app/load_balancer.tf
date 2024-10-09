module "lb-http" {
  source  = "terraform-google-modules/lb-http/google//modules/serverless_negs"
  version = "~> 11.0"

  name    = "prime-number-demo"
  project = var.project_id

  ssl                             = true
  managed_ssl_certificate_domains = [var.domain]
  http_forward                    = false

  backends = {
    default = {
      description = null
      groups = [
        for neg in google_compute_region_network_endpoint_group.serverless_neg :
        {
          group = neg.id
        }
      ]
      enable_cdn = true
      cdn_policy = {
        cache_mode = "USE_ORIGIN_HEADERS"
        cache_key_policy = {
          include_host         = true
          include_protocol     = true
          include_query_string = true
          include_http_headers = ["X-My-Header-Field"]
        }
      }

      iap_config = {
        enable = false
      }
      log_config = {
        enable = false
      }
    }
  }
}

resource "google_compute_region_network_endpoint_group" "serverless_neg" {
  for_each = local.regions

  provider              = google
  name                  = "prime-number-demo"
  network_endpoint_type = "SERVERLESS"
  region                = each.key

  cloud_run {
    service = google_cloud_run_v2_service.app[each.key].name
  }
}

resource "google_dns_record_set" "app" {
  name         = "${var.domain}."
  managed_zone = var.dns_name
  type         = "A"
  ttl          = 300

  rrdatas = [module.lb-http.external_ip]
}