const c1 = require('./c1.js');
const c2 = require('./c2.js');
const a1 = require('./a1.js');
const a2 = require('./a2.js');
const t1 = require('./t1.js');
const t2 = require('./t2.js');

let arr1=c1.split('\n\n');

for(let i=0;i<arr1.length;i++){
    arr1[i]=arr1[i].replace('\n',' ');
}

let arr2=c2.split('\n\n');

for(let i=0;i<arr2.length;i++){
    arr2[i]=arr2[i].replace('\n',' ');
}

let text1=t1.split('\n\n');
let text2=t2.split('\n\n');
let ans1=a1.split('\n');
let ans2=a2.split('\n');

console.log(arr1.length-ans1.length);
console.log(arr2.length-ans2.length);

// Lambda Function code for Alexa.
// Paste this into your index.js file. 

 // Lambda Function code for Alexa.
// Paste this into your index.js file. 

const Alexa = require("ask-sdk");
const https = require("https");



const invocationName = "math counts countdown";

// Session Attributes 
//   Alexa will track attributes for you, by default only during the lifespan of your session.
//   The history[] array will track previous request(s), used for contextual Help/Yes/No handling.
//   Set up DynamoDB persistence to have the skill save and reload these attributes between skill sessions.

function getMemoryAttributes() {   const memoryAttributes = {
       "history":[],

        // The remaining attributes will be useful after DynamoDB persistence is configured
       "launchCount":0,
       "lastUseTimestamp":0,

       "lastSpeechOutput":{},
       "nextIntent":[]

       // "favoriteColor":"",
       // "name":"",
       // "namePronounce":"",
       // "email":"",
       // "mobileNumber":"",
       // "city":"",
       // "state":"",
       // "postcode":"",
       // "birthday":"",
       // "bookmark":0,
       // "wishlist":[],
   };
   return memoryAttributes;
};

const maxHistorySize = 20; // remember only latest 20 intents 


// 1. Intent Handlers =============================================

const AMAZON_CancelIntent_Handler =  {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' && request.intent.name === 'AMAZON.CancelIntent' ;
    },
    handle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        const responseBuilder = handlerInput.responseBuilder;
        let sessionAttributes = handlerInput.attributesManager.getSessionAttributes();


        let say = 'Okay, talk to you later! ';

        return responseBuilder
            .speak(say)
            .withShouldEndSession(true)
            .getResponse();
    },
};

const AMAZON_HelpIntent_Handler =  {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' && request.intent.name === 'AMAZON.HelpIntent' ;
    },
    handle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        const responseBuilder = handlerInput.responseBuilder;
        let sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

        let intents = getCustomIntents();
        let sampleIntent = randomElement(intents);

        let say = 'You asked for help. '; 

        // let previousIntent = getPreviousIntent(sessionAttributes);
        // if (previousIntent && !handlerInput.requestEnvelope.session.new) {
        //     say += 'Your last intent was ' + previousIntent + '. ';
        // }
        // say +=  'I understand  ' + intents.length + ' intents, '

        say += ' Here something you can ask me, ' + getSampleUtterance(sampleIntent);

        return responseBuilder
            .speak(say)
            .reprompt('try again, ' + say)
            .getResponse();
    },
};

const AMAZON_PauseIntent_Handler =  {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' && request.intent.name === 'AMAZON.PauseIntent' ;
    },
    handle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        const responseBuilder = handlerInput.responseBuilder;
        let sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

        let say = 'Hello from AMAZON.PauseIntent. ';


        return responseBuilder
            .speak(say)
            .reprompt('try again, ' + say)
            .getResponse();
    },
};

const AMAZON_StartOverIntent_Handler =  {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' && request.intent.name === 'AMAZON.StartOverIntent' ;
    },
    handle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        const responseBuilder = handlerInput.responseBuilder;
        let sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

        let say = 'Hello from AMAZON.StartOverIntent. ';


        return responseBuilder
            .speak(say)
            .reprompt('try again, ' + say)
            .getResponse();
    },
};

