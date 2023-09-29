var mcd = new Array(
  "%THE NEW FORMAT FOR THE FILES OF CONSTANTS IN MAXCHELATOR",
  "%Chelator lines start with ! and name must be 7 characters and/or spaces.",
  "%Values are separated with a comma.",
  "%!C-NAME, H1, H2, H3, H4, dH1, dH2, dH3, dH4",
  "%Metals start with a # are 2 characters followed by valence.",
  "%#Mt2, ML, MHL, dML, dMHL, comments",
  "%The same metals in the same order are required for each chelator",
  "!ATP    ,  6.390,  3.800,  1.900,  0.000, -2.100,-17.150,  0.000,  0.000,",
  "#Ca2,  3.690,  1.940, -3.800,  -1.600, TS",
  "#Mg2,  4.000,  2.070, 10.900, 14.200, TS",
  "!EGTA   ,  9.220,  8.650,  2.580,  0.000,-26.500,-20.400,-10.000,  0.000,",
  "#Ca2, 10.340,  5.100,-33.200,  0.000, TS",
  "#Mg2,  5.090,  3.130, 21.000,  0.000, TS"
);

var mcd_nist = new Array(
  "%THE NEW FORMAT FOR THE FILES OF CONSTANTS IN MAXCHELATOR",
  "%Chelator lines start with ! and name must be 7 characters and/or spaces.",
  "%Values are separated with a comma.",
  "%!C-NAME, H1, H2, H3, H4, dH1, dH2, dH3, dH4",
  "%Metals start with a # are 2 characters followed by valence.",
  "%#Mt2, ML, MHL, dML, dMHL, comments",
  "%The same metals in the same order are required for each chelator",
  "!ATP    ,  6.480,  3.990,  1.900,  0.000,  0.500, -3.600,  2.300,  0.000,",
  "#Ca2,  3.860,  2.160,  3.200,  1.900, NIST",
  "#Mg2,  4.190,  2.320,  4.400,  2.300, NIST",
  "!EGTA   ,  9.400,  8.790,  2.700,  0.000, -5.600, -5.600, -2.600,  0.000,",
  "#Ca2, 10.860,  5.307, -7.900,  0.000, NIST",
  "#Mg2,  5.280,  3.470,  5.500,  0.000, NIST");
//spacing is critical in above array. make sure commas and such all line up if you change values.
//deltaH are in kJ

var VaC = new Array(3, 3); //#of non zero hydrogen constants
var VaM = new Array(2, 2); //3rd character of metal name
var chelatornames = new Array(1); //gets from above array. also change in HTML code below
var metalnames = new Array(1); //gets from above array also change in HTML code below
var conavailable = new Array(1);
var freechelatoramount = new Array(1);
var freemetalamount = new Array(1);
var bound = new Array(1);
var pbound = new Array(1);
var cbound = new Array(1);
var cpbound = new Array(1);
var totalchelatoramount = new Array(1);
var totalmetalamount = new Array(1);
var pH = 7.0;
var temperature = 37; //initially set to constants temperature expected
var ionic = 0.165; //initially set to constants ionic strength expected
var Et = 37; //temperature constants were done at
var Ei = 0.165; //ionic strength constants were done at
var ioncont;
var h1 = new Array(1); //first hydrogen constant for the chelators
var h2 = new Array(1);
var h3 = new Array(1);
var h4 = new Array(1);
var dh1 = new Array(1); //delta H constant for H1
var dh2 = new Array(1);
var dh3 = new Array(1);
var dh4 = new Array(1);
var mc = new Array(1); //first metal-chelator constant
mc[0] = new Array(1);
mc[1] = new Array(1);
var dmc = new Array(1); //first delta metal-chelator constant
dmc[0] = new Array(1);
dmc[1] = new Array(1);
var mhc = new Array(1); //second metal-chelator constant
mhc[0] = new Array(1);
mhc[1] = new Array(1);
var dmhc = new Array(1); //second delta metal-chelator constant
var s = "";
dmhc[0] = new Array(1);
dmhc[1] = new Array(1);
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

