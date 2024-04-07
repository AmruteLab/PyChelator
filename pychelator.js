var chelatorNames = ['ATP', 'EGTA']
var metalNames = ['Ca2', 'Mg2']
var pH = 7.0;
var temperature = 25; //initially set to constants temperature expected
var ionicStrength = 0.1; //initially set to constants ionic strength expected
var calculation_results = []
var data = {
  "NIST": {
      "Et": 25,
      "Ei": 0.1,
      "initialHydrogenConstants1": [6.48, 9.4],
      "initialHydrogenConstants2": [3.99, 8.79],
      "initialHydrogenConstants3": [1.9, 2.7],
      "initialHydrogenConstants4": [0, 0],
      "deltaHydrogenConstants1": [0.5, -5.6],
      "deltaHydrogenConstants2": [-3.6, -5.6],
      "deltaHydrogenConstants3": [2.3, -2.6],
      "deltaHydrogenConstants4": [0, 0],
      "metalChelator": [
          [3.86, 10.86],
          [4.19, 5.28]
      ],
      "deltaMetalChelator": [
          [3.2, -7.9],
          [4.4, 5.5]
      ],
      "mhc": [
          [2.16, 5.307],
          [2.32, 3.47]
      ],
      "dmhc": [
          [1.9, 0],
          [2.3, 0]
      ],
      "VaC": [3, 3],
      "VaM": [2, 2]
  },
  "Fabiato": {
    "Et": 20,
    "Ei": 0.1,
    "initialHydrogenConstants1": [6.956, 9.46],
    "initialHydrogenConstants2": [4.101, 8.85],
    "initialHydrogenConstants3": [0, 2.68],
    "initialHydrogenConstants4": [0, 2],
    "deltaHydrogenConstants1": [-0.5, -5.84],
    "deltaHydrogenConstants2": [-4.1, -5.76],
    "deltaHydrogenConstants3": [0, 0],
    "deltaHydrogenConstants4": [0, 0],
    "metalChelator": [
        [3.993, 10.716],
        [4.292, 5.21]
    ],
    "deltaMetalChelator": [
        [-0.9, -8.38],
        [2.6, 5.18]
    ],
    "mhc": [
        [1.804, 5.33],
        [2.698, 3.37]
    ],
    "dmhc": [
        [-0.3, 0],
        [3.4, 0]
    ],
    "VaC": [3, 3],
    "VaM": [2, 2]
  },
  "Calcium": {
    "Et": 20,
    "Ei": 0.1,
    "initialHydrogenConstants1": [6.495, 9.47],
    "initialHydrogenConstants2": [4.06, 8.85],
    "initialHydrogenConstants3": [0, 2.66],
    "initialHydrogenConstants4": [0, 2],
    "deltaHydrogenConstants1": [1.2, -5.8],
    "deltaHydrogenConstants2": [0, -5.8],
    "deltaHydrogenConstants3": [0, 0],
    "deltaHydrogenConstants4": [0, 0],
    "metalChelator": [
        [3.7825, 10.97],
        [4.0038, 5.21]
    ],
    "deltaMetalChelator": [
        [-1, -8.1],
        [4.5, 5]
    ],
    "mhc": [
        [1.804,5.33],
        [2.698,3.37]
    ],
    "dmhc": [
        [0, 0],
        [0, 0]
    ],
    "VaC": [3, 3],
    "VaM": [2, 2]
  },
  "Schoenmakers": {
      "Et": 37,
      "Ei": 0.165,
      "initialHydrogenConstants1": [6.39, 9.22],
      "initialHydrogenConstants2": [3.8, 8.65],
      "initialHydrogenConstants3": [1.9, 2.58],
      "initialHydrogenConstants4": [0, 0],
      "deltaHydrogenConstants1": [-2.1, -26.5],
      "deltaHydrogenConstants2": [-17.15, -20.4],
      "deltaHydrogenConstants3": [0, -10],
      "deltaHydrogenConstants4": [0, 0],
      "metalChelator": [
          [3.69, 10.34],
          [4, 5.09]
      ],
      "deltaMetalChelator": [
          [-3.8, -33.2],
          [10.9, 21]
      ],
      "mhc": [
          [1.94, 5.1],
          [2.07, 3.13]
      ],
      "dmhc": [
          [-1.6, 0],
          [14.2, 0]
      ],
      "VaC": [3, 3],
      "VaM": [2, 2]
  }
};

var freeChelatorAmount = new Array(1);
var freeMetalAmount = new Array(1);
var bound = new Array(1);
var pbound = new Array(1);
var cbound = new Array(1);
var cpbound = new Array(1);
var totalChelatorAmount = new Array(1);
var totalMetalAmount = new Array(1);

var ionContribution;

var s = "";
result_array = [];

//intermediate calculations stored here:
var ZMC = new Array(1);
ZMC[0] = new Array(1);
ZMC[1] = new Array(1);

var D = new Array(1);

var ZSumL = new Array(1);
var ZSumL2 = new Array(1);
var Kd = new Array(1);
Kd[0] = new Array(1);
Kd[1] = new Array(1);

var concentrationOfHydrogen; //true hydrogen concentration

var cmcomplex1 = new Array(1); //chelator-metal complexes
cmcomplex1[0] = new Array(1);
cmcomplex1[1] = new Array(1);

var cmcomplex2 = new Array(1);
cmcomplex2[0] = new Array(1);
cmcomplex2[1] = new Array(1);

var IC = new Array(1);
IC[0] = new Array(4);
IC[1] = new Array(4);

var KML = new Array(1);
KML[0] = new Array(1);
KML[1] = new Array(1);
var KHML = new Array(1);
KHML[0] = new Array(1);
KHML[1] = new Array(1);
unit_used = "M";


function loadSampleConstants(){
  document.getElementById("customEt").value = data["NIST"]["Et"];
  document.getElementById("customEi").value = data["NIST"]["Ei"];
  document.getElementById("hydrogen1").value = data["NIST"]["initialHydrogenConstants1"];
  document.getElementById("hydrogen2").value = data["NIST"]["initialHydrogenConstants2"];
  document.getElementById("hydrogen3").value = data["NIST"]["initialHydrogenConstants3"];
  document.getElementById("hydrogen4").value = data["NIST"]["initialHydrogenConstants4"];
  document.getElementById("deltaH1").value = data["NIST"]["deltaHydrogenConstants1"];
  document.getElementById("deltaH2").value = data["NIST"]["deltaHydrogenConstants2"];
  document.getElementById("deltaH3").value = data["NIST"]["deltaHydrogenConstants3"];
  document.getElementById("deltaH4").value = data["NIST"]["deltaHydrogenConstants4"];
  document.getElementById("metal1").value = data["NIST"]["metalChelator"];
  document.getElementById("deltaMetal1").value = data["NIST"]["deltaMetalChelator"];
  document.getElementById("metalchelator2").value = data["NIST"]["mhc"];
  document.getElementById("deltaMetalChelator2").value = data["NIST"]["dmhc"];
  document.getElementById("namesOfMetals").value = metalNames;
  document.getElementById("namesOfChelators").value = chelatorNames;
}