const AMAZON_StopIntent_Handler =  {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' && request.intent.name === 'AMAZON.StopIntent' ;
    },
    handle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        const responseBuilder = handlerInput.responseBuilder;
        let sessionAttributes = handlerInput.attributesManager.getSessionAttributes();


        let say = 'Okay, talk to you later! ';

        return responseBuilder
            .speak(say)
            .withShouldEndSession(true)
            .getResponse();
    },
};

const AnswerIntent_Handler =  {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' && request.intent.name === 'AnswerIntent' ;
    },
    handle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        const responseBuilder = handlerInput.responseBuilder;
        let sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        let slotValues = getSlotValues(request.intent.slots); 

        let bool=false;
        let say = '';
        let say2='';
        let correct=false;

        const speechConsCorrect = ['Booya', 'All righty', 'Bam', 'Bazinga', 'Bingo', 'Boom', 'Bravo', 'Cha Ching', 'Cheers', 'Dynomite', 'Hip hip hooray', 'Hurrah', 'Hurray', 'Huzzah', 'Oh dear.  Just kidding.  Hurray', 'Kaboom', 'Kaching', 'Oh snap', 'Phew','Righto', 'Way to go', 'Well done', 'Whee', 'Woo hoo', 'Yay', 'Wowza', 'Yowsa'];
        const speechConsWrong = ['Argh', 'Aw man', 'Blarg', 'Blast', 'Boo', 'Bummer', 'Darn', "D'oh", 'Dun dun dun', 'Eek', 'Honk', 'Le sigh', 'Mamma mia', 'Oh boy', 'Oh dear', 'Oof', 'Ouch', 'Ruh roh', 'Shucks', 'Uh oh', 'Wah wah', 'Whoops a daisy', 'Yikes'];

        if(sessionAttributes.question){
            if(sessionAttributes.mode===0){
                bool=false;
            } 
            if(sessionAttributes.mode===1){
                bool=true;
            } 
            say2+="the answer is ";
            let ansArr;
            let ansArr2;
            if(bool){
                ansArr=arr2;
                ansArr2=ans2;
            } else {
                ansArr=arr1;
                ansArr2=ans1;
            }
            let Ansval=ansArr2[ansArr.indexOf(sessionAttributes.question)];
            console.log(sessionAttributes.question);
            console.log(ansArr.indexOf(sessionAttributes.question));
            console.log(Ansval);
            if(Ansval.indexOf("/")!==-1){
                let theAnsArr=Ansval.split("/");
                say2+=theAnsArr[0]+" over "+theAnsArr[1];

                if(slotValues.Numerator&&slotValues.Denominator&&slotValues.Numerator.heardAs===theAnsArr[0] && slotValues.Denominator.heardAs===theAnsArr[1]){
                    correct=true;
                }
            } else if(Ansval.indexOf(".")!==-1){
                let theAnsArr=Ansval.split(".");
                say2+=theAnsArr[0]+" point "+theAnsArr[1];

                if(slotValues.DecimalA&&slotValues.DecimalB&&slotValues.DecimalA.heardAs===theAnsArr[0] && slotValues.DecimalB.heardAs===theAnsArr[1]){
                    correct=true;
                }
            } else {
                say2+=Ansval;

                if(slotValues.Number&&slotValues.Number.heardAs===Ansval){
                    correct=true;
                } else {
                    if(slotValues.Others&&(slotValues.Others.heardAs===Ansval||Ansval==="twenty four root three"&&slotValues.Others.heardAs==="twenty four times the square root of three")){
                        correct=true;
                    }
                }
            }
            if(correct){
                say+=speechConsCorrect[Math.floor(Math.random()*speechConsCorrect.length)]+"! ";
                say+="You're correct! Your score is "+(sessionAttributes.win+1);
                sessionAttributes.win=sessionAttributes.win+1;
            } else {
                say+=speechConsWrong[Math.floor(Math.random()*speechConsWrong.length)]+"! ";
                say+=say2;
                say+=". Your score is "+sessionAttributes.win;
            }
            say+=" for "+(sessionAttributes.total+1)+". Would you like another question?"
            sessionAttributes.total=sessionAttributes.total+1;
            sessionAttributes.question = "";
            handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
        } else {
            return responseBuilder
            .speak("would you like another question?")
            .reprompt('try again, ' + say)
            .getResponse();
        }

        let resolvedSlot;
        // getSlotValues returns .heardAs, .resolved, and .isValidated for each slot, according to request slot status codes ER_SUCCESS_MATCH, ER_SUCCESS_NO_MATCH, or traditional simple request slot without resolutions

        // console.log('***** slotValues: ' +  JSON.stringify(slotValues, null, 2));
        //if (slotValues.Number.heardAs) {


        return responseBuilder
            .speak(say)
            .reprompt('try again, ' + say)
            .getResponse();
    },
};