var Hconc; //true hydrogen concentration

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
  var selectedUnit = document.forms["WMXC2"]["unit_" + fieldName].value;

  // Update the unit displayed next to the input field
  var unitElements = document.getElementsByClassName("unit");
  for (var i = 0; i < unitElements.length; i++) {
      unitElements[i].innerText = selectedUnit;
  }
  unit_used = selectedUnit
}


function conadjust() {
  /* adjusts constants for temp. and ionic strength */
  var e, A, Ap, Lf, Lfp, t, i, K;
  t = temperature;
  i = ionic;
  e = 87.7251 - 0.3974762 * Et + 8.253e-4 * Et * Et;
  A = 1.8246e6 / Math.exp(1.5 * Math.log(e * (Et + 273.16)));
  Lf = A * (Math.sqrt(Ei) / (1 + Math.sqrt(Ei)) - 0.25 * Ei);
  e = 87.7251 - 0.3974762 * t + 8.253e-4 * t * t;
  Ap = 1.8246e6 / Math.exp(1.5 * Math.log(e * (t + 273.16)));
  Lfp = Ap * (Math.sqrt(i) / (1 + Math.sqrt(i)) - 0.25 * i);

  for (x = 0; x < 2; x++) {
    //first the hydrogen constants...
    if (VaC[x] > 0) {
      K = h1[x] + 2 * VaC[x] * 1 * (Lf - Lfp);
      h1[x] =
        K -
        (dh1[x] / (Math.log(10) * 8.314e-3)) * (1 / (t + 273) - 1 / (Et + 273));
    }
    if (VaC[x] > 1) {
      K = h2[x] + 2 * (VaC[x] - 1) * 1 * (Lf - Lfp);
      h2[x] =
        K -
        (dh2[x] / (Math.log(10) * 8.314e-3)) * (1 / (t + 273) - 1 / (Et + 273));
    }
    if (VaC[x] > 2) {
      K = h3[x] + 2 * (VaC[x] - 2) * 1 * (Lf - Lfp);
      h3[x] =
        K -
        (dh3[x] / (Math.log(10) * 8.314e-3)) * (1 / (t + 273) - 1 / (Et + 273));
    }
    if (VaC[x] > 3) {
      K = h4[x] + 2 * (VaC[x] - 3) * 1 * (Lf - Lfp);
      h4[x] =
        K -
        (dh4[x] / (Math.log(10) * 8.314e-3)) * (1 / (t + 273) - 1 / (Et + 273));
    }

    if (h1[x] < 0) {
      h1[x] = 0;
    }
    if (h2[x] < 0) {
      h2[x] = 0;
    }
    if (h3[x] < 0) {
      h3[x] = 0;
    }
    if (h4[x] < 0) {
      h4[x] = 0;
    }
    //now the metal chelator constants...
    for (y = 0; y < 2; y++) {
      if (VaC[x] > 0) {
        K = mc[y][x] + 2 * VaC[x] * VaM[y] * (Lf - Lfp);
        mc[y][x] =
          K -
          (dmc[y][x] / (Math.log(10) * 8.314e-3)) *
            (1 / (t + 273) - 1 / (Et + 273));
      }
      if (mc[y][x] < 0) {
        mc[y][x] = 0;
      }

      if (VaC[x] > 1) {
        K = mhc[y][x] + 2 * (VaC[x] - 1) * VaM[y] * (Lf - Lfp);
        mhc[y][x] =
          K -
          (dmhc[y][x] / (Math.log(10) * 8.314e-3)) *
            (1 / (t + 273) - 1 / (Et + 273));
      }
      if (mhc[y][x] < 0) {
        mhc[y][x] = 0;
      }
    }
  }
}

function calcH() {
  /* calculates the hydrogen ion concentration */
  var B, TH;

  B = 0.522932 * Math.exp(0.0327016 * temperature) + 4.015942;
  TH =
    0.145045 * Math.exp(-B * ionic) +
    0.063546 * Math.exp(-43.97704 * ionic) +
    0.695634;
  Hconc = Math.exp(-pH * Math.LN10) / TH;
}

