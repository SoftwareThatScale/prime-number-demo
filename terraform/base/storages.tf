resource "google_storage_bucket" "tfstate" {
  name                     = "prime-number-demo-tfstate"
  location                 = "CA"
  storage_class            = "STANDARD"
  public_access_prevention = "enforced"

  versioning {
    enabled = true
  }

  custom_placement_config {
    data_locations = [var.region, var.backup_region]
  }

  lifecycle_rule {
    action {
      type = "Delete"
    }
    condition {
      num_newer_versions = 3
      with_state         = "ARCHIVED"
    }
  }

  lifecycle_rule {
    action {
      type = "Delete"
    }
    condition {
      days_since_noncurrent_time = 7
    }
  }
}