function submitConstants(downloadFile=true){
  Et = parseFloat(document.getElementById("customEt").value);
  Ei = parseFloat(document.getElementById("customEi").value);
  h1_values = document.getElementById("hydrogen1").value.split(",").map(value => value.trim());
  initialHydrogenConstants1 = [
    parseFloat(h1_values[0]), parseFloat(h1_values[1]),
    parseFloat(h1_values[1]), parseFloat(h1_values[2])
  ]
  h2_values = document.getElementById("hydrogen2").value.split(",").map(value => value.trim());
  initialHydrogenConstants2 = [
    parseFloat(h2_values[0]), parseFloat(h2_values[1]),
    parseFloat(h2_values[1]), parseFloat(h2_values[2])
  ]
  h3_values = document.getElementById("hydrogen3").value.split(",").map(value => value.trim());
  initialHydrogenConstants3 = [
    parseFloat(h3_values[0]), parseFloat(h3_values[1]),
    parseFloat(h3_values[1]), parseFloat(h3_values[2])
  ]
  h4_values = document.getElementById("hydrogen4").value.split(",").map(value => value.trim());
  h4 = [
    parseFloat(h4_values[0]), parseFloat(h4_values[1]),
    parseFloat(h4_values[1]), parseFloat(h4_values[2])
  ]
  dh1_values =  document.getElementById("deltaH1").value.split(",").map(value => value.trim());
  deltaHydrogenConstants1 = [
    parseFloat(dh1_values[0]), parseFloat(dh1_values[1]),
    parseFloat(dh1_values[1]), parseFloat(dh1_values[2])
  ]
  dh2_values =  document.getElementById("deltaH2").value.split(",").map(value => value.trim());
  deltaHydrogenConstants2 = [
    parseFloat(dh2_values[0]), parseFloat(dh2_values[1]),
    parseFloat(dh2_values[1]), parseFloat(dh2_values[2])
  ]
  dh3_values =  document.getElementById("deltaH3").value.split(",").map(value => value.trim());
  deltaHydrogenConstants3 = [
    parseFloat(dh3_values[0]), parseFloat(dh3_values[1]),
    parseFloat(dh3_values[1]), parseFloat(dh3_values[2])
  ]
  dh4_values =  document.getElementById("deltaH4").value.split(",").map(value => value.trim());
  deltaHydrogenConstants4 = [
    parseFloat(dh4_values[0]), parseFloat(dh4_values[1]),
    parseFloat(dh4_values[1]), parseFloat(dh4_values[2])
  ]
  mc_values = document.getElementById("metal1").value.split(",").map(value => value.trim());
  metalChelator = [
    [parseFloat(mc_values[0]), parseFloat(mc_values[1])],
     [parseFloat(mc_values[2]), parseFloat(mc_values[3])]
  ]
  dmc_values = document.getElementById("deltaMetal1").value.split(",").map(value => value.trim());
  deltaMetalChelator = [
    [parseFloat(dmc_values[0]), parseFloat(dmc_values[1])],
      [parseFloat(dmc_values[2]), parseFloat(dmc_values[3])]
  ]

  mhc_values = document.getElementById("metalchelator2").value.split(",").map(value => value.trim());
  mhc = [
    [parseFloat(mhc_values[0]), parseFloat(mhc_values[1])],
      [parseFloat(mhc_values[2]), parseFloat(mhc_values[3])]
  ]
  dmhc_values = document.getElementById("deltaMetalChelator2").value.split(",").map(value =>
      value.trim());
  dmhc = [
    [parseFloat(dmhc_values[0]), parseFloat(dmhc_values[1])],
      [parseFloat(dmhc_values[2]), parseFloat(dmhc_values[3])]
  ]

  VaC = [3,3];
  VaM = [2,2];
  chelator_values = document.getElementById("namesOfChelators").value.split(",").map(value =>
    value.trim());
  metal_values = document.getElementById("namesOfMetals").value.split(",").map(value =>
      value.trim());
  if (chelator_values.length == 2 ){
     chelatorNames = chelator_values
  }
  if(metal_values.length == 2){
    metalNames = metal_values
  }
  if (downloadFile){
    createAndDownloadConstants()

  }
  closeModal()
}
function createAndDownloadConstants(){
  const jsonData = {
    "CUSTOM": {
      "Et": Et,
      "Ei": Ei,
      "initialHydrogenConstants1": initialHydrogenConstants1,
      "initialHydrogenConstants2": initialHydrogenConstants2,
      "initialHydrogenConstants3": initialHydrogenConstants3,
      "initialHydrogenConstants4": initialHydrogenConstants4,
      "deltaHydrogenConstants1": deltaHydrogenConstants1,
      "deltaHydrogenConstants2": deltaHydrogenConstants2,
      "deltaHydrogenConstants3": deltaHydrogenConstants3,
      "deltaHydrogenConstants4": deltaHydrogenConstants4,
      "metalChelator": metalChelator,
      "deltaMetalChelator": deltaMetalChelator,
      "mhc": mhc,
      "dmhc": dmhc,
      "VaC": VaC,
      "VaM": VaM,
      "chelatorNames": chelatorNames,
      "metalNames": metalNames
    }
  };

  // Convert the JSON object to a string
  const jsonString = JSON.stringify(jsonData, null, 2);

  // Create a Blob containing the JSON data
  const blob = new Blob([jsonString], { type: 'application/json' });

  // Create a download link
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'custom_data.json';

  // Append the link to the document and trigger the download
  document.body.appendChild(a);
  a.click();

  // Remove the link from the document
  document.body.removeChild(a);
}

function openSecondModal() {
  document.getElementById('modal2').style.display = 'block';
  document.getElementById('overlay2').style.display = 'block';
}

function closeSecondModal() {
  document.getElementById('modal2').style.display = 'none';
  document.getElementById('overlay2').style.display = 'none';
  const outputDiv = document.getElementById('output');
  outputDiv.innerHTML = '';
}

function updateConstants(openModalBool = true) {
  var selectElement = document.getElementById("constantsSource");
  var selectedOption = selectElement.value;

  // Assuming you have selectedOption defined earlier
  if (selectedOption === "Custom") {
    if (openModalBool == true){
      openModal()
    }
    else {
      submitConstants(downloadFile=false)
    }

  }
  else if (selectedOption === "Upload"){
    if(openModalBool){
      openSecondModal()
    }
  }

  else {
    // Load and parse the JSON file using jQuery
    if (selectedOption in data) {
      constants_copy = JSON.parse(JSON.stringify(data[selectedOption]));
      Et = constants_copy.Et;
      Ei = constants_copy.Ei;
      initialHydrogenConstants1 = constants_copy.initialHydrogenConstants1;
      initialHydrogenConstants2 = constants_copy.initialHydrogenConstants2;
      initialHydrogenConstants3 = constants_copy.initialHydrogenConstants3;
      initialHydrogenConstants4 = constants_copy.initialHydrogenConstants4;
      deltaHydrogenConstants1 = constants_copy.deltaHydrogenConstants1;
      deltaHydrogenConstants2 = constants_copy.deltaHydrogenConstants2;
      deltaHydrogenConstants3 = constants_copy.deltaHydrogenConstants3;
      deltaHydrogenConstants4 = constants_copy.deltaHydrogenConstants4;
      metalChelator = constants_copy.metalChelator;
      deltaMetalChelator = constants_copy.deltaMetalChelator;
      mhc = constants_copy.mhc;
      dmhc = constants_copy.dmhc;
      VaC = constants_copy.VaC;
      VaM = constants_copy.VaM;
  }
}
}