function getvalences() {
  for (i = 0; i < 2; i++) {
    VaM[i] = parseInt(metalnames[i].substring(2, 3));
  }

  for (i = 0; i < 2; i++) {
    VaC[i] = 0;
  }

  for (i = 0; i < 2; i++) {
    if (h1[i] != 0) {
      VaC[i] = 1;
    }
    if (h2[i] != 0) {
      VaC[i] = 2;
    }
    if (h3[i] != 0) {
      VaC[i] = 3;
    }
    if (h4[i] != 0) {
      VaC[i] = 4;
    }
  }
}

function getcnames() {
  var num;
  var comma = mcd[7].indexOf(",");

  chelatornames[0] = mcd[7].substring(1, comma);
  var i = 0;
  for (i = 1; i < 2; i++) {
    num = i * 3 + 7;
    comma = mcd[num].indexOf(",");
    chelatornames[i] = mcd[num].substring(1, comma);
  }
}

function getmnames() {
  var num;
  for (i = 0; i < 2; i++) {
    num = i + 8;
    metalnames[i] = mcd[num].substring(1, 4);
  }
}

function getconavail() {
  var q, r, s, t, u, v;
  var i, j, numi, numj, x, y;
  for (i = 0; i < 2; i++) {
    numi = i * 3 + 8;
    t = "";
    for (j = 0; j < 2; j++) {
      numj = numi + j;
      v = mcd[numj].substring(7, 12);
      x = parseFloat(v);
      r = mcd[numj].substring(21, 30);
      y = parseFloat(r);
      if (x == 0) {
        u = "  ";
      } else {
        if (y == 0) {
          u = "A ";
        } else {
          u = "T ";
        }
      }
      s = t;
      t = s + u;
    }
    conavailable[i] = t.substring(0, t.length - 1) + "|";
  }
}

function loadthearray() {
  var s, t, v;
  var i, num;
  t = "        |";
  for (i = 0; i < 2; i++) {
    s = t;
    v = metalnames[i].substring(0, 1) + "|";
    t = s + v;
  }
  s = t + "\n";
  t = s + "        |";
  for (i = 0; i < 2; i++) {
    s = t;
    v = metalnames[i].substring(1, 2) + "|";
    t = s + v;
  }
  s = t + "\n";
  t = s + "________|";
  for (i = 0; i < 2; i++) {
    s = t;
    v = metalnames[i].substring(2, 3) + "|";
    t = s + v;
  }
  for (i = 0; i < 2; i++) {
    s = t + "\n";
    v = chelatornames[i];
    t = s + v + " |" + conavailable[i];
  }
  s = t;
  t = s + "\n" + "-------------";
  document.WMXC2.thearray.value = t;
  document.WMXC2.CH1.value = chelatornames[0];
  document.WMXC2.CH2.value = chelatornames[1];
  document.WMXC2.MT1.value = metalnames[0];
  document.WMXC2.MT2.value = metalnames[1];
  document.WMXC2.MF1.value = metalnames[0];
  document.WMXC2.MF2.value = metalnames[1];
}

function getconstants() {
  var i, j, num, numj;
  var s;

  //hyrdogen constants for the chelators
  for (i = 0; i < 2; i++) {
    num = i * 3 + 7;
    s = mcd[num].substring(9, 16);
    h1[i] = parseFloat(s);
    s = mcd[num].substring(17, 24);
    h2[i] = parseFloat(s);
    s = mcd[num].substring(25, 32);
    h3[i] = parseFloat(s);
    s = mcd[num].substring(33, 40);
    h4[i] = parseFloat(s);

    //delta-hydrogen constants for the chelators

    s = mcd[num].substring(41, 48);
    dh1[i] = parseFloat(s);
    s = mcd[num].substring(49, 56);
    dh2[i] = parseFloat(s);
    s = mcd[num].substring(57, 64);
    dh3[i] = parseFloat(s);
    s = mcd[num].substring(65, 72);
    dh4[i] = parseFloat(s);
  }

  for (i = 0; i < 2; i++) {
    num = i * 3 + 8;
    for (j = 0; j < 2; j++) {
      numj = num + j;
      s = mcd[numj].substring(5, 12);
      mc[j][i] = parseFloat(s); //metal#, chelator#
      s = mcd[numj].substring(13, 20);
      mhc[j][i] = parseFloat(s);
      s = mcd[numj].substring(21, 28);
      dmc[j][i] = parseFloat(s);
      s = mcd[numj].substring(29, 36);
      dmhc[j][i] = parseFloat(s);
    }
  }
}

