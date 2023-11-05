import math
import pandas as pd
from openpyxl.utils.dataframe import dataframe_to_rows
from openpyxl import Workbook
from google.colab import files

mcd = [
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
]

# Other variables
VaC = [3, 3]
VaM = [2, 2]
chelatornames = ['ATP', 'EGTA']
metalnames = ['Ca2', 'Mg2']
conavailable = ['T T|', 'T T|']
freechelatoramount = [0,0]
freemetalamount = [0,0]
bound = [1,1]
pbound = [1,1]
cbound = [1,1]
cpbound = [1,1]
totalchelatoramount = [1]
totalmetalamount = [1]
pH = 7.4
temperature = 23
ionic = 0.047
Et = 37
Ei = 0.165
ioncont = 0

h1 = [0.0] * 2
h2 = [0.0] * 2
h3 = [0.0] * 2
h4 = [0.0] * 2
dh1 = [0.0] * 2
dh2 = [0.0] * 2
dh3 = [0.0] * 2
dh4 = [0.0] * 2
mc = [[0.0] * 2 for _ in range(2)]
mhc = [[0.0] * 2 for _ in range(2)]
dmc = [[0.0] * 2 for _ in range(2)]
dmhc = [[0.0] * 2 for _ in range(2)]
result_array = []

# intermediate calculations stored here
ZSumL = [0 for _ in range(2)]
ZSumL2 = [0 for _ in range(2)]
ZMC = [[0 for _ in range(2)] for _ in range(2)]
cmcomplex1 = [[0 for _ in range(2)] for _ in range(2)]
cmcomplex2 = [[0 for _ in range(2)] for _ in range(2)]
D = [1] * 2
Kd = [[1 for x in range(2)] for y in range(2)]
Hconc = None
IC = [[1, 1, 1, 1], [1, 1, 1, 1]]
KML = [[1 for x in range(2)] for y in range(2)]
KHML = [[1 for x in range(2)] for y in range(2)]


def download_output():
    global result_array
    workbook = Workbook()
    worksheet = workbook.active

    for result in result_array:
       # Add an empty row before each set of data
        worksheet.append([])

        # Add the header row
        worksheet.append(
            ["pH", "", "temperature", "ionic", "Ionic contribution [ABS]"]
        )
        general_info = result["general_info"]
        row = [str(general_info["pH"]), "", str(general_info["temperature"]), str(general_info["ionic"]), str(general_info["Ionic contribution [ABS]"])]
        worksheet.append(row)

        metal_chelator_data = result["metal_and_chelator"]
        for data in metal_chelator_data:
            row = [data["name"], str(data["totalamount"]), str(data["freeamount"]), str(data["bound"]), str(data["pbound"])]
            worksheet.append(row)

        worksheet.append([])

        chelator_amount_component_data = result["totalchelatoramount_component"]
        for data in chelator_amount_component_data:
            row = [data["name"], str(data["Kd"]), str(data["Low Limit"]), str(data["High Limit"])]
            worksheet.append(row)

    # Adjust column widths
    for col_idx, column in enumerate(worksheet.columns, 1):
        max_length = max(len(str(cell.value)) for cell in column)
        adjusted_width = (max_length + 2) * 1.2
        worksheet.column_dimensions[chr(64 + col_idx)].width = adjusted_width

    # Save Excel file
    file_path = "records.xlsx"
    workbook.save(file_path)

    # Download the file to local machine
    files.download(file_path)

def getconstants():
    global h1, h2, h3, h4, dh1, dh2, dh3, dh4, mc, mhc, dmc, dmhc
    for i in range(0, 2):
        num = (i) * 3 + 7
        s = mcd[num][9:16]
        h1[i] = float(s)
        s = mcd[num][17:24]
        h2[i] = float(s)
        s = mcd[num][25:32]
        h3[i] = float(s)
        s = mcd[num][33:40]
        h4[i] = float(s)

        s = mcd[num][41:48]
        dh1[i] = float(s)
        s = mcd[num][49:56]
        dh2[i] = float(s)
        s = mcd[num][57:64]
        dh3[i] = float(s)
        s = mcd[num][65:72]
        dh4[i] = float(s)

    for i in range(0, 2):
        num = (i) * 3 + 8
        for j in range(0, 2):
            numj = num + j
            s = mcd[numj][5:12]
            mc[j][i] = float(s)
            s = mcd[numj][13:20]
            mhc[j][i] = float(s)
            s = mcd[numj][21:28]
            dmc[j][i] = float(s)
            s = mcd[numj][29:36]
            dmhc[j][i] = float(s)