const QuizIntent_Handler =  {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' && request.intent.name === 'QuizIntent' ;
    },
    handle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        const responseBuilder = handlerInput.responseBuilder;
        let sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        let bool=false;

        let slotStatus = '';
        let resolvedSlot;

        let slotValues = getSlotValues(request.intent.slots); 

        if(sessionAttributes.mode===0){
            bool=false;
        } 
        if(sessionAttributes.mode===1){
            bool=true;
        } 

        if(slotValues.Mode.heardAs){
            const easyArr=["easy mode", "easy", "chapter", "chapter level", "switch to chapter level"];
            if(slotValues.Mode.heardAs.indexOf("switch")>-1){
                sessionAttributes.mode=0;
                bool=false;
                slotStatus="You are in chapter level. ";
                if(sessionAttributes.mode===0){
                    sessionAttributes.mode=1;
                    bool=true;
                    slotStatus="You are in state level. ";
                }
            } else {
                if(easyArr.includes(slotValues.Mode.heardAs)){
                    bool=false;
                    sessionAttributes.mode=0;
                    slotStatus="You are in chapter level. ";
                } else {
                    bool=true;
                    sessionAttributes.mode=1;
                    slotStatus="You are in state level. ";
                }
            }
        } else {
            if(sessionAttributes.question){
                return responseBuilder
                .speak('try again, ' + sessionAttributes.question)
                .reprompt('try again, ' + say)
                .getResponse();
            }
        }
        let question;
        let question2;
        if(bool){
            let index=Math.floor(Math.random()*arr2.length);
            question=arr2[index];
            question2=text2[index];
        } else {
            let index=Math.floor(Math.random()*arr1.length);
            question=arr1[index];
            question2=text1[index];
        }
        sessionAttributes.question = question;
        handlerInput.attributesManager.setSessionAttributes(sessionAttributes);

        let say = slotStatus+"question "+(sessionAttributes.total+1)+": "+question;


        return responseBuilder
            .speak(say)
            .reprompt('try again, ' + say)
            .withSimpleCard("Question "+(sessionAttributes.total+1),question2)
            .getResponse();
    },
};

const AMAZON_NavigateHomeIntent_Handler =  {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' && request.intent.name === 'AMAZON.NavigateHomeIntent' ;
    },
    handle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        const responseBuilder = handlerInput.responseBuilder;
        let sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

        let say = 'Hello from AMAZON.NavigateHomeIntent. ';


        return responseBuilder
            .speak(say)
            .reprompt('try again, ' + say)
            .getResponse();
    },
};

const AMAZON_FallbackIntent_Handler =  {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' && request.intent.name === 'AMAZON.FallbackIntent' ;
    },
    handle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        const responseBuilder = handlerInput.responseBuilder;
        let sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

        let previousSpeech = getPreviousSpeechOutput(sessionAttributes);

        return responseBuilder
            .speak('Sorry I didnt catch what you said, ' + stripSpeak(previousSpeech.outputSpeech))
            .reprompt(stripSpeak(previousSpeech.reprompt))
            .getResponse();
    },
};

const AMAZON_NoIntent_Handler =  {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' && request.intent.name === 'AMAZON.NoIntent' ;
    },
    handle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        const responseBuilder = handlerInput.responseBuilder;
        let sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

        let say = "Thank you for playing! You ended with "+sessionAttributes.win+" questions correct out of "+sessionAttributes.total+" total questions.";
        if(sessionAttributes.win>=sessionAttributes.total/2){
            say+=" Keep up to good work!";
        } else {
            say+=" Keep practicing!";
        }
        return responseBuilder
            .speak(say)
            .withSimpleCard("Thanks for playing!")
    },
};