function makekon() {
  /* converts constants from exponential to real */
  var Tcon1, Tcon2, Tcon3, Tcon4, Tcon5, Tcon6;

  for (x = 0; x < 2; x++) {
    Tcon1 = Math.exp(h1[x] * Math.LN10);
    Tcon2 = Math.exp(h2[x] * Math.LN10);
    Tcon3 = Math.exp(h3[x] * Math.LN10);
    Tcon4 = Math.exp(h4[x] * Math.LN10);

    IC[x][0] = 0;
    IC[x][1] = 0;
    IC[x][2] = 0;
    IC[x][3] = 0;
    IC[x][4] = 0;

    IC[x][0] =
      1 /
      (1 +
        Hconc * Tcon1 +
        Hconc * Hconc * Tcon1 * Tcon2 +
        Hconc * Hconc * Hconc * Tcon1 * Tcon2 * Tcon3 +
        Hconc * Hconc * Hconc * Hconc * Tcon1 * Tcon2 * Tcon3 * Tcon4);

    if (h1[x] != 0) {
      IC[x][1] =
        1 /
        (1 / (Hconc * Tcon1) +
          1 +
          Hconc * Tcon2 +
          Hconc * Hconc * Tcon2 * Tcon3 +
          Hconc * Hconc * Hconc * Tcon2 * Tcon3 * Tcon4);
    }

    if (h1[x] != 0 && h2[x] != 0) {
      IC[x][2] =
        1 /
        (1 / (Hconc * Hconc * Tcon1 * Tcon2) +
          1 / (Hconc * Tcon2) +
          1 +
          Hconc * Tcon3 +
          Hconc * Hconc * Tcon3 * Tcon4);
    }

    if (h1[x] != 0 && h2[x] != 0 && h3[x] != 0) {
      IC[x][3] =
        1 /
        (1 / (Hconc * Hconc * Hconc * Tcon1 * Tcon2 * Tcon3) +
          1 / (Hconc * Hconc * Tcon2 * Tcon3) +
          1 / (Hconc * Tcon3) +
          1 +
          Hconc * Tcon4);
    }

    if (h1[x] != 0 && h2[x] != 0 && h3[x] != 0 && h4[x] != 0) {
      IC[x][4] =
        1 /
        (1 / (Hconc * Hconc * Hconc * Hconc * Tcon1 * Tcon2 * Tcon3 * Tcon4) +
          1 / (Hconc * Hconc * Hconc * Tcon2 * Tcon3 * Tcon4) +
          1 / (Hconc * Hconc * Tcon3 * Tcon4) +
          1 / (Hconc * Tcon4) +
          1);
    }

    if (Tcon1 != 0) {
      ZSumL2[x] =
        1 / (Tcon1 * Hconc) +
        1 +
        Tcon2 * Hconc +
        Tcon2 * Tcon3 * Hconc * Hconc +
        Tcon2 * Tcon3 * Tcon4 * Hconc * Hconc * Hconc;
    } else {
      ZSumL2[x] = 0;
    }

    Tcon1 = Tcon1 * Hconc;
    Tcon2 = Tcon2 * Tcon1 * Hconc;
    Tcon3 = Tcon3 * Tcon2 * Hconc;
    Tcon4 = Tcon4 * Tcon3 * Hconc;

    ZSumL[x] = 1 + Tcon1 + Tcon2 + Tcon3 + Tcon4;

    for (y = 0; y < 2; y++) {
      Tcon5 = Math.exp(mc[y][x] * Math.LN10);
      Tcon6 = Math.exp(mhc[y][x] * Math.LN10);

      Tcon6 = Tcon6 * Tcon1;
      ZMC[y][x] = Tcon5 + Tcon6;
      cmcomplex1[y][x] = Tcon6; //first part of calculating the chelator-metal complex
      cmcomplex2[y][x] = Tcon5;
    }
  }
}

