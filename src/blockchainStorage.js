import { readFile, writeFile } from 'node:fs/promises';
import { getDate } from "./divers.js";
import { createHash } from 'node:crypto';
import { v4 as uuidv4 } from 'uuid';

/* Chemin de stockage des blocks */
const path = './data/blockchain.json';

/**
 * Mes définitions
 * @typedef { id: string, nom: string, don: number, date: string, hash: string, chaine: string } Block
 * @property {string} id
 * @property {string} nom
 * @property {number} don
 * @property {string} date
 * @property {string} hash
 * @property {string} chaine
 */

/**
 * Renvoie un tableau JSON de tous les blocks
 * @return {Promise<Block[]>}
 */
export async function findBlocks() {
    try {
        const result = await readFile(path, { encoding: 'utf8' });
        return result ? JSON.parse(result) : [];
    } catch (error) {
        console.log(error);
        throw error;
    }
}

/**
 * Trouve le dernier block de la chaîne
 * @return {Promise<Block|null>}
 */
export async function findLastBlock() {
    try {
        const blocks = await findBlocks();
        if (!blocks || blocks.length === 0) {
            return null;
        }
        return blocks[blocks.length - 1];
    } catch (error) {
        console.log(error);
        throw error;
    }
}

/**
 * Crée le hachage d'une chaîne de caractères.
 * @param {string} input - La chaîne à hacher.
 * @return {string} - Le hachage en format hexadécimal.
 */
function generateSHA256(input) {
    const hash = createHash('sha256');
    hash.update(input, 'utf-8');
    return hash.digest('hex');
}

/**
 * Crée un nouveau block et l'ajoute au fichier blockchain.json.
 * @param {Object} contenu - Les données transmises lors de la requête POST.
 * @return {Promise<void>}
 */
export async function createBlock(contenu) {
    try {
        // Lecture du contenu actuel du fichier blockchain.json
        const blocks = await findBlocks();

        // Génération d'un nouvel ID avec la fonction uuidv4
        const newBlockId = uuidv4();

        // Obtention de la date avec la méthode getDate()
        const newBlockDate = getDate();

        // Génère le hachage du block en utilisant les données du block actuel et le hachage du dernier block
        const lastBlock = await findLastBlock();
        const lastBlockHash = lastBlock ? lastBlock.hash : '';
        const newBlockHash = generateSHA256(JSON.stringify({...contenu, date: newBlockDate, hash: lastBlockHash}));

        // Création d'un nouveau block avec les valeurs transmises
        const newBlock = {
            id: newBlockId,
            nom: contenu.nom,
            don: contenu.don,
            date: newBlockDate,
            hash: newBlockHash,
            chaine: 'END'
        };

        // Ajout du nouveau block à la fin du tableau de blocks existants
        blocks.push(newBlock);

        // Enregistrement du tableau mis à jour dans le fichier blockchain.json
        await writeFile(path, JSON.stringify(blocks, null, 2), { encoding: 'utf8' });

        console.log('Block créé avec succès:', newBlock);
    } catch (error) {
        console.error('Erreur lors de la création du block :', error);
        throw error;
    }
}

/**
 * Vérifie l'intégrité de la chaîne.
 * @return {Promise<boolean>}
 */
export async function verifBlocks() {
    try {
        const blocks = await findBlocks();
        console.log('Blocks:', blocks);

        if (!blocks || blocks.length === 0) {
            console.log('Aucun bloc trouvé.');
            return false;
        }

        for (let i = 0; i < blocks.length - 1; i++) {
            const currentBlock = blocks[i];
            const nextBlock = blocks[i + 1];

            const currentBlockHash = generateSHA256(JSON.stringify(currentBlock));
            console.log(`Block ${i} - Calculated Hash: ${currentBlockHash}, Next Block Hash: ${nextBlock.hash}`);

            if (currentBlockHash !== nextBlock.hash) {
                console.log('Intégrité compromise - Retourne false');
                return false;
            }
        }

        console.log('Tous les blocs sont liés - Retourne true');
        return true;
    } catch (error) {
        console.log('Erreur:', error);
        throw error;
    }
}



/**
 * Récupère un bloc particulier à partir de son id.
 * @param {string} blockId - L'id du bloc à récupérer.
 * @return {Promise<Block|null>}
 */
export async function findBlock(blockId) {
    try {
        const blocks = await findBlocks();
        const block = blocks.find(block => block.id === blockId);
        if (!block || !(await verifBlocks())) {
            return {
                unreliable: true,
                message: 'Le bloc n\'est pas fiable. L\'intégrité de la chaîne pourrait être compromise.'
            };
        }

        return block;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