def getvalences():
    for i in range(2):
        VaM[i] = int(metalnames[i][2])

    for i in range(2):
        VaC[i] = 0

    for i in range(2):
        if h1[i] != 0:
            VaC[i] = 1
        if h2[i] != 0:
            VaC[i] = 2
        if h3[i] != 0:
            VaC[i] = 3
        if h4[i] != 0:
            VaC[i] = 4

def conadjust():
    global h1, h2, h3, h4, mc, mhc, dh1, dh2, dh3, dh4, dmc, dmhc, VaC, VaM

    t = temperature
    i = ionic

    e = 87.7251 - 0.3974762 * Et + 8.253e-4 * Et * Et
    A = 1.8246e6 / math.exp(1.5 * math.log(e * (Et + 273.16)))
    Lf = A * (math.sqrt(Ei) / (1 + math.sqrt(Ei)) - 0.25 * Ei)

    e = 87.7251 - 0.3974762 * t + 8.253e-4 * t * t
    Ap = 1.8246e6 / math.exp(1.5 * math.log(e * (t + 273.16)))
    Lfp = Ap * (math.sqrt(i) / (1 + math.sqrt(i)) - 0.25 * i)

    for x in range(2):
        # First the hydrogen constants...
        if VaC[x] > 0:
            K = h1[x] + 2 * VaC[x] * 1 * (Lf - Lfp)
            h1[x] = K - (dh1[x] / (math.log(10) * 8.314e-3)) * (1 / (t + 273) - 1 / (Et + 273))

        if VaC[x] > 1:
            K = h2[x] + 2 * (VaC[x] - 1) * 1 * (Lf - Lfp)
            h2[x] = K - (dh2[x] / (math.log(10) * 8.314e-3)) * (1 / (t + 273) - 1 / (Et + 273))

        if VaC[x] > 2:
            K = h3[x] + 2 * (VaC[x] - 2) * 1 * (Lf - Lfp)
            h3[x] = K - (dh3[x] / (math.log(10) * 8.314e-3)) * (1 / (t + 273) - 1 / (Et + 273))

        if VaC[x] > 3:
            K = h4[x] + 2 * (VaC[x] - 3) * 1 * (Lf - Lfp)
            h4[x] = K - (dh4[x] / (math.log(10) * 8.314e-3)) * (1 / (t + 273) - 1 / (Et + 273))

        # Ensure hydrogen constants are not negative
        h1[x] = max(0, h1[x])
        h2[x] = max(0, h2[x])
        h3[x] = max(0, h3[x])
        h4[x] = max(0, h4[x])

        # Now the metal chelator constants...
        for y in range(2):
            if VaC[x] > 0:
                K = mc[y][x] + 2 * VaC[x] * VaM[y] * (Lf - Lfp)
                mc[y][x] = K - (dmc[y][x] / (math.log(10) * 8.314e-3)) * (1 / (t + 273) - 1 / (Et + 273))
            mc[y][x] = max(0, mc[y][x])

            if VaC[x] > 1:
                K = mhc[y][x] + 2 * (VaC[x] - 1) * VaM[y] * (Lf - Lfp)
                mhc[y][x] = K - (dmhc[y][x] / (math.log(10) * 8.314e-3)) * (1 / (t + 273) - 1 / (Et + 273))
            mhc[y][x] = max(0, mhc[y][x])

def calcH():
    """Calculates the hydrogen ion concentration"""
    global Hconc, temperature, ionic, pH

    B = 0.522932 * math.exp(0.0327016 * temperature) + 4.015942
    TH = 0.145045 * math.exp(-B * ionic) + 0.063546 * math.exp(-43.97704 * ionic) + 0.695634
    Hconc = math.exp(-pH * math.log(10)) / TH