function makekd() {
  for (x = 0; x < 2; x++) {
    for (y = 0; y < 2; y++) {
      KML[y][x] = 0;
      KHML[y][x] = 0;
      Kd[y][x] = 0;
    }
  }

  for (x = 0; x < 2; x++) {
    if (totalchelatoramount[x] > 0) {
      for (y = 0; y < 9; y++) {
        if (totalmetalamount[y] > 0) {
          if (ZSumL[x] != 0 && mc[y][x] != 0) {
            KML[y][x] = Math.exp(mc[y][x] * Math.LN10) / ZSumL[x];
          }
          if (ZSumL2[x] != 0 && mhc[y][x] != 0) {
            KHML[y][x] = Math.exp(mhc[y][x] * Math.LN10) / ZSumL2[x];
          }
          if (KML[y][x] + KHML[y][x] != 0) {
            Kd[y][x] = 1 / (KML[y][x] + KHML[y][x]);
          }
        }
      }
    }
  }
}

function updateDatabase(){
  mcd = mcd_schoenmakers
}

function setup() {
  getcnames();
  getmnames();
  getconavail();
  loadthearray();
  tftoggle();
  getconstants();
  getvalences();
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

function tftoggle() {
  const typeCalc = document.WMXC2.TYPECALC;
  const amt1 = document.WMXC2.AMT1;
  const amt2 = document.WMXC2.AMT2;
  const amf1 = document.WMXC2.AMF1;
  const amf2 = document.WMXC2.AMF2;
  const ac1 = document.WMXC2.AC1;
  const ac2 = document.WMXC2.AC2;

  if (typeCalc[0].checked) {
    resetFields(amf1, amf2);
    disableFields(amf1, amf2);
    setDefaultValue(amt1, "0");
    setDefaultValue(amt2, "0");
    enableFields(amt1, amt2);
  }

  if (typeCalc[1].checked) {
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

function collectvalues() {
  var i;
  pH = parseFloat(document.WMXC2.PH.value);
  temperature = parseFloat(document.WMXC2.TM.value);
  ionic = parseFloat(document.WMXC2.IO.value);

  if (document.WMXC2.TYPECALC[0].checked) {
    totalchelatoramount[0] = parseFloat(document.WMXC2.AC1.value);
    totalchelatoramount[1] = parseFloat(document.WMXC2.AC2.value);
    totalmetalamount[0] = parseFloat(document.WMXC2.AMT1.value);
    totalmetalamount[1] = parseFloat(document.WMXC2.AMT2.value);
    for (i = 0; i < 2; i++) {
      freechelatoramount[i] = 0;
      freemetalamount[i] = 0;
    }
  }

  if (document.WMXC2.TYPECALC[1].checked) {
    totalchelatoramount[0] = parseFloat(document.WMXC2.AC1.value);
    totalchelatoramount[1] = parseFloat(document.WMXC2.AC2.value);
    freemetalamount[0] = parseFloat(document.WMXC2.AMF1.value);
    freemetalamount[1] = parseFloat(document.WMXC2.AMF2.value);
    for (i = 0; i < 2; i++) {
      freechelatoramount[i] = 0;
      totalmetalamount[i] = 0;
    }
  }
  totalchelatoramount = convertToM(totalchelatoramount, unit_used);
  freemetalamount = convertToM(freemetalamount, unit_used);
}

function convertToM(values, selectedUnit) {
  var conversionFactor = 1.0; // Default to M

  if (selectedUnit === "mM") {
    conversionFactor = 1.0e-3; // Convert mM to M
  } else if (selectedUnit === "uM") {
    conversionFactor = 1.0e-6; // Convert uM to M
  } else if (selectedUnit === "nM") {
    conversionFactor = 1.0e-9; // Convert nM to M
  }

  // Convert each value in the array to M
  return values.map(function (value) {
    return value * conversionFactor;
  });
}

function docalcfree() {
  var n, o;
  var m = new Array(1);
  var c = new Array(1);

  // initial guesses
  for (x = 0; x < 2; x++) {
    freemetalamount[x] = totalmetalamount[x] / 2;
    if (totalmetalamount[x] > 0) {
      m[x] = 0;
    } else {
      m[x] = 1;
    }
  }
  for (x = 0; x < 2; x++) {
    freechelatoramount[x] = totalchelatoramount[x] / ZSumL[x];
    if (totalchelatoramount[x] > 0) {
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
            o = o + (ZMC[y][x] * freemetalamount[y]) / ZSumL[x];
          }
          n = totalchelatoramount[x] / (1 + o);
          if (
            Math.abs(n - freechelatoramount[x]) <
            0.0001 * freechelatoramount[x]
          ) {
            c[x] = 1;
          }
          freechelatoramount[x] = n;
        }
      }
      for (x = 0; x < 2; x++) {
        if (m[x] == 0) {
          o = 0;
          for (y = 0; y < 2; y++) {
            o = o + (ZMC[x][y] * freechelatoramount[y]) / ZSumL[y];
          }
          n = totalmetalamount[x] / (1 + o);
          if (Math.abs(n - freemetalamount[x]) < 0.0001 * freemetalamount[x]) {
            m[x] = 1;
          }
          freemetalamount[x] = n;
        }
      }
    }
  }

  for (x = 0; x < 2; x++) {
    D[x] = ZSumL[x];
    for (y = 0; y < 2; y++) {
      D[x] = D[x] + ZMC[y][x] * freemetalamount[y];
    }
    if (totalchelatoramount[x] == 0) {
      D[x] = 1;
    }
  }
}