function readFile() {

  const fileInput = document.getElementById('fileInput');
  const outputDiv = document.getElementById('output');

  const file = fileInput.files[0];

  if (file) {
      const reader = new FileReader();

      reader.onload = function (e) {
        outputDiv.textContent = e.target.result;
      };
      reader.addEventListener("load", function () {console.log("LOADED NOW") }. false)

      reader.onload = function(e) {
        customData = JSON.parse(e.target.result);
        console.log(customData)

        // Assuming 'selectedOption' is a variable containing the selected option
        if (customData && customData["CUSTOM"]) {
          custom_constants_copy = JSON.parse(JSON.stringify(customData["CUSTOM"]));

          // Assign values
          Et = custom_constants_copy.Et;
          Ei = custom_constants_copy.Ei;
          initialHydrogenConstants1 = custom_constants_copy.initialHydrogenConstants1;
          initialHydrogenConstants2 = custom_constants_copy.initialHydrogenConstants2;
          initialHydrogenConstants3 = custom_constants_copy.initialHydrogenConstants3;
          initialHydrogenConstants4 = custom_constants_copy.initialHydrogenConstants4;
          deltaHydrogenConstants1 = custom_constants_copy.deltaHydrogenConstants1;
          deltaHydrogenConstants2 = custom_constants_copy.deltaHydrogenConstants2;
          deltaHydrogenConstants3 = custom_constants_copy.deltaHydrogenConstants3;
          deltaHydrogenConstants4 = custom_constants_copy.deltaHydrogenConstants4;
          metalChelator = custom_constants_copy.metalChelator;
          deltaMetalChelator = custom_constants_copy.deltaMetalChelator;
          mhc = custom_constants_copy.mhc;
          dmhc = custom_constants_copy.dmhc;
          VaC = custom_constants_copy.VaC;
          VaM = custom_constants_copy.VaM;
          chelatorNames = custom_constants_copy.chelatorNames;
          metalNames = custom_constants_copy.metalNames;
          loadNames()
        closeSecondModal()


        }
        else {
          outputDiv.textContent = 'Invalid file selected. Please ensure you choose the file downloaded during the creation of your custom constants.';
        }


      };

      file_text = reader.readAsText(file);
      showPopup()
  } else {
    outputDiv.textContent = 'Please select a file.';
  }
}

function convertToM(value, selectedUnit) {
  switch (selectedUnit) {
    case "M":
      return value; // Already in M
    case "mM":
      return value / 1000; // Convert to mM
    case "uM":
      return value / 1000000; // Convert to uM
    case "nM":
      return value / 1000000000; // Convert to nM
    default:
      return value; // Default to M
  }
}

function convertToUnit(value, selectedUnit) {
  switch (selectedUnit) {
    case "M":
      return value; // Already in M
    case "mM":
      return value * 1000; // Convert to mM
    case "uM":
      return value * 1000000; // Convert to uM
    case "nM":
      return value * 1000000000; // Convert to nM
    default:
      return value; // Default to M
  }
}

function updateUnit(fieldName) {
  // Get the selected unit
  var selectedUnit = document.getElementById('unit_' + fieldName).value;

  // Update the unit displayed next to the input field
  var unitElements = document.getElementsByClassName("unit");
  for (var i = 0; i < unitElements.length; i++) {
      unitElements[i].innerText = selectedUnit;
  }
  unit_used = selectedUnit
}

function updateHydrogenConstants(constantsArray, dhArray, index, VaCValue, Lf, Lfp, t, Et, offset) {
  if (VaCValue > offset) {
      const K = constantsArray[index] + 2 * (VaCValue - offset) * 1 * (Lf - Lfp);
      constantsArray[index] =
          K - (dhArray[index] / (Math.log(10) * 8.314e-3)) * (1 / (t + 273) - 1 / (Et + 273));
  }
}

function adjustConstantsForTemperatureAndIonicStrength() {
  /* adjusts constants for temp. and ionic strength */
  var e, A, Ap, Lf, Lfp, t, i, K;
  t = temperature;
  i = ionicStrength;
  e = 87.7251 - 0.3974762 * Et + 8.253e-4 * Et * Et;
  A = 1.8246e6 / Math.exp(1.5 * Math.log(e * (Et + 273.16)));
  Lf = A * (Math.sqrt(Ei) / (1 + Math.sqrt(Ei)) - 0.25 * Ei);
  e = 87.7251 - 0.3974762 * t + 8.253e-4 * t * t;
  Ap = 1.8246e6 / Math.exp(1.5 * Math.log(e * (t + 273.16)));
  Lfp = Ap * (Math.sqrt(i) / (1 + Math.sqrt(i)) - 0.25 * i);

  for (let x = 0; x < 2; x++) {
    // Calculate hydrogen constants based on VaC
      updateHydrogenConstants(initialHydrogenConstants1, deltaHydrogenConstants1, x, VaC[x], Lf, Lfp, t, Et, 0);
      updateHydrogenConstants(initialHydrogenConstants2, deltaHydrogenConstants2, x, VaC[x], Lf, Lfp, t, Et, 1);
      updateHydrogenConstants(initialHydrogenConstants3, deltaHydrogenConstants3, x, VaC[x], Lf, Lfp, t, Et, 2);
      updateHydrogenConstants(initialHydrogenConstants4, deltaHydrogenConstants4, x, VaC[x], Lf, Lfp, t, Et, 3);

    // Ensure hydrogen constants are non-negative
    if (initialHydrogenConstants1[x] < 0) initialHydrogenConstants1[x] = 0;
    if (initialHydrogenConstants2[x] < 0) initialHydrogenConstants2[x] = 0;
    if (initialHydrogenConstants3[x] < 0) initialHydrogenConstants3[x] = 0;
    if (initialHydrogenConstants4[x] < 0) initialHydrogenConstants4[x] = 0;

    // Calculate metal chelator constants
    for (y = 0; y < 2; y++) {
      updateMetalChelatorConstants(metalChelator, deltaMetalChelator, x, y, VaC[x], VaM[y], Lf, Lfp, t, Et, 0);
      updateMetalChelatorConstants(mhc, dmhc, x, y, VaC[x], VaM[y], Lf, Lfp, t, Et, 1);
    }
  }
}

