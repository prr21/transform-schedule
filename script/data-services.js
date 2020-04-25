const _dataUrl = 'http://api.dev.cakeiteasy.no/api/store/bakeries/test-bakery-pay-in-store/?country=NO';
const _allDataUrl = 'http://api.dev.cakeiteasy.no/api/store/bakeries/?country_code=no';

async function connect(url){
    return await fetch(url, {
        method: 'GET'

    }).then(response => response.json()

    ).then(data => data)
}