function docalctotal() {
  var s;

  for (x = 0; x < 2; x++) {
    D[x] = ZSumL[x];
    for (y = 0; y < 2; y++) {
      D[x] = D[x] + ZMC[y][x] * freemetalamount[y];
    }
    if (totalchelatoramount[x] == 0) {
      D[x] = 1;
    }
    if (totalchelatoramount[x] == 0) {
      freechelatoramount[x] = 0;
    } else {
      s = 0;
      for (y = 0; y < 2; y++) {
        s = s + (ZMC[y][x] * freemetalamount[y]) / ZSumL[x];
      }
      freechelatoramount[x] = totalchelatoramount[x] / (1 + s);
    }
  }

  for (y = 0; y < 2; y++) {
    totalmetalamount[y] = freemetalamount[y];
    for (x = 0; x < 2; x++) {
      totalmetalamount[y] =
        totalmetalamount[y] +
        ZMC[y][x] * freemetalamount[y] * (totalchelatoramount[x] / D[x]);
    }
  }
}

function calcioniccontrib() {
  var CIL, CIM, T, M1, M2, QC, QM, VC, VM, VD, VE, VF, VG;
  for (x = 0; x < 2; x++) {
    for (y = 0; y < 2; y++) {
      cmcomplex1[y][x] =
        (cmcomplex1[y][x] * freemetalamount[y] * totalchelatoramount[x]) / D[x];
      cmcomplex2[y][x] =
        (cmcomplex2[y][x] * freemetalamount[y] * totalchelatoramount[x]) / D[x];
    }
  }

  T = 0;
  for (a = 0; a < 2; a++) {
    QC = freechelatoramount[a];
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
    } //free chelator ionic + counter ionic
    T =
      T +
      IC[a][0] * QC * 2 * VD +
      IC[a][1] * QC * 2 * VE +
      IC[a][2] * QC * 2 * VF +
      IC[a][3] * QC * 2 * VG;
  }
  for (a = 0; a < 2; a++) {
    T = T + 2 * freemetalamount[a] * VaM[a];
  }
  for (a = 0; a < 2; a++) {
    VC = VaC[a];
    for (b = 0; b < 2; b++) {
      M1 = cmcomplex2[b][a];
      M2 = cmcomplex1[b][a];
      VM = VaM[b];
      VD = Math.abs(VC - VM);
      VE = Math.abs(VC - VM - 1);
      T = T + 2 * M1 * VD + 2 * M2 * VE;
    }
  }
  if (T < 0) {
    T = 0;
  }
  ioncont = T / 2;
}

