const prompt = args[0]
const today = new Date()

if (!secrets.inescKey) {
    throw Error("Need to set ECOVERSE_KEY environment variable")
}

const eletricityPricesRequest = Functions.makeHttpRequest({
    url: "https://vcegi07.inesctec.pt/core/api/",
    method: "POST",
    headers: {
        Authorization: `Bearer ${secrets.ecoverseKey}`,
    },
    data: {},
})

const eletricityPricesResponse = await Promise.all([eletricityPricesRequest])
console.log("raw response", eletricityPricesResponse)

const result = eletricityPricesResponse.data
return Functions.encodeString(result)
