function convert() {
        var input = document.getElementById("inputText").value.toUpperCase();
        var output = document.getElementById("output");
        var arabic = 0;
        var roman = '';

        if (romanValue(input)) {
          arabic = romanToArabic(input);
          output.innerHTML = "Essa é o valor da conversão em número arábico: "+ arabic;
        } else if (isArabic(input)) {
          roman = arabicToRoman(parseInt(input));
          output.innerHTML = "Esse é a valor da conversão em algarismo romano: "+ roman;
        } else {
          output.innerHTML = "Insira um valor válido";
        }
      }

      function romanValue(input) {
        return /^[MDCLXVI]+$/.test(input);
      }

      function isArabic(input) {
        return /^\d+$/.test(input);
      }

      function romanToArabic(roman) {
        var romanMap = {
          M: 1000, CM: 900, D: 500, CD: 400, C: 100, XC: 90,
          L: 50, XL: 40, X: 10, IX: 9, V: 5, IV: 4, I: 1
        };

        var arabic = 0;
        for (var i = 0; i < roman.length; i++) {
          var currentValue = romanMap[roman[i]];
          var nextValue = romanMap[roman[i + 1]];
          if (nextValue && currentValue < nextValue) {
            arabic -= currentValue;
          } else {
            arabic += currentValue;
          }
        }
        return arabic;
      }

      function arabicToRoman(arabic) {
        var romanMap = {
          M: 1000, CM: 900, D: 500, CD: 400, C: 100, XC: 90,
          L: 50, XL: 40, X: 10, IX: 9, V: 5, IV: 4, I: 1
        };

        var roman = '';
        for (var key in romanMap) {
          while (arabic >= romanMap[key]) {
            roman += key;
            arabic -= romanMap[key];
          }
        }
        return roman;
      }