const LaunchRequest_Handler =  {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'LaunchRequest';
    },
    handle(handlerInput) {
        const responseBuilder = handlerInput.responseBuilder;
        let sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

        let say = 'hello and welcome to mathcounts countdown ! I will ask you questions from the 2020 mathcounts chapter or state level. Would you like to try chapter level or state level?';

        let skillTitle = capitalize(invocationName);
        sessionAttributes.win=0;
        sessionAttributes.total=0;
        handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
        return responseBuilder
            .speak(say)
            .reprompt('try again, ' + say)
            .withSimpleCard("Welcome to Mathcounts countdown!","Say 'start questions' to begin")
            .getResponse();
    },
};

const SessionEndedHandler =  {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        let say = 'hello and welcome to mathcounts countdown ! I will ask you questions from the 2020 mathcounts chapter or state level. Would you like to try chapter level or state level?';

        let skillTitle = capitalize(invocationName);
        sessionAttributes.win=0;
        sessionAttributes.total=0;
        handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
        return responseBuilder
            .speak(say)
            .reprompt('try again, ' + say)
            .withSimpleCard("Welcome to Mathcounts countdown!","Say 'start questions' to begin")
    }
};

const ErrorHandler =  {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const request = handlerInput.requestEnvelope.request;

        console.log(`Error handled: ${error.message}`);
        // console.log(`Original Request was: ${JSON.stringify(request, null, 2)}`);

        return handlerInput.responseBuilder
            .speak('Command not recognized, please try a different command')
            .reprompt('Command not recognized, please try a different command')
            .getResponse();
    }
};


// 2. Constants ===========================================================================

    // Here you can define static data, to be used elsewhere in your code.  For example: 
    //    const myString = "Hello World";
    //    const myArray  = [ "orange", "grape", "strawberry" ];
    //    const myObject = { "city": "Boston",  "state":"Massachusetts" };

const APP_ID = undefined;  // TODO replace with your Skill ID (OPTIONAL).

// 3.  Helper Functions ===================================================================

function capitalize(myString) {

     return myString.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); }) ;
}

 
function randomElement(myArray) { 
    return(myArray[Math.floor(Math.random() * myArray.length)]); 
} 
 
function stripSpeak(str) { 
    return(str.replace('<speak>', '').replace('</speak>', '')); 
} 
 
 
 
 
function getSlotValues(filledSlots) { 
    const slotValues = {}; 
 
    Object.keys(filledSlots).forEach((item) => { 
        const name  = filledSlots[item].name; 
 
        if (filledSlots[item] && 
            filledSlots[item].resolutions && 
            filledSlots[item].resolutions.resolutionsPerAuthority[0] && 
            filledSlots[item].resolutions.resolutionsPerAuthority[0].status && 
            filledSlots[item].resolutions.resolutionsPerAuthority[0].status.code) { 
            switch (filledSlots[item].resolutions.resolutionsPerAuthority[0].status.code) { 
                case 'ER_SUCCESS_MATCH': 
                    slotValues[name] = { 
                        heardAs: filledSlots[item].value, 
                        resolved: filledSlots[item].resolutions.resolutionsPerAuthority[0].values[0].value.name, 
                        ERstatus: 'ER_SUCCESS_MATCH' 
                    }; 
                    break; 
                case 'ER_SUCCESS_NO_MATCH': 
                    slotValues[name] = { 
                        heardAs: filledSlots[item].value, 
                        resolved: '', 
                        ERstatus: 'ER_SUCCESS_NO_MATCH' 
                    }; 
                    break; 
                default: 
                    break; 
            } 
        } else { 
            slotValues[name] = { 
                heardAs: filledSlots[item].value, 
                resolved: '', 
                ERstatus: '' 
            }; 
        } 
    }, this); 
 
    return slotValues; 
} 
 
