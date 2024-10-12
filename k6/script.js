import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  thresholds: {
    http_req_failed: ["rate<0.01"], // http errors should be less than 1%
    http_req_duration: ["p(99)<200"], // 99% of requests should be below 1s
  },
  scenarios: {
    // arbitrary name of scenario
    average_load: {
      executor: "ramping-vus",
      stages: [
        // ramp up to average load of 20 virtual users
        { duration: "10s", target: 20 },
        // maintain load
        { duration: "50s", target: 20 },
        // ramp down to zero
        { duration: "5s", target: 0 },
      ],
    },
  },
};

export default function () {
  let res = http.get("http://localhost:8080/primes/500");

  check(res, { "success login": (r) => r.status === 200 });

  sleep(0.3);
}