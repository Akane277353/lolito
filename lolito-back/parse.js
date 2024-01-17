//==================================================================================================
// Importation des modules
//==================================================================================================
const fs = require('fs');

//==================================================================================================
// Constantes
//==================================================================================================
PATH_item = "./data/item.json";

//==================================================================================================
// Fonctions Utiles
//==================================================================================================

function item_desc_stats(item){
        res.stats = {};
        let description = item.description;
        description = description.replace("<mainText>", '').replace("</mainText>", '')
        description = description.split("<br><br>");
        stats = description[0];
        description = description[1];

        // description = description.split("<br>");

        // // console.log(description);

    return [],description
}
function parse_item(item,key) {


    if(item.inStore == false || item.gold.purchasable != true || item.maps[11] != true || item.hideFromAll == true){
        return undefined;
    }
    else{
        res = {
            name: item.name,
            id:key,
            gold: item.gold,
            plaintext : item.plaintext,
            image: item.image,
            stacks: item.stacks,
            consumed: item.consumed,
            consumeOnFull: item.consumeOnFull,

        };

        if(res.plaintext == undefined){
            res.plaintext = "";
        }
        if(res.stacks == undefined){
            res.stacks = 1;
        }
        if(res.consumed == undefined){
            res.consumed = false;
        }
        if(res.consumeOnFull == undefined){
            res.consumeOnFull = false;
        }

        if(item.from != undefined){
            res.from = item.from;
        }else{
            res.from = [];
        }
        if(item.into != undefined){
            res.into = item.into;
        }else{
            res.into = [];
        }

        let stats,description = item_desc_stats(item);
        res.stats = stats;
        res.description = description;



        return res

    }
}

function spread_liaison(item,items){
    if(item.from != []){
        for (let i = 0; i < item.from.length; i++) {
            const id = item.from[i];
            items[id].into.push(item.id);
        }
    }
    if(item.into != []){
        for (const key in item.into) {
            const id = item.into[key];
            items[id].from.push(item.id);
        }
    }

}


//==================================================================================================
// Main
//==================================================================================================
function parse_items() {
    const data = fs.readFileSync(PATH_item, 'utf8');

    const json = JSON.parse(data);

    const items_brut = json.data;
    cpt = 0;
    cpt2 = 0;

    let items = []

    for (const key in items_brut) {
        cpt++;
        let item = items_brut[key];
        res = parse_item(item,key);
        if (res != undefined) {
            cpt2++;
            items.push(item);
        }
    }
    console.log(cpt, items.length,cpt2);
    return items;
}


// parse_items();

module.exports = {
    parse_items
}