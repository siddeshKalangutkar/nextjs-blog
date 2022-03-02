export default function handler(req, res){

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Basic NmQwMzkxMmViNGUxZjZjYWRlZTk3N2ZjZmNlMDY2ZWQ6c2hwcGFfMTczYTE2MjM4ZTUxOWI3NTQ5NTVjMDRhODViNDMxY2U=");
    myHeaders.append("Cookie", "_secure_admin_session_id=8683d6e0ead20d65314da9e89894b9ae; _secure_admin_session_id_csrf=8683d6e0ead20d65314da9e89894b9ae");

    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };

    var removeVariant = [];
    let location = req.body.locationId;
    let variantId = req.body.variantArr;
    console.log("location",location)
    console.log("variantId",variantId)

    fetch(`https://green-grain-bowl.myshopify.com/admin/api/2021-10/locations/${location}}/inventory_levels.json?limit=100`, requestOptions)
    .then(response => response.json())
    .then(result => {
        let arrayInventory = result.inventory_levels;
        let inventoryItemId = [];
        arrayInventory.forEach( function(i){
            if(i.available > 0){
              inventoryItemId.push(i.inventory_item_id);
            }            
        });
        console.log(inventoryItemId)
        // let variantId = ["41387874746539", "41387874779307", "41387874812075", "41207550476459", "41231211823275", "41412696703147", "41412696735915", "41412696768683", "40247207854251", "41231214903467", "41412834197675", "41412834230443", "41387743871147", "41387743903915", "41387743936683"]
        variantId.forEach( function(e,i,array) {
            let url = "https://green-grain-bowl.myshopify.com/admin/api/2021-10/variants/"+e+".json";
            fetch(url, requestOptions)
            .then(response2 => response2.json())
            .then(result2 => {
                if(!(inventoryItemId.includes(result2.variant.inventory_item_id))){
                
                    removeVariant.push(e);
                  console.log("removed",e);
                }
                if (i === array.length - 1){ 
                    res.status(200).json({status: 'success', data: removeVariant})
                }
            })
        })
    })
    .catch(error => console.log('error', error));

    // res.status(200).json({status: 'success'})
}