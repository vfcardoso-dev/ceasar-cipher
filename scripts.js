"use strict";

(() => {
    const alphabet = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    
    const shiftIndex = (index, direction) => {
        const jump = 3;
        const length = alphabet.length;

        switch (direction) {
            case 'forward': return index + jump >= length ? (index + jump) - length : index + jump;
            case 'backward': return index - jump < 0 ? (index - jump) + length : index - jump;
        }
    }

    const sanitize = (text) => {
        return text.toUpperCase()
            .replace(/[ÁÀÂÃÄª]/, 'A')
            .replace(/[ÉÈÊË]/, 'E')
            .replace(/[ÍÌÎÏ]/, 'I')
            .replace(/[ÓÒÕÔÖº°]/, 'O')
            .replace(/[ÚÙÛÜ]/, 'U')
            .replace(/[Ç]/, 'C')
            .replace(/[Ñ]/, 'N');
    }

    const doCipher = (text) => {
        const sanitizedText = sanitize(text);
        let cipheredText = "";
        let index, shiftedIndex;
        
        for(let i = 0; i < sanitizedText.length; i++) {
            index = alphabet.indexOf(sanitizedText[i]);
            if (index === -1) {
                cipheredText += sanitizedText[i];
            } else {
                shiftedIndex = shiftIndex(index, 'backward');
                cipheredText += alphabet[shiftedIndex];
            }
        }
        return cipheredText;
    }

    const doDecipher = (text) => {
        const sanitizedText = text.toUpperCase();
        let decipheredText = "";
        let index, shiftedIndex;
        
        for(let i = 0; i < sanitizedText.length; i++) {
            index = alphabet.indexOf(sanitizedText[i]);
            if (index === -1) {
                decipheredText += sanitizedText[i];
            } else {
                shiftedIndex = shiftIndex(index, 'forward');
                decipheredText += alphabet[shiftedIndex];
            }
        }
        return decipheredText;
    }
    
    document.getElementById('cipher').addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('ciphered').innerText = doCipher(document.getElementById('to_cipher').value);
    });

    document.getElementById('decipher').addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('deciphered').innerText = doDecipher(document.getElementById('to_decipher').value);
    });
})();