function updateMetalChelatorConstants(constantsArray, deltaArray, xIndex, yIndex, VaCValue, VaMValue, Lf, Lfp, t, Et, offset) {
  if (VaCValue > offset) {
      let K = constantsArray[yIndex][xIndex] + 2 * (VaCValue - offset) * VaMValue * (Lf - Lfp);
      constantsArray[yIndex][xIndex] =
          K - (deltaArray[yIndex][xIndex] / (Math.log(10) * 8.314e-3)) * (1 / (t + 273) - 1 / (Et + 273));

      if (constantsArray[yIndex][xIndex] < 0) {
          constantsArray[yIndex][xIndex] = 0;
      }
  }
}

// Function to open the modal
function openModal() {
  document.getElementById('modal1').style.display = 'block';
  document.getElementById('overlay1').style.display = 'block';
}

// Function to close the modal
function closeModal() {
  document.getElementById('modal1').style.display = 'none';
  document.getElementById('overlay1').style.display = 'none';
}

function calculateHydrogenConcentration() {
  /* calculates the hydrogen ion concentration */
  var B, TH;

  B = 0.522932 * Math.exp(0.0327016 * temperature) + 4.015942;
  TH =
    0.145045 * Math.exp(-B * ionicStrength) +
    0.063546 * Math.exp(-43.97704 * ionicStrength) +
    0.695634;
  concentrationOfHydrogen = Math.exp(-pH * Math.LN10) / TH;
}

function loadNames() {
  document.getElementsByName("CH1")[0].value = chelatorNames[0];
  document.getElementsByName("CH2")[0].value = chelatorNames[1];
  document.getElementsByName("MT1")[0].value = metalNames[0];
  document.getElementsByName("MT2")[0].value = metalNames[1];
  document.getElementsByName("MF1")[0].value = metalNames[0];
  document.getElementsByName("MF2")[0].value = metalNames[1];
}

function calculateTconProduct(numTerms) {
  let product = 1;
  for (let i = 0; i < numTerms; i++) {
      product *= eval("Tcon" + (i + 1));
  }
  return product;
}

function convertExponentialToRealConstants() {
  // Function to convert constants from exponential to real
  // Variables: initialHydrogenConstants1, initialHydrogenConstants2, initialHydrogenConstants3, initialHydrogenConstants4,
  // concentrationOfHydrogen, Tcon1, Tcon2, Tcon3, Tcon4, Tcon5, Tcon6, IC, ZSumL, ZSumL2, metalChelator, mhc, ZMC, cmcomplex1, cmcomplex2
  // Description: This function converts exponential constants to real values and performs various calculations.
  // Returns: No return value (modifies global variables)  var Tcon1, Tcon2, Tcon3, Tcon4, Tcon5, Tcon6;

  for (x = 0; x < 2; x++) {
    Tcon1 = Math.exp(initialHydrogenConstants1[x] * Math.LN10);
    Tcon2 = Math.exp(initialHydrogenConstants2[x] * Math.LN10);
    Tcon3 = Math.exp(initialHydrogenConstants3[x] * Math.LN10);
    Tcon4 = Math.exp(initialHydrogenConstants4[x] * Math.LN10);

    for (let i = 0; i < 5; i++) {
      IC[x][i] = 0;
    }
  let denominator = 1;
  let concentrationPower = 1;
  for (let i = 0; i < 4; i++) {
      concentrationPower *= concentrationOfHydrogen;
      denominator += concentrationPower * calculateTconProduct(i + 1);
  }

  IC[x][0] = 1 / denominator;

  // Calculate IC[x][i] if initialHydrogenConstants up to index i are not 0
  for (let i = 1; i < 5; i++) {
      if (initialHydrogenConstants1[x] != 0 &&
          initialHydrogenConstants2[x] != 0 &&
          initialHydrogenConstants3[x] != 0 &&
          initialHydrogenConstants4[x] != 0) {
          let denominator = 1;
          for (let j = 0; j <= i; j++) {
              denominator += Math.pow(concentrationOfHydrogen, j + 1) * calculateTconProduct(j + 1);
          }
          IC[x][i] = 1 / denominator;
      }
  }

    if (Tcon1 != 0) {
      ZSumL2[x] =
        1 / (Tcon1 * concentrationOfHydrogen) +
        1 +
        Tcon2 * concentrationOfHydrogen +
        Tcon2 * Tcon3 * concentrationOfHydrogen * concentrationOfHydrogen +
        Tcon2 * Tcon3 * Tcon4 * concentrationOfHydrogen * concentrationOfHydrogen * concentrationOfHydrogen;
    } else {
      ZSumL2[x] = 0;
    }

    Tcon1 = Tcon1 * concentrationOfHydrogen;
    Tcon2 = Tcon2 * Tcon1 * concentrationOfHydrogen;
    Tcon3 = Tcon3 * Tcon2 * concentrationOfHydrogen;
    Tcon4 = Tcon4 * Tcon3 * concentrationOfHydrogen;

    ZSumL[x] = 1 + Tcon1 + Tcon2 + Tcon3 + Tcon4;

    for (y = 0; y < 2; y++) {
      Tcon5 = Math.exp(metalChelator[y][x] * Math.LN10);
      Tcon6 = Math.exp(mhc[y][x] * Math.LN10);

      Tcon6 = Tcon6 * Tcon1;
      ZMC[y][x] = Tcon5 + Tcon6;
      cmcomplex1[y][x] = Tcon6; //first part of calculating the chelator-metal complex
      cmcomplex2[y][x] = Tcon5;
    }
  }
}

function calculateChelatorConstants() {
  // Initialize arrays to 0
  for (let x = 0; x < 2; x++) {
    for (let y = 0; y < 2; y++) {
      KML[y][x] = 0;
      KHML[y][x] = 0;
      Kd[y][x] = 0;
    }
  }

  /**
   * Calculates metal chelation constants based on provided data.
   * Metal chelation constants represent the equilibrium constants for the formation of metal-chelator complexes.
   * These constants are calculated using the metal chelator values, total chelator amounts, total metal amounts,
   * and other related parameters stored in global arrays.
   * The calculated constants are stored in global arrays KML, KHML, and Kd.
 */
  for (let x = 0; x < 2; x++) {
    if (totalChelatorAmount[x] <= 0) continue;

    for (let y = 0; y < 2; y++) {
        if (totalMetalAmount[y] <= 0) continue;

        const metalChelatorValue = metalChelator[y][x];
        const mhcValue = mhc[y][x];

        if (ZSumL[x] !== 0 && metalChelatorValue !== 0) {
            KML[y][x] = Math.exp(metalChelatorValue * Math.LN10) / ZSumL[x];
        }
        if (ZSumL2[x] !== 0 && mhcValue !== 0) {
            KHML[y][x] = Math.exp(mhcValue * Math.LN10) / ZSumL2[x];
        }

        const KMLKHMLSum = KML[y][x] + KHML[y][x];
        if (KMLKHMLSum !== 0) {
            Kd[y][x] = 1 / KMLKHMLSum;
        }
    }
  }
}

