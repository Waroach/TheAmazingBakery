
// This was my first Step before any coding...
            //listener for button
            // grab data from form
                // Check for sales
                //multiply prices
                    //Normal vs Sale prices
                // Render total
// Then I created below code....


// START DATE STUFF

let saleDate = ''                                           // Needs to be one of four 'tuesday', 'friday', 'octiober1', ''
let saleDayValue = ''
let saleMonthValue = ''
let saleDateValue = ''

// START DATE STUFF
// START Prevent BACK ORDERS
let today = new Date();
let dd = today.getDate();
let mm = today.getMonth()+1; //January is 0 so need to add 1 to make it 1!
let yyyy = today.getFullYear();
if(dd<10){
  dd='0'+dd
} 
if(mm<10){
  mm='0'+mm
} 

today = yyyy+'-'+mm+'-'+dd;
document.getElementById("date").setAttribute("min", today);
// END Prevent BACK ORDERS


//listener for button
document.getElementById('submit').addEventListener('click', submitForm)

// Global Variables


let brownieFormInput = 0 
let keyLimeCheesecakeFormInput = 0
let cookieFormInput = 0
let miniGingerbreadDonutFormInput = 0

// grab data from form
    // Check for sales
function submitForm(){
                                                                                            // Need to force a date input or default to today.
    // Prevent Reload
    window.event.preventDefault()

    // set Date
    let dateInput = document.getElementById('date').value
    dateFormInput = new Date(dateInput)
    saleDayValue = dateFormInput.getDay()
    saleMonthValue = dateFormInput.getMonth()
    saleDateValue = dateFormInput.getDate()
    // set Brownie
    brownieFormInput = Number(document.getElementById('brownie').value)
    // set key lime
    keyLimeCheesecakeFormInput = Number(document.getElementById('keyLimeCheesecake').value)
    // set Cookie
    cookieFormInput = Number(document.getElementById('cookie').value)
    // set mini Ging Donut
    miniGingerbreadDonutFormInput = Number(document.getElementById('miniGingerbreadDonut').value)

    // set saleDate
    if(saleDayValue === 1) saleDate = 'tuesday'
    if(saleDayValue === 4) saleDate = 'friday'
    if(saleMonthValue === 8 && saleDateValue === 30) saleDate = 'ocotber1'

    // getTotal()
    getTotal()
}


function getTotal(){
    let total = 0
    // if brownie > 0 then brownie() total++
    if(brownieFormInput){
        const totalFromBrownies = brownie()
        total += totalFromBrownies
    }
    // if keyLimeCheesecake > 0 then keyLimeCheesecake() total++
    if(keyLimeCheesecakeFormInput){
        const totalFromkeyLimeCheesecake = keyLimeCheesecake()
        total += totalFromkeyLimeCheesecake
    }
    // if cookie > 0 then cookie() total++
    if(cookieFormInput){
        const totaFromCookie = cookie()
        total += totaFromCookie
    }
    // if miniGingerbreadDonut > 0 then miniGingerbreadDonut() total++
    if(miniGingerbreadDonutFormInput){
        const totalFromMiniGingerbreadDonut = miniGingerbreadDonut()
        total += totalFromMiniGingerbreadDonut
    }


    // Pulled from StackOverflow
    // Create our number formatter.
    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',

    // These options are needed to round to whole numbers if that's what you want.
    minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
    });
                                                                                                                        // Nothing Displays
    document.getElementById('total').innerHTML = formatter.format(total)
}

function brownie(){
    let total = 0
    let count = brownieFormInput                          //Should be pulled in from FORM                              OPTIMIZE ME
    let bulkCount = 0
    // I would optimize this by not using the index and instead find the name                                          OPTIMIZE ME
    // probably using .find()  bakeryData.treats.find(e=> e.name = brownie)                                            OPTIMIZE ME
    const treatData = Object.entries(bakeryData.treats[0])
    const name = treatData[1][1]
    const image = treatData[2][1]
    const price = treatData[3][1]
    //Bulk info
    const bulkValues = Object.values(treatData[4][1])                                                                 //Could be OPTOMIZED
    const bulkAmount = bulkValues[0]
    const bulkPrice = bulkValues[1]

    // Create Bulk Total
    bulkCount = Math.trunc(count / bulkAmount)
    total += bulkCount * bulkPrice
    count = count % bulkAmount

    // Create total
    total += (count * price)

    // Return me
    return total
}

function keyLimeCheesecake(){
    let total = 0
    let count = keyLimeCheesecakeFormInput                          //Should be pulled in from FORM                    OPTIMIZE ME
    // I would optimize this by not using the index and instead find the name                                          OPTIMIZE ME
    // probably using .find()  bakeryData.treats.find(e=> e.name = brownie)                                            OPTIMIZE ME
    const treatData = Object.entries(bakeryData.treats[1])
    const name = treatData[1][1]
    const image = treatData[2][1]
    const price = treatData[3][1]

    // Create total
    total = total + (price * count)

    // Create Sale Total
    // Check Date if October 1
    if(saleDate === 'ocotber1'){
        total = total - (total * .25)
    }
    // Return me
    return total
}

function cookie(){
    let total = 0
    let count = cookieFormInput                          //Should be pulled in from FORM                               OPTIMIZE ME
    // I would optimize this by not using the index and instead find the name                                          OPTIMIZE ME
    // probably using .find()  bakeryData.treats.find(e=> e.name = brownie)                                            OPTIMIZE ME
    const treatData = Object.entries(bakeryData.treats[2])
    const name = treatData[1][1]
    const image = treatData[2][1]
    const price = treatData[3][1]
    const bulkPricing = treatData[4][1]

    if(saleDate === 'friday'){
        // Set price if Friday
        const saleCount = Math.trunc(count / 8)
        total += saleCount * 6
        count = count % saleCount
    }
    if(bulkPricing){   //find if bulkpricing is true\
        const bulkValues = Object.values(treatData[4][1])
        const bulkAmount = bulkValues[0]
        const bulkPrice = bulkValues[1]
        // Set Price if bulk and not friday
        const bulkCount = Math.trunc(count / bulkAmount)
        total += bulkCount * bulkPrice
        count = count % bulkAmount
    }

    // Create total
    total += (count * price)

    // Return me
    return total
}

function miniGingerbreadDonut(){
    let total = 0
    let count = miniGingerbreadDonutFormInput                          //Should be pulled in from FORM                 OPTIMIZE ME
    const saleCount = Math.trunc(count/2)
    // I would optimize this by not using the index and instead find the name                                          OPTIMIZE ME
    // probably using .find()  bakeryData.treats.find(e=> e.name = brownie)                                            OPTIMIZE ME
    const treatData = Object.entries(bakeryData.treats[3])
    const name = treatData[1][1]
    const image = treatData[2][1]
    const price = treatData[3][1]

    //find if bulkpricing is true
    if(saleDate == 'tuesday'){
        total += saleCount * price
        count = count % saleCount
    }
    // Create totaL
    total += (count* price)

    console.log('gingerbread', miniGingerbreadDonutFormInput)
    // Return me
    return total
}



