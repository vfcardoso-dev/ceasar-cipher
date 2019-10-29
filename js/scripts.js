"use strict";

(function(){
    var alphabet = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    
    var shiftIndex = function(index, direction) {
        var jump = 3;
        var length = alphabet.length;

        switch (direction) {
            case 'forward': return index + jump > length ? (index + jump) - length : index + jump;
            case 'backward': return index - jump < 0 ? (index - jump) + length : index - jump;
        }
    }

    var doCipher = function(text) {
        var sanitizedText = text.toUpperCase();
        var cipheredText = "";
        
        for(var i = 0; i < sanitizedText.length; i++) {
            if (sanitizedText[i] == ' ') {
                cipheredText += sanitizedText[i];
            } else {
                var index = alphabet.indexOf(sanitizedText[i]);
                var shiftedIndex = shiftIndex(index, 'backward');
                cipheredText += alphabet[shiftedIndex];
            }
        }
        return cipheredText;
    }

    var doDecipher = function(text) {
        var sanitizedText = text.toUpperCase();
        var decipheredText = "";
        
        for(var i = 0; i < sanitizedText.length; i++) {
            if (sanitizedText[i] == ' ') {
                decipheredText += sanitizedText[i];
            } else {
                var index = alphabet.indexOf(sanitizedText[i]);
                var shiftedIndex = shiftIndex(index, 'forward');
                decipheredText += alphabet[shiftedIndex];
            }
        }
        return decipheredText;
    }
    
    document.getElementById('cipher').addEventListener('click', function(e){
        e.preventDefault();
        document.getElementById('ciphered').innerText = doCipher(document.getElementById('to_cipher').value);
    });

    document.getElementById('decipher').addEventListener('click', function(e){
        e.preventDefault();
        document.getElementById('deciphered').innerText = doDecipher(document.getElementById('to_decipher').value);
    });
})();