function cleanfloat(s) {
  let t = "" + s;
  let r = "";

  if (t.includes("e")) {
    const e = t.indexOf("e");
    if (e < 5) {
      r = t;
    } else {
      r = t.substring(0, 5) + t.substring(e);
    }
  } else {
    r = t.length > 9 ? t.substring(0, 9) : t;
  }

  r = r.padEnd(9, " ");
  return r;
}

function docalc() {
  if (s !== "") {
    s += "========================================================";
    s += "\n";
  }
  var t; //putting together the final output
  var i, j;
  var S10;
  var metal_names_string = [];
  collectvalues();
  getconstants();
  conadjust();
  calcH();
  makekon();

  metal_names_string.push({
    name: "Name",
    totalamount: "Total",
    freeamount: "Free",
    bound: "-log10 (Free) ",
    // pbound: "%Bound",
  });

  if (document.WMXC2.TYPECALC[0].checked) {
    docalcfree();
    document.WMXC2.AMF1.value = cleanfloat(freemetalamount[0]);
    document.WMXC2.AMF2.value = cleanfloat(freemetalamount[1]);
    for (i = 0; i < 2; i++) {
      if (totalmetalamount[i] > 0) {
        bound[i] = totalmetalamount[i] - freemetalamount[i];
        pbound[i] = (bound[i] / totalmetalamount[i]) * 100;
        free_amount = convertToUnit(cleanfloat(freemetalamount[i]))
        metal_names_string.push({
          name: metalnames[i],
          totalamount: cleanfloat(totalmetalamount[i]),
          freeamount: free_amount,
          bound: -Math.log10(free_amount)
          // pbound: cleanfloat(pbound[i]),
        });
      }
    }
  }

  if (document.WMXC2.TYPECALC[1].checked) {
    docalctotal();
    document.WMXC2.AMT1.value = cleanfloat(totalmetalamount[0]);
    document.WMXC2.AMT2.value = cleanfloat(totalmetalamount[1]);
    for (i = 0; i < 2; i++) {
      if (freemetalamount[i] > 0) {
        bound[i] = totalmetalamount[i] - freemetalamount[i];
        pbound[i] = (bound[i] / totalmetalamount[i]) * 100;
        free_amount = convertToUnit(cleanfloat(freemetalamount[i]))
        metal_names_string.push({
          name: metalnames[i],
          totalamount: cleanfloat(totalmetalamount[i]),
          freeamount: free_amount,
          bound: -Math.log10(free_amount)
          // pbound: cleanfloat(pbound[i]),
        });
      }
    }
  }

  calcioniccontrib();
  t = [];
  for (i = 0; i < 2; i++) {
    if (totalchelatoramount[i] > 0) {
      cbound[i] = totalchelatoramount[i] - freechelatoramount[i];
      cpbound[i] = (cbound[i] / totalchelatoramount[i]) * 100;
      free_amount = convertToUnit(cleanfloat(freechelatoramount[i]))
      t.push({
        name: chelatornames[i],
        totalamount: cleanfloat(totalchelatoramount[i]),
        freeamount: free_amount,
        bound: -Math.log10(free_amount)
        // pbound: cleanfloat(cpbound[i]),
      });
    }
  }

  makekd();

  totalchelatoramount_component = [];
  totalchelatoramount_component.push({
    name: "Complex",
    Kd: "Kd",
    "Low Limit": "Low Limit",
    "High Limit": "High Limit",
  });
  S10 = Math.sqrt(10);
  for (x = 0; x < 2; x++) {
    if (totalchelatoramount[x] > 0) {
      for (y = 0; y < 2; y++) {
        if (totalmetalamount[y] > 0) {
          totalchelatoramount_component.push({
            name: metalnames[y] + "-" + chelatornames[x],
            Kd: cleanfloat(Kd[y][x]),
            "Low Limit": cleanfloat(Kd[y][x] / S10),
            "High Limit": cleanfloat(Kd[y][x] * S10),
          });
        }
      }
    }
  }
  result_array.push({
    general_info: {
      pH: pH,
      temperature: temperature,
      ionic: ionic,
      "Ionic contribution [ABS]": cleanfloat(ioncont),
    },
    metal_and_chelator: metal_names_string.concat(t),
    totalchelatoramount_component: totalchelatoramount_component,
  });

  var outputDiv = document.getElementById("outputDiv");
  outputDiv.replaceChildren();

  for (var i = 0; i < result_array.length; i++) {
    var result = result_array[i];
    var section = document.createElement("div");

    var divElement = document.createElement("div");
    divElement.className = "output-div";

    for (var key in result) {
      var wrapper = document.createElement("div");
      wrapper.className = "wrapper";
      divElement.appendChild(wrapper);
      var valueElement = document.createElement("div");
      valueElement.className = "output-value";
      if ( key !== "totalchelatoramount_component") {
        if (
          key === "metal_and_chelator"

        ) {
          var components = result[key];

          for (var j = 0; j < components.length; j++) {
            var componentValueElement = document.createElement("div");
            for (const key in components[j]) {
              var componentValueNode = document.createElement("span");
              componentValueNode.textContent = components[j][key];
              componentValueElement.appendChild(componentValueNode);
            }
            valueElement.appendChild(componentValueElement);
          }
        } else {
          var componentValueElement = document.createElement("div");
          for (const keyi in result[key]) {
            var componentValueNode = document.createElement("span");
            componentValueNode.className = "first-row";
            var content = "";
            if (keyi === "pH" || keyi === "Ionic contribution [ABS]") {
              content = keyi + ": ";
            }
            componentValueNode.textContent = content + result[key][keyi];
            componentValueElement.appendChild(componentValueNode);
          }
          valueElement.appendChild(componentValueElement);
        }
      }

      wrapper.appendChild(section);
      wrapper.appendChild(valueElement);
    }

    outputDiv.appendChild(divElement);
  }


  //document.WMXC2.answer.value = s;
}

