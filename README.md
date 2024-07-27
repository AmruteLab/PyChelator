# PyChelator v1.1.0: a Python-based Colab and web application for metal chelator calculations
<a href="https://doi.org/10.5281/zenodo.10674753"><img src="https://zenodo.org/badge/DOI/10.5281/zenodo.10674753.svg" alt="DOI"></a> 
<a href="https://colab.research.google.com/github/AmruteLab/PyChelator/blob/main/PyChelator_Colab.ipynb" target="_parent">
<img src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/> </a>
[![FAIR checklist badge](https://fairsoftwarechecklist.net/badge.svg)](https://fairsoftwarechecklist.net/v0.2?f=31&a=32113&i=32322&r=123)
[![Curated with FAIRshare](https://raw.githubusercontent.com/fairdataihub/FAIRshare/main/badge.svg)](https://fairdataihub.org/fairshare)

## Description:
Pychelator is a helpful tool for researchers, scientists, and professionals working with metal-chelator interactions who need to obtain critical data related to these complexes. PyChelator Colab offers the Python version and extensive new features of the well-established [Maxchelator](https://owamoosa.com/maxchelator/) developed by Chris Patton and colleagues <sup>[1](#1)</sup>. The JavaScript version is served in Github Pages [PyChelator Web](https://amrutelab.github.io/PyChelator/).

## Features:
- Calculation of Metal Chelator Complexes: PyChelator performs complex calculations involving chelators and metal ions, taking into account essential environmental parameters like pH, temperature, and ionic strength (the left panel).

- Selection of constants: Easily select the constants to be used from the dropdown menu located in the left panel. Available stability constants are sourced from the National Institute of Standards and Technology ‘NIST’ <sup>[2](#2)</sup>, ‘SPECS’ by Fabiato <sup>[3](#3)</sup>, ‘Chelator’ by Schoenmakers et al. <sup>[4](#4)</sup>, and ‘Calcium’ by Föhr et al. <sup>[5](#5)</sup>. Users can also manually input the constants. The download feature allows users to obtain a local JSON file containing the entries, facilitating the subsequent use by uploading the constants. Equipped with input fields for metal and chelator names, a versatile use of the calculator is allowed for a broader range of applications.

- Selection of input units: Convenient entry of chelator and metal concentrations in units ranging from Molar (M) to nano Molar range (M, mM, μM, and nM) (the left panel).

- Ionic strength: Ionic strength as equivalence of ions can be calculated inside PyChelator

- Purity of chelators: Percent purity of chelators can be entered in the top panel

- Structured Output: The output are structured for selectability. An extra option for the logarithmic transformation of free metal concentration (-log10[free]) is incorporated. The subsequent calculations are appended to the middle panel and can be conveniently downloaded as a single Excel file.

- Arbitrary precision arithmetic: The built-in Python Decimal module in Colab offers user-defined precision in the decimal place calculations



## Find Free Mode - Example:
> [!NOTE] 
> PyChelator input data are simply written in the user interface, operations are caculated and the output is shown in the middle panel, with an option to download the report as an XLSX file.

> Solution A with a pH 7.4 with ionic equivalent 100 mM at 20°C containing:
- 5 mM EGTA (98% purity)
- 1 mM CaCl2
- 2 mM MgATP (97% purity)
- 2 mM MgCl2

Steps for free Calcium calculation in PyChelator:

1. From "Constants" dropdown, select the preferred constants' source (ex.NIST)
2. Select mM as Input unit.
3. Write the Temperature as 20°C.
4. Write the pH as 7.4.
5. Write the Ionic (Ie) equivalent as 100 mM. If you do not know the ionic equivalent, you can calculate by using the "Calculate Ie" button.
6. Select the parameters to "Show in report", or keep defaults.
7. Using the top panel, write the Chelator concentration of ATP to 2 mM (97% purity), and EGTA to 5 mM (98% purity).
8. Write the Total metals given to the solution; Ca²⁺ as 2 mM and Mg²⁺ as 4 mM
9. Click Calculate. You can copy the Free (M) concentration for Ca²⁺ or the -log10[free]. Alternatively, click Download to have a local copy of the results.

## Manual entry of stability constants - Example: 
> Using the stability constants for Zinc and Calcium buffered using EDTA and EGTA, from NIST Critical Stability Constants. A useful table of frequently used chelators and metals can also be found under Maxchelator.

Steps for manual entry of constants in PyChelator:

1. From "Constants" dropdown, select "Write custom constants"
2. Write the Ligands (L1, L2) comma-separated as: EDTA, EGTA.
3. Write the Metals (M1, M2) comma-separated as: Zn, Ca.
4. Write the temperature that the constants were determined (Et) in °C: 20.
5. Write the ionic equivalent that the constants were determined (Ei) in mM: 100.
6. Write the protonation constant H1 (logK) for L1 and L2: 10.3, 9.5
7. Write the ΔH1 enthalpy (kcal/mol) for H1 for L1 and L2: -5.6, -5.9
8. Repeat steps 6 and 7 for all protonation constants.
9. Write the stability constant ML (logK) for M1-L1,M1-L2,M2-L1,M2-L2: 16.6, 12.7, 10.7, 10.9
10. Write the ΔML enthalpy (kcal/mol) for M1-L1,M1-L2,M2-L1,M2-L2: -4.7, -4.3, -6.1, -8.4
11. Repeat Steps 9 and 10 for MHL and ΔMHL, respectively.
12. Download the JSON file. You can use this file the next time using the command Upload constants under Constants dropdown.

## Compatibility:
PyChelator is designed to work with modern web browsers and supports JavaScript-based web applications. PyChelator Colab is versatile and can be integrated into various web projects related to metal-chelator interactions.

## Disclaimer:
While PyChelator aims to provide accurate and useful data, users are advised to validate the results obtained from the code with experimental data and consult the experts for critical applications.

## Citation:
Spahiu, E., Kastrati, E. & Amrute-Nayak, M. PyChelator: a Python-based Colab and web application for metal chelator calculations. BMC Bioinformatics 25, 239 (2024).[https://doi.org/10.1186/s12859-024-05858-8](https://doi.org/10.1186/s12859-024-05858-8)
  
> [!IMPORTANT]  
> To contribute to this software, please open a [Discussion] or file an [Issue] in this Github repository.

## References:
  
<a name="1">1</a>: Bers DM, Patton CW, Nuccitelli R. A practical guide to the preparation of Ca(2+) buffers. Methods Cell Biol. 2010;99:1–26.
  
<a name="2">2</a>:Smith RM, Martell AE. NIST Critically Selected Stability Constants of Metal Complexes Database Version 8.0. 2004.
  
<a name="3">3</a>: [31] Computer programs for calculating total from specified free or free from specified total ionic concentrations in aqueous solutions containing multiple metals and ligands. In: Methods in Enzymology. Academic Press; 1988. p. 378–417.
  
<a name="4">4</a>: Schoenmakers TJM, Visser GJ, Flik G, Theuvenet APR. CHELATOR: an improved method for computing metal ion concentrations in physiological solutions. 1992.
  
<a name="5">5</a>: Föhr KJ, Warchol W, Gratzl M. Calculation and control of free divalent cations in solutions used for membrane fusion studies. In: Methods in Enzymology. Academic Press; 1993. p. 149–57.
