// Utilize the "Parser" from the eval package to transform strings into mathematical logic
import { Parser } from './eval/src/parser';

// Miscellaneous functions
export function getValues(character, display, ans, reset) {
    // A try block in case the user tries to make an erroneous input
    try {
        // An array in the form of ['display-value', 'ans-value', 'reset-value'] will be returned in the end. The default values are as given in the parameters.
        let array = [display,ans,false];
        if(character === "=") {
            array[0] = "" + Parser.evaluate(display);
            array[1] = "" + Parser.evaluate(display);
            array[2] = true;
        }
            else if(character === "CE" && (display === "SYNTAX ERROR")) {
            array[0] = "";
        }
        else if(character === "CE" ) {
            array[0] = display.slice(0,display.length-1);
        }
        else if(character === "C") {
            array[0] = '';
        }
        else if(character === "Ans") {
            if(reset) {
                array[0] = ans;
                array[2] = true;
            }
            else {
                array[0] = display + ans;
            }
        }
        else if(!Number.isInteger(parseInt(character))) {
            array[0] = display + character;
        }
        else {
            if(reset) {
                array[0] = character;
                array[2] = false;
            }
            else {
                array[0] = display + character;
            }
        }
        return array;
    }

    // If the syntax is erroneous
    catch(err) {
    let array = ["SYNTAX ERROR", ans, true];
    return array;
    }
}

export function FlashingBackground() {
let bg = document.body;
console.log(bg.style.background);
if(bg.style.background === "cyan") {
bg.style.background = "white";
}
else {
bg.style.background = "cyan";
}
}