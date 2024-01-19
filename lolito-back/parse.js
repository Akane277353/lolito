//==================================================================================================
// Importation des modules
//==================================================================================================
const { randomInt } = require('crypto');
const fs = require('fs');

//==================================================================================================
// Constantes
//==================================================================================================
PATH_item = "./data/item.json";

//==================================================================================================
// Fonctions Utiles
//==================================================================================================


function calc_stats(item) {
    let res = {};
    let stats = item.stats;
    for (const key in stats) {
        if (stats.hasOwnProperty(key)) {
            const element = stats[key];
            res[key] = element;
        }
    }
    return res;
}



function get_item_categories(item) {
    let res = {
        tank: false,
        dps: false,
        ap: false,
        support: false,
        mobility: false,
    }
    let stats = calc_stats(item);

    if (stats.hasOwnProperty("FlatHPPoolMod") || stats.hasOwnProperty("FlatSpellBlockMod") || stats.hasOwnProperty("FlatArmorMod")) {
        res.tank = true;
    }
    if (stats.hasOwnProperty("FlatCritChanceMod") || stats.hasOwnProperty("PercentAttackSpeedMod") || stats.hasOwnProperty("FlatPhysicalDamageMod") || stats.hasOwnProperty("PercentLifeStealMod")) {
        res.dps = true;
    }
    if (stats.hasOwnProperty("FlatMagicDamageMod")) {
        res.ap = true;
    }
    if (stats.hasOwnProperty("FlatMPPoolMod")) {
        res.support = true;
    }
    if (stats.hasOwnProperty("FlatMovementSpeedMod")) {
        res.mobility = true;
    }
    /*
    * FlatCritChanceMod
    * FlatHPPoolMod
    * PercentAttackSpeedMod
    * PercentMovementSpeedMod
    * FlatMovementSpeedMod
    * FlatArmorMod
    * FlatPhysicalDamageMod
    * PercentLifeStealMod
    * FlatSpellBlockMod
    * FlatMPPoolMod
    */
    return res;
}


function clac_coords(item, items) {
    if(item.from.length == 0){
        if(item.into.length == 0){
            return [0,0];
        }else{
            return [0,1];
        }
    }else{
        let x = 1;
        let y = 1;
        for (let i = 0; i < item.from.length; i++) {
            const id = item.from[i];
            co = clac_coords(items[id], items);
            x += co[0];
            y += co[1];
        }
        return [x,y];
    }

}

let balsie = {};
function item_desc_stats(item) {
    if (item.description == undefined || item.description == "") {
        return [{},""];
    }else{
        res.stats = {};
        let description = item.description;
        description = description.replace("<mainText>", '').replace("</mainText>", '')
        description = description.split("<br><br>");
        stats = description[0];
        description = description[1];
    
        let desc = description
        if(description == undefined){
            console.log(item);
        }
        desc = desc.split("<");  
        for (let i = 0; i < desc.length; i++) {
            let d = desc[i].split(">");
            if (d.length > 1) {
                balsie[d[0]] = 1;
            }
        }
        stat = item.stats;
        if(stat == undefined){
            console.log(item);
            stat={};
        }else{
            //si le dict est vide
            if(Object.keys(stat).length == 0){
                // console.log(item);
            }
        }

        effect = {};
        if (item.effect != undefined) {
            effect = item.effect;
        }
        
        return [stat, description,effect]
    }



    // description = description.split("<br>");

    // // console.log(description);


}
function parse_item(item, key) {


    if (item.inStore == false || item.gold.purchasable != true || item.maps[11] != true || item.hideFromAll == true) {
        return undefined;
    }
    else {
        res = {
            name: item.name,
            id: key,
            gold: item.gold,
            plaintext: item.plaintext,
            image: item.image,
            stacks: item.stacks,
            consumed: item.consumed,
            consumeOnFull: item.consumeOnFull,
            depth : item.depth,

        };

        if(res.depth == undefined){
            res.depth = 1;
        }
        if (res.image == undefined) {
            res.image = [];
        } else {
            imgs = {}
            for (const key in res.image) {
                const element = res.image[key];
                if (element != undefined) {
                    imgs[key] = "https://ddragon.leagueoflegends.com/cdn/14.1.1/img/item/" + element;
                }
            }
            res.image = imgs;
        }
        if (res.plaintext == undefined) {
            res.plaintext = "";
        }
        if (res.stacks == undefined) {
            res.stacks = 1;
        }
        if (res.consumed == undefined) {
            res.consumed = false;
        }
        if (res.consumeOnFull == undefined) {
            res.consumeOnFull = false;
        }

        if (item.from != undefined) {
            res.from = item.from;
        } else {
            res.from = [];
        }
        if (item.into != undefined) {
            res.into = item.into;
        } else {
            res.into = [];
        }

        brut = item_desc_stats(item);
        res.stats = brut[0];
        res.description = brut[1];
        res.effect = brut[2];

        res.categories = get_item_categories(item);
        res.display = true;



        return res

    }
}