def makekon():
    """Converts constants from exponential to real"""
    global h1, h2, h3, h4, mc, mhc, Hconc, IC, ZSumL, ZSumL2, ZMC, cmcomplex1, cmcomplex2
    IC = [[0 for _ in range(5)] for _ in range(2)]

    for x in range(2):
        Tcon1 = math.exp(h1[x] * math.log(10))
        Tcon2 = math.exp(h2[x] * math.log(10))
        Tcon3 = math.exp(h3[x] * math.log(10))
        Tcon4 = math.exp(h4[x] * math.log(10))
        IC[x][0] = 0
        IC[x][1] = 0
        IC[x][2] = 0
        IC[x][3] = 0
        IC[x][4] = 0

        IC[x][0] = 1 / (1 + Hconc * Tcon1 + Hconc * Hconc * Tcon1 * Tcon2 + Hconc * Hconc * Hconc * Tcon1 * Tcon2 * Tcon3 + Hconc * Hconc * Hconc * Hconc * Tcon1 * Tcon2 * Tcon3 * Tcon4)

        if h1[x] != 0:
            IC[x][1] = 1 / (1 / (Hconc * Tcon1) + 1 + Hconc * Tcon2 + Hconc * Hconc * Tcon2 * Tcon3 + Hconc * Hconc * Hconc * Tcon2 * Tcon3 * Tcon4)

        if h1[x] != 0 and h2[x] != 0:
            IC[x][2] = 1 / (1 / (Hconc * Hconc * Tcon1 * Tcon2) + 1 / (Hconc * Tcon2) + 1 + Hconc * Tcon3 + Hconc * Hconc * Tcon3 * Tcon4)

        if h1[x] != 0 and h2[x] != 0 and h3[x] != 0:
            IC[x][3] = 1 / (1 / (Hconc * Hconc * Hconc * Tcon1 * Tcon2 * Tcon3) + 1 / (Hconc * Hconc * Tcon2 * Tcon3) + 1 / (Hconc * Tcon3) + 1 + Hconc * Tcon4)

        if h1[x] != 0 and h2[x] != 0 and h3[x] != 0 and h4[x] != 0:
            IC[x][4] = 1 / (1 / (Hconc * Hconc * Hconc * Hconc * Tcon1 * Tcon2 * Tcon3 * Tcon4) + 1 / (Hconc * Hconc * Hconc * Tcon2 * Tcon3 * Tcon4) + 1 / (Hconc * Hconc * Tcon3 * Tcon4) + 1 / (Hconc * Tcon4) + 1)

        if Tcon1 != 0:
            ZSumL2[x] = 1 / (Tcon1 * Hconc) + 1 + Tcon2 * Hconc + Tcon2 * Tcon3 * Hconc * Hconc + Tcon2 * Tcon3 * Tcon4 * Hconc * Hconc * Hconc
        else:
            ZSumL2[x] = 0

        Tcon1 = Tcon1 * Hconc
        Tcon2 = Tcon2 * Tcon1 * Hconc
        Tcon3 = Tcon3 * Tcon2 * Hconc
        Tcon4 = Tcon4 * Tcon3 * Hconc

        ZSumL[x] = 1 + Tcon1 + Tcon2 + Tcon3 + Tcon4

        for y in range(2):
            Tcon5 = math.exp(mc[y][x] * math.log(10))
            Tcon6 = math.exp(mhc[y][x] * math.log(10))

            Tcon6 = Tcon6 * Tcon1
            ZMC[y][x] = Tcon5 + Tcon6
            cmcomplex1[y][x] = Tcon6  # first part of calculating the chelator-metal complex
            cmcomplex2[y][x] = Tcon5