function getExampleSlotValues(intentName, slotName) { 
 
    let examples = []; 
    let slotType = ''; 
    let slotValuesFull = []; 
 
    let intents = model.interactionModel.languageModel.intents; 
    for (let i = 0; i < intents.length; i++) { 
        if (intents[i].name == intentName) { 
            let slots = intents[i].slots; 
            for (let j = 0; j < slots.length; j++) { 
                if (slots[j].name === slotName) { 
                    slotType = slots[j].type; 
 
                } 
            } 
        } 
         
    } 
    let types = model.interactionModel.languageModel.types; 
    for (let i = 0; i < types.length; i++) { 
        if (types[i].name === slotType) { 
            slotValuesFull = types[i].values; 
        } 
    } 
 
 
    examples.push(slotValuesFull[0].name.value); 
    examples.push(slotValuesFull[1].name.value); 
    if (slotValuesFull.length > 2) { 
        examples.push(slotValuesFull[2].name.value); 
    } 
 
 
    return examples; 
} 
 
function sayArray(myData, penultimateWord = 'and') { 
    let result = ''; 
 
    myData.forEach(function(element, index, arr) { 
 
        if (index === 0) { 
            result = element; 
        } else if (index === myData.length - 1) { 
            result += ` ${penultimateWord} ${element}`; 
        } else { 
            result += `, ${element}`; 
        } 
    }); 
    return result; 
} 
function supportsDisplay(handlerInput) // returns true if the skill is running on a device with a display (Echo Show, Echo Spot, etc.) 
{                                      //  Enable your skill for display as shown here: https://alexa.design/enabledisplay 
    const hasDisplay = 
        handlerInput.requestEnvelope.context && 
        handlerInput.requestEnvelope.context.System && 
        handlerInput.requestEnvelope.context.System.device && 
        handlerInput.requestEnvelope.context.System.device.supportedInterfaces && 
        handlerInput.requestEnvelope.context.System.device.supportedInterfaces.Display; 
 
    return hasDisplay; 
} 
 
 
const welcomeCardImg = { 
    smallImageUrl: "https://s3.amazonaws.com/skill-images-789/cards/card_plane720_480.png", 
    largeImageUrl: "https://s3.amazonaws.com/skill-images-789/cards/card_plane1200_800.png" 
 
 
}; 
 
const DisplayImg1 = { 
    title: 'Jet Plane', 
    url: 'https://s3.amazonaws.com/skill-images-789/display/plane340_340.png' 
}; 
const DisplayImg2 = { 
    title: 'Starry Sky', 
    url: 'https://s3.amazonaws.com/skill-images-789/display/background1024_600.png' 
 
}; 
 
function getCustomIntents() { 
    const modelIntents = model.interactionModel.languageModel.intents; 
 
    let customIntents = []; 
 
 
    for (let i = 0; i < modelIntents.length; i++) { 
 
        if(modelIntents[i].name.substring(0,7) != "AMAZON." && modelIntents[i].name !== "LaunchRequest" ) { 
            customIntents.push(modelIntents[i]); 
        } 
    } 
    return customIntents; 
} 
 
function getSampleUtterance(intent) { 
 
    return randomElement(intent.samples); 
 
} 
 
function getPreviousIntent(attrs) { 
 
    if (attrs.history && attrs.history.length > 1) { 
        return attrs.history[attrs.history.length - 2].IntentRequest; 
 
    } else { 
        return false; 
    } 
 
} 
 
function getPreviousSpeechOutput(attrs) { 
 
    if (attrs.lastSpeechOutput && attrs.history.length > 1) { 
        return attrs.lastSpeechOutput; 
 
    } else { 
        return false; 
    } 
 
} 
 