function spread_liaison(item, items, permutation) {
    const ID = permutation[item.id];
    if (item.from != []) {
        from = []
        for (let i = 0; i < item.from.length; i++) {
            const key = item.from[i];
            if (permutation[key] != undefined) {
                let id = permutation[key];
                from.push(id);
                to = items[id].into;
                tonew = [];
                isIn = false;
                for (let j = 0; j < to.length; j++) {
                    const id2 = to[j];
                    if (permutation[id2] != undefined) {
                        p = permutation[id2];
                        if (p == ID) {
                            isIn = true;
                        }
                        tonew.push(p);
                    } else {

                        if (id2 == ID) {
                            isIn = true;
                        }
                        tonew.push(id2);


                    }
                }
                if (!isIn) {
                    tonew.push(ID);
                }
                items[id].into = tonew;
            }

        }
    }
    if (item.into != []) {
        into = []
        for (let i = 0; i < item.into.length; i++) {
            const key = item.into[i];
            if (permutation[key] != undefined) {
                let id = permutation[key];
                into.push(id);
                to = items[id].from;
                tonew = [];
                isIn = false;
                for (let j = 0; j < to.length; j++) {
                    const id2 = to[j];
                    if (permutation[id2] != undefined) {
                        p = permutation[id2];
                        if (p == ID) {
                            isIn = true;
                        }
                        tonew.push(p);
                    } else {
                        if (id2 == ID) {
                            isIn = true;
                        }
                        tonew.push(id2);

                    }
                }
                if (!isIn) {
                    tonew.push(ID);
                }
                items[id].from = tonew;
            }

        }
    }

}

function verifLiaison(items, permutation) {
    for (let i = 0; i < items.length; i++) {
        fromNew = [];
        for (let j = 0; j < items[i].from.length; j++) {
            if (items[i].from[j] != undefined) {
                if (typeof items[i].from[j] == "string") {
                    p = permutation[items[i].from[j]];
                    if (p != undefined) {
                        fromNew.push(p);

                    }
                } else {
                    fromNew.push(items[i].from[j]);
                }
            }
        }
        items[i].from = fromNew;
        intoNew = [];
        for (let j = 0; j < items[i].into.length; j++) {
            if (items[i].into[j] != undefined) {
                if (typeof items[i].into[j] == "string") {

                    p = permutation[items[i].into[j]];
                    if (p != undefined) {
                        intoNew.push(p);

                    }
                } else {
                    intoNew.push(items[i].into[j]);
                }
            }
        }
        items[i].into = intoNew;
    }
}


function nomCompatible(nom, item){
    if(item.name.toLowerCase().includes(nom.toLowerCase())){
        return true;
    }
    if(item.plaintext.toLowerCase().includes(nom.toLowerCase())){
        return true;
    }
    return false;
}

function validateLiaison(items,indices){
    for(let i = 0; i < items.length; i++){
        item = items[i];
        newFrom = [];
        newInto = [];
        for(let j = 0; j < item.from.length; j++){
            if(indices.includes(item.from[j])){
                newFrom.push(item.from[j]);
            }
        }
        for(let j = 0; j < item.into.length; j++){
            if(indices.includes(item.into[j])){
                newInto.push(item.into[j]);
            }
        }
        item.from = newFrom;
        item.into = newInto;
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

    let permutation = {};

    for (const key in items_brut) {
        cpt++;
        let item = items_brut[key];
        res = parse_item(item, key);
        if (res != undefined) {
            cpt2++;
            items.push(res);
            permutation[key] = parseInt(items.length - 1);
        }
    }

    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        spread_liaison(item, items, permutation);
    }
    verifLiaison(items, permutation);


    for(let i = 0; i < items.length; i++){
        items[i].id = i;
        items[i].coords = clac_coords(items[i], items);
    }
    // console.log(balsie);
    //console.log(items);
    // console.log(cpt, cpt2);
    return items;
}




function chercher(nom,categories){
    items = parse_items();
    indices = [];

    for(let i = 0; i < items.length; i++){
        item = items[i];
        item.display = false;
        if(nomCompatible(nom,item)){
            if(categories.length == 0){
                indices.push(i);
                item.display = true;
            }else{
                for(let j = 0; j < categories.length; j++){
                    if(item.categories[categories[j]]){
                        indices.push(i);
                        item.display = true;
                        break;
                    }
                }
            }
        }
    }

    validateLiaison(items,indices);

    return items;


}
//parse_items();

module.exports = {
    parse_items,
    chercher,
    categories : ["tank","dps","ap","support","mobility"]
}


