import * as deepl from 'deepl-node';
import { apiKey } from '@/config.js';


const authKey = apiKey; // Replace with your key
const translator = new deepl.Translator(authKey);

(async () => {
    const result = await translator.translateText('Hello, world!', null, 'fr');
    console.log(result.text); // Bonjour, le monde !
})();