import { createServer } from "node:http";
import { create, liste } from "./blockchain.js";
import { NotFoundError } from "./errors.js";
import { findBlock, verifBlocks } from "./blockchainStorage.js";

createServer(async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const url = new URL(req.url, `http://${req.headers.host}`);
    const endpoint = `${req.method}:${url.pathname}`;

    let results;

    try {
        switch (endpoint) {
            case 'GET:/blockchain':
                results = await liste(req, res, url);
                console.log("oui get", results);
                break;
            case 'POST:/blockchain':
                results = await create(req, res);
                console.log("oui post", results);
                break;
            case 'GET:/verify':
                // Tester la fonction verifBlocks
                results = await verifBlocks();
                console.log("Verification de la chaine :", results);
                break;
            case 'GET:/findBlock/:id':
                // Tester la fonction findBlock avec un ID spécifique
                const blockId = url.pathname.split('/').pop();
                results = await findBlock(blockId);
                console.log("Récupération du bloc avec l'ID :", blockId, results);
                break;
            default:
                res.writeHead(404);
        }
        if (results) {
            res.write(JSON.stringify(results));
        }
    } catch (erreur) {
        if (erreur instanceof NotFoundError) {
            res.writeHead(404);
        } else {
            throw erreur;
        }
    }
    res.end();
}).listen(3000);