function timeDelta(t1, t2) { 
 
    const dt1 = new Date(t1); 
    const dt2 = new Date(t2); 
    const timeSpanMS = dt2.getTime() - dt1.getTime(); 
    const span = { 
        "timeSpanMIN": Math.floor(timeSpanMS / (1000 * 60 )), 
        "timeSpanHR": Math.floor(timeSpanMS / (1000 * 60 * 60)), 
        "timeSpanDAY": Math.floor(timeSpanMS / (1000 * 60 * 60 * 24)), 
        "timeSpanDesc" : "" 
    }; 
 
 
    if (span.timeSpanHR < 2) { 
        span.timeSpanDesc = span.timeSpanMIN + " minutes"; 
    } else if (span.timeSpanDAY < 2) { 
        span.timeSpanDesc = span.timeSpanHR + " hours"; 
    } else { 
        span.timeSpanDesc = span.timeSpanDAY + " days"; 
    } 
 
 
    return span; 
 
} 
 
 
const InitMemoryAttributesInterceptor = { 
    process(handlerInput) { 
        let sessionAttributes = {}; 
        if(handlerInput.requestEnvelope.session['new']) { 
 
            sessionAttributes = handlerInput.attributesManager.getSessionAttributes(); 
 
            let memoryAttributes = getMemoryAttributes(); 
 
            if(Object.keys(sessionAttributes).length === 0) { 
 
                Object.keys(memoryAttributes).forEach(function(key) {  // initialize all attributes from global list 
 
                    sessionAttributes[key] = memoryAttributes[key]; 
 
                }); 
 
            } 
            handlerInput.attributesManager.setSessionAttributes(sessionAttributes); 
 
 
        } 
    } 
}; 
 
const RequestHistoryInterceptor = { 
    process(handlerInput) { 
 
        const thisRequest = handlerInput.requestEnvelope.request; 
        let sessionAttributes = handlerInput.attributesManager.getSessionAttributes(); 
 
        let history = sessionAttributes['history'] || []; 
 
        let IntentRequest = {}; 
        if (thisRequest.type === 'IntentRequest' ) { 
 
            let slots = []; 
 
            IntentRequest = { 
                'IntentRequest' : thisRequest.intent.name 
            }; 
 
            if (thisRequest.intent.slots) { 
 
                for (let slot in thisRequest.intent.slots) { 
                    let slotObj = {}; 
                    slotObj[slot] = thisRequest.intent.slots[slot].value; 
                    slots.push(slotObj); 
                } 
 
                IntentRequest = { 
                    'IntentRequest' : thisRequest.intent.name, 
                    'slots' : slots 
                }; 
 
            } 
 
        } else { 
            IntentRequest = {'IntentRequest' : thisRequest.type}; 
        } 
        if(history.length > maxHistorySize - 1) { 
            history.shift(); 
        } 
        history.push(IntentRequest); 
 
        handlerInput.attributesManager.setSessionAttributes(sessionAttributes); 
 
    } 
 
}; 
 
 
 
 
const RequestPersistenceInterceptor = { 
    process(handlerInput) { 
 
        if(handlerInput.requestEnvelope.session['new']) { 
 
            return new Promise((resolve, reject) => { 
 
                handlerInput.attributesManager.getPersistentAttributes() 
 
                    .then((sessionAttributes) => { 
                        sessionAttributes = sessionAttributes || {}; 
 
 
                        sessionAttributes['launchCount'] += 1; 
 
                        handlerInput.attributesManager.setSessionAttributes(sessionAttributes); 
 
                        handlerInput.attributesManager.savePersistentAttributes() 
                            .then(() => { 
                                resolve(); 
                            }) 
                            .catch((err) => { 
                                reject(err); 
                            }); 
                    }); 
 
            }); 
 
        } // end session['new'] 
    } 
}; 
 
 
const ResponseRecordSpeechOutputInterceptor = { 
    process(handlerInput, responseOutput) { 
 
        let sessionAttributes = handlerInput.attributesManager.getSessionAttributes(); 
        let lastSpeechOutput = { 
            "outputSpeech":responseOutput.outputSpeech.ssml, 
            "reprompt":responseOutput.reprompt.outputSpeech.ssml 
        }; 
 
        sessionAttributes['lastSpeechOutput'] = lastSpeechOutput; 
 
        handlerInput.attributesManager.setSessionAttributes(sessionAttributes); 
 
    } 
}; 
 
