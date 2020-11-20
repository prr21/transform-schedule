const _dataUrl =
  "http://api.dev.cakeiteasy.no/api/store/bakeries/test-bakery-pay-in-store"
const _dataUrlAll = "http://api.dev.cakeiteasy.no/api/store/bakeries/"

function connect(url) {
  return fetch(url)
    .then((response) => response.json())
    .then((data) => data)
    .catch((e) => {
      throw new Error(e)
    })
}
