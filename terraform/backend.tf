terraform {
  backend "gcs" {
    bucket = "prime-number-demo-tfstate"
  }
}