<!DOCTYPE html>
<html>
<body>
  <h1>PyChelator v1.1: a Python-based Colab and web application for metal chelator calculations</h1>
  <a href="https://doi.org/10.5281/zenodo.10674753"><img src="https://zenodo.org/badge/DOI/10.5281/zenodo.10674753.svg" alt="DOI"></a> 
  <a href="https://colab.research.google.com/github/AmruteLab/PyChelator/blob/main/PyChelator_Colab.ipynb" target="_parent">
  <img src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
  <h2>Description:</h2>
  <p>Pychelator is a helpful tool for researchers, scientists, and professionals working with metal-chelator interactions who need to obtain critical data related to these complexes. PyChelator Colab offers the Python version and extensive new features of the well-established <a href="https://owamoosa.com/maxchelator/" target="_blank">Maxchelator</a> developed by Chris Patton and colleagues [1]. The JavaScript version is served in Github Pages <a href="https://amrutelab.github.io/PyChelator/" target="_blank">PyChelator Web</a>. </p>

  <h2>Features:</h2>
  <ul>
<li><strong>Calculation of Metal Chelator Complexes:</strong> PyChelator performs complex calculations involving chelators and metal ions, taking into account essential environmental parameters like pH, temperature, and ionic strength (the left panel).</li>
<li><strong>Selection of constants:</strong> Easily select the constants to be used from the dropdown menu located in the left panel. Available stability constants are sourced from the National Institute of Standards and Technology ‘NIST’ [2], ‘SPECS’ by Fabiato [3], ‘Chelator’ by Schoenmakers et al. [4], and ‘Calcium’ by Föhr et al. [5]. Users can also manually input the constants. The download feature allows users to obtain a local JSON file containing the entries, facilitating the subsequent use by uploading the constants. Equipped with input fields for metal and chelator names, a versatile use of the calculator is allowed for a broader range of applications. </li>
<li><strong>Selection of input units:</strong> Convenient entry of chelator and metal concentrations in units ranging from Molar (M) to nano Molar range (M, mM, μM, and nM) (the left panel).</li>
<li><strong>Ionic strength:</strong> Ionic strength as equivalence of ions can be calculated inside PyChelator </li>
<li><strong>Purity of chelators:</strong> Percent purity of chelators can be entered in the top panel </li>
<li><strong>Structured Output:</strong> The output are structured for selectability. An extra option for the logarithmic transformation of free metal concentration (-log10[free]) is incorporated. The subsequent calculations are appended to the middle panel and can be conveniently downloaded as a single Excel file.</li>
<li><strong>Arbitrary precision arithmetic:</strong> The built-in Python Decimal module in Colab offers user-defined precision in the decimal place calculations. </li>
   </ul>

  <h2>Flexibility and Customization:</h2>
  <p>Using the Python-based Colab, users can utilize further analysis and customization. </p>
  <p>Users are encouraged to modify the Python script according to their unique requirements, enabling them to integrate PyChelator with their existing Python-based workflows and projects.</p>

  <h2>Compatibility:</h2>
  <p>PyChelator is designed to work with modern web browsers and supports JavaScript-based web applications. It is versatile and can be integrated into various web projects related to metal-chelator interactions.</p>
  
  <h2>Disclaimer:</h2>
  <p>While PyChelator aims to provide accurate and useful data, users are advised to validate the results obtained from the code with experimental data and consult the experts for critical applications.</p>
  
  <h2>References:</h2>
  
  1. Bers DM, Patton CW, Nuccitelli R. A practical guide to the preparation of Ca(2+) buffers. Methods Cell Biol. 2010;99:1–26.
  
  2. Smith RM, Martell AE. NIST Critically Selected Stability Constants of Metal Complexes Database Version 8.0. 2004.
  
  3. Bers DM, Patton CW, Nuccitelli R. A practical guide to the preparation of Ca(2+) buffers. Methods Cell Biol. 2010;99:1–26.
  
  4. Fabiato A. [31] Computer programs for calculating total from specified free or free from specified total ionic concentrations in aqueous solutions containing multiple metals and ligands. In: Methods in Enzymology. Academic Press; 1988. p. 378–417.
  
  5. Schoenmakers TJM, Visser GJ, Flik G, Theuvenet APR. CHELATOR: an improved method for computing metal ion concentrations in physiological solutions. 1992.
  
  6. Föhr KJ, Warchol W, Gratzl M. Calculation and control of free divalent cations in solutions used for membrane fusion studies. In: Methods in Enzymology. Academic Press; 1993. p. 149–57.
  
</body>
</html>