def docalcfree():
    m = [0, 0]
    c = [0, 0]

    # initial guesses
    for x in range(2):
        freemetalamount[x] = totalmetalamount[x] / 2
        m[x] = 0 if totalmetalamount[x] > 0 else 1

        freechelatoramount[x] = totalchelatoramount[x] / ZSumL[x]
        c[x] = 0 if totalchelatoramount[x] > 0 else 1

    for w in range(1000):
        if 0 in m or 0 in c:
            for x in range(2):
                if c[x] == 0:
                    o = sum(ZMC[y][x] * freemetalamount[y] / ZSumL[x] for y in range(2))
                    n = totalchelatoramount[x] / (1 + o)
                    if abs(n - freechelatoramount[x]) < 0.0001 * freechelatoramount[x]:
                        c[x] = 1
                    freechelatoramount[x] = n

            for x in range(2):
                if m[x] == 0:
                    o = sum(ZMC[x][y] * freechelatoramount[y] / ZSumL[y] for y in range(2))
                    n = totalmetalamount[x] / (1 + o)
                    if abs(n - freemetalamount[x]) < 0.0001 * freemetalamount[x]:
                        m[x] = 1
                    freemetalamount[x] = n
        else:
            break

    for x in range(2):
        D[x] = ZSumL[x]
        for y in range(2):
            D[x] += ZMC[y][x] * freemetalamount[y]
        if totalchelatoramount[x] == 0:
            D[x] = 1

def docalctotal():
    for x in range(2):
        D[x] = ZSumL[x]
        for y in range(2):
            D[x] += ZMC[y][x] * freemetalamount[y]
        if totalchelatoramount[x] == 0:
            D[x] = 1

        if totalchelatoramount[x] == 0:
            freechelatoramount[x] = 0
        else:
            s = sum(ZMC[y][x] * freemetalamount[y] / ZSumL[x] for y in range(2))
            freechelatoramount[x] = totalchelatoramount[x] / (1 + s)

    for y in range(2):
        totalmetalamount[y] = freemetalamount[y]
        for x in range(2):
            totalmetalamount[y] += ZMC[y][x] * freemetalamount[y] * (totalchelatoramount[x] / D[x])

def calcioniccontrib():
    cmcomplex1_copy = [[0 for _ in range(2)] for _ in range(2)]
    cmcomplex2_copy = [[0 for _ in range(2)] for _ in range(2)]
    T = 0
    for x in range(2):
        for y in range(2):
            cmcomplex1_copy[y][x] = (cmcomplex1[y][x] * freemetalamount[y] * totalchelatoramount[x]) / D[x]
            cmcomplex2_copy[y][x] = (cmcomplex2[y][x] * freemetalamount[y] * totalchelatoramount[x]) / D[x]
    for a in range(2):
        QC = freechelatoramount[a]
        VD = VaC[a]
        VE, VF, VG = 0, 0, 0
        if VD > 1:
            VE = VD - 1
        if VE > 1:
            VF = VE - 1
        if VF > 1:
            VG = VF - 1

        T += IC[a][0] * QC * 2 * VD + IC[a][1] * QC * 2 * VE + IC[a][2] * QC * 2 * VF + IC[a][3] * QC * 2 * VG
    for a in range(2):
        T += 2 * freemetalamount[a] * VaM[a]
    for a in range(2):
        VC = VaC[a]
        for b in range(2):
            M1, M2 = cmcomplex2_copy[b][a], cmcomplex1_copy[b][a]
            VM = VaM[b]
            VD, VE = abs(VC - VM), abs(VC - VM - 1)
            T += 2 * M1 * VD + 2 * M2 * VE

    if T < 0:
        T = 0
    ioncont = T / 2



def makekd():
    # Check list lengths here to ensure they match the loop ranges
    for x in range(2):
        for y in range(2):
            KML[y][x] = 0
            KHML[y][x] = 0
            Kd[y][x] = 0

    for x in range(2):
        if totalchelatoramount[x] > 0:
            for y in range(2):
                if totalmetalamount[y] > 0:
                    if ZSumL[x] != 0 and mc[y][x] != 0:
                        KML[y][x] = math.exp(mc[y][x] * math.log(10)) / ZSumL[x]
                    if ZSumL2[x] != 0 and mhc[y][x] != 0:
                        KHML[y][x] = math.exp(mhc[y][x] * math.log(10)) / ZSumL2[x]
                    if KML[y][x] + KHML[y][x] != 0:
                        Kd[y][x] = 1 / (KML[y][x] + KHML[y][x])