const ResponsePersistenceInterceptor = { 
    process(handlerInput, responseOutput) { 
 
        const ses = (typeof responseOutput.shouldEndSession == "undefined" ? true : responseOutput.shouldEndSession); 
 
        if(ses || handlerInput.requestEnvelope.request.type == 'SessionEndedRequest') { // skill was stopped or timed out 
 
            let sessionAttributes = handlerInput.attributesManager.getSessionAttributes(); 
 
            sessionAttributes['lastUseTimestamp'] = new Date(handlerInput.requestEnvelope.request.timestamp).getTime(); 
 
            handlerInput.attributesManager.setPersistentAttributes(sessionAttributes); 
 
            return new Promise((resolve, reject) => { 
                handlerInput.attributesManager.savePersistentAttributes() 
                    .then(() => { 
                        resolve(); 
                    }) 
                    .catch((err) => { 
                        reject(err); 
                    }); 
 
            }); 
 
        } 
 
    } 
}; 
 
 
 
// 4. Exports handler function and setup ===================================================
const skillBuilder = Alexa.SkillBuilders.standard();
exports.handler = skillBuilder
    .addRequestHandlers(
        AMAZON_CancelIntent_Handler, 
        AMAZON_HelpIntent_Handler, 
        AMAZON_PauseIntent_Handler, 
        AMAZON_StartOverIntent_Handler, 
        AMAZON_StopIntent_Handler, 
        AnswerIntent_Handler, 
        QuizIntent_Handler, 
        AMAZON_NavigateHomeIntent_Handler, 
        AMAZON_FallbackIntent_Handler, 
        AMAZON_NoIntent_Handler, 
        LaunchRequest_Handler, 
        SessionEndedHandler
    )
    .addErrorHandlers(ErrorHandler)
    .addRequestInterceptors(InitMemoryAttributesInterceptor)
    .addRequestInterceptors(RequestHistoryInterceptor)

   // .addResponseInterceptors(ResponseRecordSpeechOutputInterceptor)

 // .addRequestInterceptors(RequestPersistenceInterceptor)
 // .addResponseInterceptors(ResponsePersistenceInterceptor)

 // .withTableName("askMemorySkillTable")
 // .withAutoCreateTable(true)

    .lambda();


// End of Skill code -------------------------------------------------------------
// Static Language Model for reference

