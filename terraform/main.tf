module "base" {
  source = "./base"

  organization_id    = var.organization_id
  billing_account_id = var.billing_account_id
  project_id         = var.project_id
  region             = var.region
  backup_region      = var.backup_region
  domain             = var.domain
}

module "app" {
  source = "./app"

  project_id    = var.project_id
  region        = var.region
  backup_region = var.backup_region
  domain        = var.domain
  dns_name      = module.base.dns_name
  tag           = var.app_tag
}