function updateDisplay() {
  // Get references to the HTML elements
  const nameElement = document.getElementById('name');
  const totalElement = document.getElementById('total');
  const freeElement = document.getElementById('free');
  const pboundElement = document.getElementById('pbound');
  const boundElement = document.getElementById('bound');
  const finalpCaElement = document.getElementById('finalpCa');

  // Get the state of each checkbox
  const showName = document.getElementById('showName').checked;
  const showTotal = document.getElementById('showTotal').checked;
  const showFree = document.getElementById('showFree').checked;
  const showPBound = document.getElementById('showPBound').checked;
  const showBound = document.getElementById('showBound').checked;
  const showFinalpCa = document.getElementById('showFinalpCa').checked;
  const showIonicStrength = document.getElementById('showIonicStrength').checked;

  // Update display based on checkbox state
  nameElement.style.display = showName ? 'inline' : 'none';
  totalElement.style.display = showTotal ? 'inline' : 'none';
  freeElement.style.display = showFree ? 'inline' : 'none';
  pboundElement.style.display = showPBound ? 'inline' : 'none';
  boundElement.style.display = showBound ? 'inline' : 'none';
  finalpCaElement.style.display = showFinalpCa ? 'inline' : 'none';
}


function setup() {
  switchActiveState();
  updateConstants(openModalBool=false);
  loadNames();
  updateDisplay();
  const checkboxes = document.querySelectorAll('input[type=checkbox]');
    checkboxes.forEach(function (checkbox) {
        checkbox.addEventListener('change', updateDisplay);
    });

}

function resetFields(...fields) {
  fields.forEach((field) => (field.value = ""));
}

function disableFields(...fields) {
  fields.forEach((field) => (field.disabled = true));
}

function setDefaultValue(field, defaultValue) {
  if (field.value === "") {
    field.value = defaultValue;
  }
}

function enableFields(...fields) {
  fields.forEach((field) => (field.disabled = false));
}

function switchActiveState() {
  const freeMetals = document.getElementById("free_metals");
  const totalMetals = document.getElementById("total_metals")
  const amt1 = document.getElementById("AMT1");
  const amt2 = document.getElementById("AMT2");
  const amf1 = document.getElementById("AMF1");
  const amf2 = document.getElementById("AMF2");
  const ac1 = document.getElementById("AC1");
  const ac2 = document.getElementById("AC2");

  if (freeMetals.checked) {
    resetFields(amf1, amf2);
    disableFields(amf1, amf2);
    setDefaultValue(amt1, "0");
    setDefaultValue(amt2, "0");
    enableFields(amt1, amt2);
  }

  if (totalMetals.checked) {
    resetFields(amt1, amt2);
    disableFields(amt1, amt2);
    setDefaultValue(amf1, "0");
    setDefaultValue(amf2, "0");
    enableFields(amf1, amf2);
  }
  setDefaultValue(ac1, "0");
  setDefaultValue(ac2, "0");
  enableFields(ac1, ac2);
}

function ionicEquivalent(concentrations, charges, num_atoms) {
  var sum_of_products = concentrations.reduce(function(sum, conc, index) {
      return sum + Math.abs(conc) * Math.abs(charges[index]) * num_atoms[index];
  }, 0);

  var ionic_equivalent_value = 0.5 * sum_of_products;
  return ionic_equivalent_value;
}

function closeIonicModal(){
  document.getElementById("iePopup").style.display = "none";
}

function openIonicModal(){
  document.getElementById("iePopup").style.display = "block";
}

function calculateAndStoreIonicEquivalent() {
  var buffer_name = document.getElementById("m_buffer-name").value;
  var ions = document.getElementById("m_ions").value.split(',');
  var concentrations = document.getElementById("m_concentrations").value.split(',').map(parseFloat);
  var charges = document.getElementById("m_charges").value.split(',');
  var num_atoms = document.getElementById("m_num-atoms").value.split(',');

  var ionic_equivalent_value = ionicEquivalent(concentrations, charges, num_atoms);

  calculation_results.push({
      "Buffer Name": buffer_name,
      "Ions": ions.join(', '),
      "Ionic Equivalent (mM)": ionic_equivalent_value,
      "Concentrations (mM)": concentrations.join(', '),
      "Charges": charges.join(', '),
      "Number of Atoms": num_atoms.join(', ')
  });

  document.getElementById("m_result").innerHTML = "";
  var result_output = document.createElement("div");
  result_output.innerHTML = "<p>Buffer Name: " + buffer_name + "</p>" +
        "<p>Ions: " + ions.join(', ') + "</p>" +
        "<p>Ionic Equivalent: " + ionic_equivalent_value + " mM</p>" +
        "<button onclick='closeModalAndChangeName(\"m\")'>Send to Pychelator</button>";
  document.getElementById("m_result").appendChild(result_output);
}

function closeModalAndChangeName() {
  calculateAndStoreIonicEquivalent()
  if (calculation_results.length > 0) {
        // Get the last element of calculation_results array
        var lastElement = calculation_results[calculation_results.length - 1];

        // Check if "Ionic Equivalent (mM)" property exists in the last element
        if (lastElement.hasOwnProperty("Ionic Equivalent (mM)")) {
            // Return the value of "Ionic Equivalent (mM)" property
            document.getElementById("IO").value = lastElement["Ionic Equivalent (mM)"];
        } else {
            // If "Ionic Equivalent (mM)" property does not exist, return null or handle accordingly
            return null;
        }
    }
    closeIonicModal()
}

function collectValues() {
  var i;
  pH = parseFloat(document.getElementById("PH").value);
  temperature = parseFloat(document.getElementById("TM").value);
  ionicStrength = parseFloat(document.getElementById("IO").value);
  AC1purity = parseFloat(document.getElementById("AC1purity").value) / 100;
  AC2purity = parseFloat(document.getElementById("AC2purity").value) / 100;

  if (document.getElementById("free_metals").checked) {
    totalChelatorAmount[0] = convertToM(parseFloat(document.getElementById("AC1").value) * AC1purity, unit_used);
    totalChelatorAmount[1] = convertToM(parseFloat(document.getElementById("AC2").value)* AC2purity, unit_used);
    totalMetalAmount[0] = convertToM(parseFloat(document.getElementById("AMT1").value), unit_used);
    totalMetalAmount[1] = convertToM(parseFloat(document.getElementById("AMT2").value), unit_used);
    for (i = 0; i < 2; i++) {
      freeChelatorAmount[i] = 0;
      freeMetalAmount[i] = 0;
    }
  }

  if (document.getElementById("total_metals").checked) {
    totalChelatorAmount[0] = convertToM(parseFloat(document.getElementById("AC1").value)* AC1purity, unit_used);
    totalChelatorAmount[1] = convertToM(parseFloat(document.getElementById("AC2").value)* AC2purity, unit_used);
    freeMetalAmount[0] = convertToM(parseFloat(document.getElementById("AMF1").value), unit_used);
    freeMetalAmount[1] = convertToM(parseFloat(document.getElementById("AMF2").value), unit_used);
    for (i = 0; i < 2; i++) {
      freeChelatorAmount[i] = 0;
      totalMetalAmount[i] = 0;
    }
  }
  totalChelatorAmount = totalChelatorAmount
  freeMetalAmount = freeMetalAmount
}

