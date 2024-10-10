variable "organization_id" {
  type    = string
  default = "980306556601"
}

variable "billing_account_id" {
  type    = string
  default = "016C5F-BAEDFB-90A86C"
}

variable "project_id" {
  type    = string
  default = "prime-number-demo-2"
}

variable "region" {
  type    = string
  default = "northamerica-northeast1"
}

variable "backup_region" {
  type    = string
  default = "northamerica-northeast2"
}

variable "domain" {
  type    = string
  default = "prime-number-demo.com"
}

variable "app_tag" {
  type        = string
  description = "App docker image tag"
}