def cleanfloat(s):
    t = str(s)
    r = ""

    if "e" in t:
        e = t.index("e")
        if e < 5:
            r = t
        else:
            r = t[:5] + t[e:]
    else:
        r = t[:9] if len(t) > 9 else t

    r = r.ljust(9, " ")
    return r


# Call the function to extract constants
metal_names_string = []

def docalculations(find_free_metals = False):
  global result_array
  getvalences()
  getconstants()
  conadjust()
  calcH()
  makekon()
  if find_free_metals:
    docalcfree()
  else:
    docalctotal()

  for i in range (0,2):
    bound[i] = totalmetalamount[i] - freemetalamount[i];
    pbound[i] = (bound[i] / totalmetalamount[i]) * 100;
    metal_names_string.append({
          "name": metalnames[i],
          "totalamount": cleanfloat(totalmetalamount[i]),
          "freeamount": cleanfloat(freemetalamount[i]),
          "bound": cleanfloat(bound[i]),
          "pbound": cleanfloat(pbound[i]),
      })
  calcioniccontrib()
  t = []

  for i in range(2):
      if totalchelatoramount[i] > 0:
          cbound[i] = totalchelatoramount[i] - freechelatoramount[i]
          cpbound[i] = (cbound[i] / totalchelatoramount[i]) * 100
          t.append({
              "name": chelatornames[i],
              "totalamount": cleanfloat(totalchelatoramount[i]),
              "freeamount": cleanfloat(freechelatoramount[i]),
              "bound": cleanfloat(cbound[i]),
              "pbound": cleanfloat(cpbound[i]),
          })

  makekd()
  totalchelatoramount_component = []
  totalchelatoramount_component.append({
      "name": "Complex",
      "Kd": "Kd",
      "Low Limit": "Low Limit",
      "High Limit": "High Limit",
  })

  S10 = math.sqrt(10)
  for x in range(2):
      if totalchelatoramount[x] > 0:
          for y in range(2):
              if totalmetalamount[y] > 0:
                  totalchelatoramount_component.append({
                      "name": metalnames[y] + "-" + chelatornames[x],
                      "Kd": cleanfloat(Kd[y][x]),
                      "Low Limit": cleanfloat(Kd[y][x] / S10),
                      "High Limit": cleanfloat(Kd[y][x] * S10),
                  })
  result_array.append({
      "general_info": {
          "pH": pH,
          "temperature": temperature,
          "ionic": ionic,
          "Ionic contribution [ABS]": cleanfloat(ioncont),
      },
      "metal_and_chelator": metal_names_string + t,
      "totalchelatoramount_component": totalchelatoramount_component,
  })
  print(result_array)


def main():
    global totalchelatoramount, totalmetalamount, freechelatoramount, freemetalamount
    totalchelatoramount_values = [[0.002, 0.001]]
    totalmetalamount_values = [[0.0011218, 0.006]]
    freechelatoramount_values = [[0, 0]]
    freemetalamount_values = [[0, 0]]
    find_free_metals_values = [True]
    # Update the ph, co temperature and ion if necessary

    # Check if all arrays have the same length
    if len(totalchelatoramount) != len(totalmetalamount) != len(freechelatoramount) != len(freemetalamount):
        print("Error: All arrays must have the same length.")
        return

    # Loop through each combination of values
    for i in range(len(totalchelatoramount_values)):
        # Set the global variables to the current combination
        totalchelatoramount = totalchelatoramount_values[i]
        totalmetalamount = totalmetalamount_values[i]
        freechelatoramount = freechelatoramount_values[i]
        freemetalamount = freemetalamount_values[i]
        getconstants()
        # Call the docalculations method with the current combination
        find_free_metals = find_free_metals_values[i]  # If find_free_metals is not passed or is set to False, it will default to calculating total metals
        getvalences()
        docalculations(find_free_metals)

    download_output()

main()