function calculateFree() {
  var n, o;
  var m = new Array(1);
  var c = new Array(1);

  // initial guesses
  for (x = 0; x < 2; x++) {
    freeMetalAmount[x] = totalMetalAmount[x] / 2;
    if (totalMetalAmount[x] > 0) {
      m[x] = 0;
    } else {
      m[x] = 1;
    }
  }
  for (x = 0; x < 2; x++) {
    freeChelatorAmount[x] = totalChelatorAmount[x] / ZSumL[x];
    if (totalChelatorAmount[x] > 0) {
      c[x] = 0;
    } else {
      c[x] = 1;
    }
  }
  for (w = 0; w < 1000; w++) {
    if (m[0] == 0 || m[1] == 0 || c[0] == 0 || c[1] == 0) {
      for (x = 0; x < 2; x++) {
        if (c[x] == 0) {
          o = 0;
          for (y = 0; y < 2; y++) {
            o = o + (ZMC[y][x] * freeMetalAmount[y]) / ZSumL[x];
          }
          n = totalChelatorAmount[x] / (1 + o);
          if (
            Math.abs(n - freeChelatorAmount[x]) <
            0.0001 * freeChelatorAmount[x]
          ) {
            c[x] = 1;
          }
          freeChelatorAmount[x] = n;
        }
      }
      for (x = 0; x < 2; x++) {
        if (m[x] == 0) {
          o = 0;
          for (y = 0; y < 2; y++) {
            o = o + (ZMC[x][y] * freeChelatorAmount[y]) / ZSumL[y];
          }
          n = totalMetalAmount[x] / (1 + o);
          if (Math.abs(n - freeMetalAmount[x]) < 0.0001 * freeMetalAmount[x]) {
            m[x] = 1;
          }
          freeMetalAmount[x] = n;
        }
      }
    }
  }

  for (x = 0; x < 2; x++) {
    D[x] = ZSumL[x];
    for (y = 0; y < 2; y++) {
      D[x] = D[x] + ZMC[y][x] * freeMetalAmount[y];
    }
    if (totalChelatorAmount[x] == 0) {
      D[x] = 1;
    }
  }
}

function calculateTotal() {
  var s;

  for (x = 0; x < 2; x++) {
    D[x] = ZSumL[x];
    for (y = 0; y < 2; y++) {
      D[x] = D[x] + ZMC[y][x] * freeMetalAmount[y];
    }
    if (totalChelatorAmount[x] == 0) {
      D[x] = 1;
    }
    if (totalChelatorAmount[x] == 0) {
      freeChelatorAmount[x] = 0;
    } else {
      s = 0;
      for (y = 0; y < 2; y++) {
        s = s + (ZMC[y][x] * freeMetalAmount[y]) / ZSumL[x];
      }
      freeChelatorAmount[x] = totalChelatorAmount[x] / (1 + s);
    }
  }

  for (y = 0; y < 2; y++) {
    totalMetalAmount[y] = freeMetalAmount[y];
    for (x = 0; x < 2; x++) {
      totalMetalAmount[y] =
        totalMetalAmount[y] +
        ZMC[y][x] * freeMetalAmount[y] * (totalChelatorAmount[x] / D[x]);
    }
  }
}

function calculateIonicContribution() {
    // Initialize total ionic contribution
    var T = 0,
        M1, M2, QC, VC, VM, VD, VE, VF, VG;

    // Calculate contribution from metal-chelator complexes
    for (var x = 0; x < 2; x++) {
        for (var y = 0; y < 2; y++) {
            cmcomplex1[y][x] = (cmcomplex1[y][x] * freeMetalAmount[y] * totalChelatorAmount[x]) / D[x];
            cmcomplex2[y][x] = (cmcomplex2[y][x] * freeMetalAmount[y] * totalChelatorAmount[x]) / D[x];
        }
    }

    // Calculate contribution from free chelators
    for (var a = 0; a < 2; a++) {
        QC = freeChelatorAmount[a];
        VD = VaC[a];
        VE = 0;
        VF = 0;
        VG = 0;
        if (VD > 1) {
            VE = VD - 1;
        }
        if (VE > 1) {
            VF = VE - 1;
        }
        if (VF > 1) {
            VG = VF - 1;
        } // Free chelator ionic + counter ionic
        T += IC[a][0] * QC * 2 * VD +
             IC[a][1] * QC * 2 * VE +
             IC[a][2] * QC * 2 * VF +
             IC[a][3] * QC * 2 * VG;
    }

    // Calculate contribution from free metal ions
    for (var a = 0; a < 2; a++) {
        T += 2 * freeMetalAmount[a] * VaM[a];
    }

    for (var a = 0; a < 2; a++) {
        VC = VaC[a];
        for (var b = 0; b < 2; b++) {
            M1 = cmcomplex2[b][a];
            M2 = cmcomplex1[b][a];
            VM = VaM[b];
            VD = Math.abs(VC - VM);
            VE = Math.abs(VC - VM - 1);
            T += 2 * M1 * VD + 2 * M2 * VE;
        }
    }

    ionContribution = Math.max(T / 2, 0);
}

function cleanFloat(s) {
  let stringRepresentation = String(s);
  let result = "";

  if (stringRepresentation.includes("e")) {
      const eIndex = stringRepresentation.indexOf("e");
      if (eIndex < 5) {
          result = stringRepresentation;
      } else {
          result = stringRepresentation.substring(0, 5) + stringRepresentation.substring(eIndex);
      }
  } else {
      result = stringRepresentation.length > 9 ? stringRepresentation.substring(0, 9) : stringRepresentation;
  }

  result = result.padEnd(9, " ");
  return result;
}


// Helper method to calculate and display results for free metals
function calculateAndDisplayFreeMetals(checkboxes, metal_names_string) {
  if (document.getElementById("free_metals").checked) {
    calculateFree();
    document.getElementById("AMF1").value = cleanFloat(freeMetalAmount[0]);
    document.getElementById("AMF2").value = cleanFloat(freeMetalAmount[1]);
    for (i = 0; i < 2; i++) {
      if (totalMetalAmount[i] > 0) {
        bound[i] = totalMetalAmount[i] - freeMetalAmount[i];
        pbound[i] = (bound[i] / totalMetalAmount[i]) * 100;
        free_amount = cleanFloat(freeMetalAmount[i])
        const metalObject = {};
        if (checkboxes.showName) {
            metalObject.name = metalNames[i];
        }

        if (checkboxes.showTotal) {
            metalObject.totalamount = cleanFloat(totalMetalAmount[i]);
        }

        if (checkboxes.showFree) {
            metalObject.freeamount = free_amount;
        }

        if (checkboxes.showBound) {
            metalObject.bound = cleanFloat(bound[i])
        }

        if (checkboxes.showPBound) {
            metalObject.pbound = cleanFloat(pbound[i])
        }

        if (checkboxes.showFinalpCa) {
            metalObject.finalpCa = -Math.log10(free_amount);
        }

        if (Object.keys(metalObject).length > 0) {
            metal_names_string.push(metalObject);
        }
      }
    }
  }
}

