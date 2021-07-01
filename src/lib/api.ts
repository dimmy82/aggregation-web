export async function findAggregations(name: string, address: string, url: string): Promise<Agg> {
    window.console.log(`企業名：${name}, 企業住所：${address}, 企業URL：${url}`);
    // TODO: encodeURIとencodeURIComponentの違いを理解する
    // https://aloerina01.github.io/blog/2017-04-28-1
    // &address=${encodeURIComponent(address)}&url=${encodeURIComponent(url)}
    const res = await fetch(`/v1/companies?name=${encodeURIComponent(name)}`)
    const payload = await res.json();
    console.log('aaaaaaaaaaaaa')
    // const agg: Agg = JSON.parse(payload)
    return payload
}

export type Agg = {
    results: Array<AggResult>
}

export type AggResult = {
    globalId: string
    details: AggResultDetail
}

export type AggResultDetail = {
    name: string
    registrationNumber: string
    isin: string
    tel: string
    country: string
    establishDate: string
    url: string
    address: string
}
 