const model = {
  "interactionModel": {
    "languageModel": {
      "invocationName": "mathcounts countdown",
      "modelConfiguration": {
        "fallbackIntentSensitivity": {
          "level": "MEDIUM"
        }
      },
      "intents": [
        {
          "name": "AMAZON.CancelIntent",
          "samples": []
        },
        {
          "name": "AMAZON.HelpIntent",
          "samples": []
        },
        {
          "name": "AMAZON.PauseIntent",
          "samples": []
        },
        {
          "name": "AMAZON.StartOverIntent",
          "samples": []
        },
        {
          "name": "AMAZON.StopIntent",
          "samples": []
        },
        {
          "name": "AnswerIntent",
          "slots": [
            {
              "name": "Number",
              "type": "AMAZON.NUMBER"
            },
            {
              "name": "Numerator",
              "type": "AMAZON.NUMBER"
            },
            {
              "name": "Denominator",
              "type": "AMAZON.NUMBER"
            },
            {
              "name": "DecimalA",
              "type": "AMAZON.NUMBER"
            },
            {
              "name": "DecimalB",
              "type": "AMAZON.NUMBER"
            },
            {
              "name": "Word",
              "type": "WORDS"
            },
            {
              "name": "Others",
              "type": "OTHERS"
            }
          ],
          "samples": [
            "{Others}",
            "{Numerator} {Denominator} ths",
            "{Number} {Word}",
            "{DecimalA} dollars {DecimalB} cents",
            "{DecimalA} dollars and {DecimalB} cents",
            "{DecimalA} point {DecimalB}",
            "Point {DecimalB}",
            "{Numerator} over {Denominator}",
            "{Number}"
          ]
        },
        {
          "name": "QuizIntent",
          "slots": [],
          "samples": [
            "Question",
            "Quiz",
            "Start questions",
            "Start",
            "Quiz me",
            "Start mathcounts quiz",
            "First question",
            "Next question",
            "Y",
            "Yes",
            "Give me a question",
            "start a quiz",
            "start a quiz game",
            "and start a quiz",
            "and quiz me",
            "for a quiz",
            "a quiz"
          ]
        },
        {
          "name": "AMAZON.NavigateHomeIntent",
          "samples": []
        },
        {
          "name": "AMAZON.FallbackIntent",
          "samples": []
        },
        {
          "name": "AMAZON.NoIntent",
          "samples": []
        },
        {
          "name": "LaunchRequest"
        }
      ],
      "types": [
        {
          "name": "WORDS",
          "values": [
            {
              "name": {
                "value": "member"
              }
            },
            {
              "name": {
                "value": "half"
              }
            },
            {
              "name": {
                "value": "posts"
              }
            },
            {
              "name": {
                "value": "feet squared"
              }
            },
            {
              "name": {
                "value": "costume"
              }
            },
            {
              "name": {
                "value": "inches"
              }
            },
            {
              "name": {
                "value": "inches squared"
              }
            },
            {
              "name": {
                "value": "albums"
              }
            },
            {
              "name": {
                "value": "fourteenths"
              }
            },
            {
              "name": {
                "value": "fourths"
              }
            },
            {
              "name": {
                "value": "ninths"
              }
            },
            {
              "name": {
                "value": "twenty-fourths"
              }
            },
            {
              "name": {
                "value": "thirteenths"
              }
            },
            {
              "name": {
                "value": "tenths"
              }
            },
            {
              "name": {
                "value": "thirds"
              }
            },
            {
              "name": {
                "value": "halves"
              }
            },
            {
              "name": {
                "value": "unit cubes"
              }
            },
            {
              "name": {
                "value": "degree"
              }
            },
            {
              "name": {
                "value": "meters per second"
              }
            },
            {
              "name": {
                "value": "feet cubed"
              }
            },
            {
              "name": {
                "value": "centimeters squared"
              }
            },
            {
              "name": {
                "value": "ordered pairs"
              }
            },
            {
              "name": {
                "value": "miles per hour"
              }
            },
            {
              "name": {
                "value": "units squared"
              }
            },
            {
              "name": {
                "value": "fabric squares"
              }
            },
            {
              "name": {
                "value": "u"
              }
            },
            {
              "name": {
                "value": "o"
              }
            },
            {
              "name": {
                "value": "i"
              }
            },
            {
              "name": {
                "value": "e"
              }
            },
            {
              "name": {
                "value": "a"
              }
            },
            {
              "name": {
                "value": "amount"
              }
            },
            {
              "name": {
                "value": "ordered"
              }
            },
            {
              "name": {
                "value": "cent"
              }
            },
            {
              "name": {
                "value": "seconds"
              }
            },
            {
              "name": {
                "value": "days"
              }
            },
            {
              "name": {
                "value": "minutes"
              }
            },
            {
              "name": {
                "value": "students"
              }
            },
            {
              "name": {
                "value": "ways"
              }
            },
            {
              "name": {
                "value": "ounce"
              }
            },
            {
              "name": {
                "value": "miles"
              }
            },
            {
              "name": {
                "value": "zeros"
              }
            },
            {
              "name": {
                "value": "pages"
              }
            },
            {
              "name": {
                "value": "eggs"
              }
            },
            {
              "name": {
                "value": "inch"
              }
            },
            {
              "name": {
                "value": "dollars"
              }
            },
            {
              "name": {
                "value": "centimeters"
              }
            },
            {
              "name": {
                "value": "meters"
              }
            },
            {
              "name": {
                "value": "feet"
              }
            },
            {
              "name": {
                "value": "degrees"
              }
            },
            {
              "name": {
                "value": "value"
              }
            },
            {
              "name": {
                "value": "unit"
              }
            },
            {
              "name": {
                "value": "percent"
              }
            }
          ]
        },
        {
          "name": "OTHERS",
          "values": [
            {
              "name": {
                "value": "day fourteen"
              }
            },
            {
              "name": {
                "value": "twenty four root three"
              }
            },
            {
              "name": {
                "value": "twenty four times the square root of three"
              }
            },
            {
              "name": {
                "value": "forty eight pi"
              }
            },
            {
              "name": {
                "value": "Tuesday"
              }
            }
          ]
        }
      ]
    }
  }
};