// Helper method to calculate and display results for total metals
function calculateAndDisplayTotalMetals(checkboxes, metal_names_string) {
  if (document.getElementById("total_metals").checked) {
    calculateTotal();
    document.getElementById("AMT1").value = cleanFloat(totalMetalAmount[0]);
    document.getElementById("AMT2").value = cleanFloat(totalMetalAmount[1]);
    for (i = 0; i < 2; i++) {
      if (freeMetalAmount[i] > 0) {
        bound[i] = totalMetalAmount[i] - freeMetalAmount[i];
        pbound[i] = (bound[i] / totalMetalAmount[i]) * 100;
        free_amount = cleanFloat(freeMetalAmount[i])
        const metalObject = {};

        if (checkboxes.showName) {
            metalObject.name = metalNames[i];
        }

        if (checkboxes.showTotal) {
            metalObject.totalamount = cleanFloat(totalMetalAmount[i])
        }

        if (checkboxes.showFree) {
            metalObject.freeamount = free_amount;
        }

        if (checkboxes.showBound) {
            metalObject.bound = cleanFloat(bound[i]);
        }

        if (checkboxes.showPBound) {
            metalObject.pbound = cleanFloat(pbound[i]);
        }

        if (checkboxes.showFinalpCa) {
            metalObject.finalpCa = -Math.log10(free_amount);
        }

        if (Object.keys(metalObject).length > 0) {
            metal_names_string.push(metalObject);
        }
      }
    }
  }
}

function docalc() {
  var t = []; //putting together the final output
  var metal_names_string = [];

  // Update constants
  updateConstants(openModalBool=false);

  // Collect initial values
  collectValues();

  // Adjust constants for temperature and ionic strength
  adjustConstantsForTemperatureAndIonicStrength();

  // Calculate hydrogen concentration
  calculateHydrogenConcentration();

  // Convert exponential constants to real constants
  convertExponentialToRealConstants();

  // Prepare metal names string
  prepareMetalNamesString(metal_names_string);

  // Check checkboxes for different displays
  const checkboxes = getCheckboxValues();

  // Calculate and display results for free metals
  calculateAndDisplayFreeMetals(checkboxes, metal_names_string);

  // Calculate and display results for total metals
  calculateAndDisplayTotalMetals(checkboxes, metal_names_string);

  // Calculate ionic contribution
  calculateIonicContribution();

  // Calculate chelator objects
  calculateChelatorObjectsFromConstants(t, checkboxes);

  // Calculate chelator constants
  calculateChelatorConstants();

  // Prepare total chelator amount component
  prepareTotalChelatorAmountComponent(checkboxes);

  // Generate result array
  generateResultArray(t, metal_names_string);

  // Display output
  displayOutput(checkboxes);
}

// Helper method to calculate chelator objects
function calculateChelatorObjectsFromConstants(t, checkboxes) {
  for (let i = 0; i < 2; i++) {
    if (totalChelatorAmount[i] > 0) {
      cbound[i] = totalChelatorAmount[i] - freeChelatorAmount[i];
      cpbound[i] = (cbound[i] / totalChelatorAmount[i]) * 100;
      free_amount = cleanFloat(freeChelatorAmount[i])
      const chelatorObject = {};

      if (checkboxes.showName) {
          chelatorObject.name = chelatorNames[i];
      }

      if (checkboxes.showTotal) {
        chelatorObject.totalamount = cleanFloat(totalChelatorAmount[i])
      }

      if (checkboxes.showFree) {
          chelatorObject.freeamount = free_amount;
      }

      if (checkboxes.showBound) {
          chelatorObject.bound = cleanFloat(cbound[i])
      }

      if (checkboxes.showPBound) {
          chelatorObject.pbound = cleanFloat(cpbound[i]);
      }
      if (checkboxes.showFinalpCa) {
        chelatorObject.finalpCa = -Math.log10(free_amount);
      }

      if (Object.keys(chelatorObject).length > 0) {
          t.push(chelatorObject);
      }
    }
  }
}

// Helper method to prepare total chelator amount component
function prepareTotalChelatorAmountComponent(checkboxes) {
  totalChelatorAmount_component = [];
  totalChelatorAmount_component.push({
    name: "Complex",
    Kd: "Kd",
    "Low Limit": "Low Limit",
    "High Limit": "High Limit",
  });
  S10 = Math.sqrt(10);
  for (x = 0; x < 2; x++) {
    if (totalChelatorAmount[x] > 0) {
      for (y = 0; y < 2; y++) {
        if (totalMetalAmount[y] > 0 && (checkboxes.showKd || checkboxes.showHighLimit || checkboxes.showLowLimit)) {
          const chelatorAmountComponent = {};
          chelatorAmountComponent.name = metalNames[y] + "-" + chelatorNames[x];

          if (checkboxes.showKd) {
              chelatorAmountComponent.Kd = cleanFloat(Kd[y][x]);
          }

          if (checkboxes.showLowLimit) {
              chelatorAmountComponent["Low Limit"] = cleanFloat(Kd[y][x] / S10);
          }

          if (checkboxes.showHighLimit) {
              chelatorAmountComponent["High Limit"] = cleanFloat(Kd[y][x] * S10);
          }

          if (Object.keys(chelatorAmountComponent).length > 0) {
              totalChelatorAmount_component.push(chelatorAmountComponent);
          }

        }
      }
    }
  }
}

// Helper method to prepare metal names string
function prepareMetalNamesString(metal_names_string) {
  metal_names_string.push({
    name: "Name",
    totalamount: "Total",
    freeamount: "Free",
    bound: "Bound",
    pbound: "%Bound",
    finalpCa: "-log10[free]",
  });
}

// Helper method to get checkbox values
function getCheckboxValues() {
  return {
    showName: document.getElementById('showName').checked,
    showTotal: document.getElementById('showTotal').checked,
    showFree: document.getElementById('showFree').checked,
    showPBound: document.getElementById('showPBound').checked,
    showBound: document.getElementById('showBound').checked,
    showFinalpCa: document.getElementById('showFinalpCa').checked,
    showKd: document.getElementById('showKd').checked,
    showLowLimit: document.getElementById('showLowLimit').checked,
    showHighLimit: document.getElementById('showHighLimit').checked,
    showIonicStrength: document.getElementById('showIonicStrength').checked,
    includeMetal1: document.getElementById('includeMetal1').checked,
    includeMetal2: document.getElementById("includeMetal2").checked,
    includeLigand1: document.getElementById("includeLigand1").checked,
    includeLigand2: document.getElementById("includeLigand2").checked
  };
}

