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
        text = text.toUpperCase();
        text = text.replace(/[ÁÀÂÃÄª]/, 'A');
        text = text.replace(/[ÉÈÊË]/, 'E');
        text = text.replace(/[ÍÌÎÏ]/, 'I');
        text = text.replace(/[ÓÒÕÔÖº°]/, 'O');
        text = text.replace(/[ÚÙÛÜ]/, 'U');
        text = text.replace(/[Ç]/, 'C');
        text = text.replace(/[Ñ]/, 'N');
        return text;
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