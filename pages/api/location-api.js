import Cors from 'cors'

// Initializing the cors middleware
const cors = Cors({
    methods: ['GET', 'HEAD'],
})

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req, res, fn) {
    return new Promise((resolve, reject) => {
        fn(req, res, (result) => {
            if (result instanceof Error) {
                return reject(result)
            }

            return resolve(result)
        })
    })
}

export default async function handler(req, res) {

    await runMiddleware(req, res, cors)

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Basic NmQwMzkxMmViNGUxZjZjYWRlZTk3N2ZjZmNlMDY2ZWQ6c2hwcGFfMTczYTE2MjM4ZTUxOWI3NTQ5NTVjMDRhODViNDMxY2U=");
    myHeaders.append("Cookie", "_secure_admin_session_id=8683d6e0ead20d65314da9e89894b9ae; _secure_admin_session_id_csrf=8683d6e0ead20d65314da9e89894b9ae");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    let removeVariant = [];
    let outStockVariant = [];
    let location = req.body.locationId;
    let variantId = req.body.variantArr;
    console.log('body', req)
    console.log("location", location)
    console.log('variantId', variantId)

    let response = await fetch(`https://green-grain-bowl.myshopify.com/admin/api/2021-10/locations/${location}/inventory_levels.json?limit=100`, requestOptions)
    let result = await response.json();

    let arrayInventory = result.inventory_levels;
    let inventoryItemId = arrayInventory.map(i => i.inventory_item_id)
    let inventoryOutOfStockItemId = arrayInventory.filter(i => i.available == 0).map(i => i.inventory_item_id)
    console.log("invent-id",{inventoryItemId})
    console.log("invent-id-out-of-stock",{inventoryOutOfStockItemId})


    for (let e of variantId) {
        console.log({ e })
        let url = "https://green-grain-bowl.myshopify.com/admin/api/2021-10/variants/" + e + ".json";
        let response = await fetch(url, requestOptions)
        let result2 = await response.json()
        console.log('result2', result2)
        if (!(inventoryItemId.includes(result2.variant.inventory_item_id))) {
            removeVariant.push(e);
            console.log("removed", e);
        }
        if ((inventoryOutOfStockItemId.includes(result2.variant.inventory_item_id))) {
            outStockVariant.push(e);
            console.log("os", e);
        }
    }
    res.status(200).json({ status: 'success', data: removeVariant, dataos: outStockVariant })

}