// Helper method to generate result array
function generateResultArray(t, metal_names_string) {
  result_array.push({
    general_info: {
      pH: pH,
      temperature: temperature,
      ionicStrength: ionicStrength,
      "Ionic contribution [ABS]": cleanFloat(ionContribution),
    },
    metal_and_chelator: metal_names_string.concat(t),
    totalChelatorAmount_component: totalChelatorAmount_component,
  });
}

// Helper method to display output
function displayOutput(checkboxes) {
  var outputDiv = document.getElementById("output-content");
  outputDiv.replaceChildren();

  for (var i = 0; i < result_array.length; i++) {
    var result = result_array[i];
    var section = document.createElement("div");

    var divElement = document.createElement("div");
    divElement.className = "output-section";


    for (var key in result) {
      var valueElement = document.createElement("div");

      if (key === "metal_and_chelator") {
          var components = result[key];

          for (var j = 1; j < components.length; j++) {
            if ((j === 1 && checkboxes.includeMetal1) || (j === 2 && checkboxes.includeMetal2) || (j === 3 && checkboxes.includeLigand1) || (j === 4 && checkboxes.includeLigand2)) {
              var componentValueElement = createOutputRow(components[j]);
              valueElement.appendChild(componentValueElement);
            }
          }
      } else if (key === "totalChelatorAmount_component" && (checkboxes.showKd || checkboxes.showHighLimit || checkboxes.showLowLimit)) {
          var components = result[key];
          for (var j = 0; j < components.length; j++) {
            if ((j === 1 && checkboxes.includeMetal1) || (j === 2 && checkboxes.includeMetal2) || (j === 3 && checkboxes.includeLigand1) || (j === 4 && checkboxes.includeLigand2)) {
              var componentValueElement = createOutputRow(components[j]);
              valueElement.appendChild(componentValueElement);
            }
          }
      }

      divElement.appendChild(section);
      divElement.appendChild(valueElement);
  }

    outputDiv.appendChild(divElement);
  }
}


function createOutputRow(component) {
  var componentValueElement = document.createElement("div");
  componentValueElement.className = "output-rows";
  for (const key in component) {
      var componentValueNode = document.createElement("span");
      componentValueNode.textContent = component[key];
      componentValueElement.appendChild(componentValueNode);
  }
  return componentValueElement;
}

function showPopup() {
  var popupContainer = document.getElementById("popup-container");
  popupContainer.style.display = "flex";

  setTimeout(function() {
    closePopup();
  }, 3000); // Close the popup after 3 seconds
}

// Function to close the popup
function closePopup() {
  var popupContainer = document.getElementById("popup-container");
  popupContainer.style.display = "none";
}

function downloadIeResults() {
  // Create a new workbook
  var wb = XLSX.utils.book_new();

  // Convert calculation_results to worksheet
  var ws = XLSX.utils.json_to_sheet(calculation_results);

  // Add the worksheet to the workbook
  XLSX.utils.book_append_sheet(wb, ws, "Results");

  // Generate the filename with current timestamp
  var filename = "ionic_equivalent_results_" + new Date().toISOString().slice(0,19).replace(/:/g, "-") + ".xlsx";

  // Save the workbook to a file
  XLSX.writeFile(wb, filename);
}


function downloadOutput() {
  var workbook = XLSX.utils.book_new();
  var worksheet_data = [[]];
  showName = document.getElementById('showName').checked
  showTotal = document.getElementById('showTotal').checked
  showFree = document.getElementById('showFree').checked
  showBound = document.getElementById('showBound').checked
  showPBound = document.getElementById('showPBound').checked
  showFinalpCa = document.getElementById('showFinalpCa').checked;
  showKd = document.getElementById('showKd').checked
  showLowLimit = document.getElementById('showLowLimit').checked
  showHighLimit = document.getElementById('showHighLimit').checked
  showIonicStrength = document.getElementById('showIonicStrength').checked;


  for (var j = 0; j < result_array.length; j++) {
    worksheet_data.push(
      [],
      ["pH", "temperature",  "Ionic contribution [ABS]"].concat(showIonicStrength ? ["Ionic strength"] : []),
    );

    var data = result_array[j]["general_info"];
    worksheet_data.push([
      data["pH"],
      data["temperature"],
      data["Ionic contribution [ABS]"],
    ], [],
    );
    if (showIonicStrength) {
      worksheet_data[worksheet_data.length - 2].push(data["ionicStrength"]);
    }

    for (var i = 0; i < result_array[j]["metal_and_chelator"].length; i++) {
      var metal_data = result_array[j]["metal_and_chelator"][i];
      const row = [];

      if (showName) {
          row.push(metal_data.name);
      }

      if (showTotal) {
          row.push(cleanFloat(metal_data.totalamount));
      }

      if (showFree) {
          row.push(cleanFloat(metal_data.freeamount));
      }

      if (showBound) {
          row.push(cleanFloat(metal_data.bound));
      }

      if (showPBound) {
          row.push(cleanFloat(metal_data.pbound));
      }
      if (showFinalpCa){
        if (i == 0){
         row.push(metal_data.finalpCa);

        }
        else {
          row.push(cleanFloat(metal_data.finalpCa));

        }
      }


      if (row.length > 0) {
          worksheet_data.push(row);
      }
    }

    worksheet_data.push([]);
    if (showKd || showLowLimit || showHighLimit){
      for (
        var i = 0;
        i < result_array[j]["totalChelatorAmount_component"].length;
        i++
      ) {
        var component_data = result_array[j]["totalChelatorAmount_component"][i];
        const row = [];
        row.push(component_data.name);
        if (showKd) {
            row.push(cleanFloat(component_data.Kd));
        }
        if (showLowLimit) {
            row.push(cleanFloat(component_data["Low Limit"]));
        }
        if (showHighLimit) {
            if (i == 0){
              row.push(component_data["High Limit"]);
            }
            else {
              row.push(cleanFloat(component_data["High Limit"]));
            }

        }
        if (row.length > 0) {
            worksheet_data.push(row);
        }
      }

    }

  }

  var worksheet = XLSX.utils.aoa_to_sheet(worksheet_data);
  /* Adjust column widths */
  var columnWidths = [
    { wch: 30 }, // Column 1 width
    { wch: 30 }, // Column 2 width
    { wch: 30 }, // Column 3 width
    { wch: 30 }, // Column 4 width
    { wch: 30 }, // Column 5 width
  ];
  worksheet["!cols"] = columnWidths;
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  /* Generate Excel file */
  var excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  var today = new Date();
  var formattedDate = today.toISOString().slice(0, 10);
  var fileName = "records_" + formattedDate + ".xlsx"; // Include date in file name

  saveAsExcelFile(excelBuffer, fileName);
}

/* Function to save the Excel file */
function saveAsExcelFile(buffer, fileName) {
  var blob = new Blob([buffer], { type: "application/octet-stream" });
  var url = URL.createObjectURL(blob);

  var link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  link.click();
}