function downloadOutput() {
  var workbook = XLSX.utils.book_new();
  var worksheet_data = [[]];

  for (var j = 0; j < result_array.length; j++) {
    worksheet_data.push(
      [],
      ["pH", "", "temperature", "ionic", "Ionic contribution [ABS]"]
    );
    var data = result_array[j]["general_info"];
    worksheet_data.push([
      data["pH"],
      data["temperature"],
      data["ionic"],
      data["Ionic contribution [ABS]"],
    ]);

    for (var i = 0; i < result_array[j]["metal_and_chelator"].length; i++) {
      var metal_data = result_array[j]["metal_and_chelator"][i];
      worksheet_data.push([
        metal_data.name,
        cleanfloat(metal_data.totalamount),
        cleanfloat(metal_data.freeamount),
        cleanfloat(metal_data.bound),
        cleanfloat(metal_data.pbound),
      ]);
    }

    worksheet_data.push([]);

    for (
      var i = 0;
      i < result_array[j]["totalchelatoramount_component"].length;
      i++
    ) {
      var component_data = result_array[j]["totalchelatoramount_component"][i];
      worksheet_data.push([
        component_data.name,
        cleanfloat(component_data.Kd),
        cleanfloat(component_data["Low Limit"]),
        cleanfloat(component_data["High Limit"]),
      ]);
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
