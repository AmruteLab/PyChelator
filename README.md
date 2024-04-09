<!DOCTYPE html>
<html>
<body>
  <h1>PyChelator v1.0: a web tool for metal and chelator calculations</h1>
  <a href="https://doi.org/10.5281/zenodo.10674754"><img src="https://zenodo.org/badge/DOI/10.5281/zenodo.10674754.svg" alt="DOI"></a>
  <a href="https://colab.research.google.com/github/AmruteLab/PyChelator/blob/main/PyChelator_Colab.ipynb" target="_parent">
  <img src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
  <h2>Description:</h2>
  <p>Pychelator is a helpful tool for researchers, scientists, and professionals working with metal-chelator interactions who need to obtain critical data related to these complexes. As a web tool, it is a modified version of the well-established <a href="https://owamoosa.com/maxchelator/" target="_blank">Maxchelator</a> developed by Chris Patton and colleagues (Bers, Patton, and Nuccitelli, “A Practical Guide to the Preparation of Ca(2+) Buffers.”), with a few new features added as explained below. As a Python script, it offers more flexibility and customization, together with collaboration using the PyChelator Colab notebook.</p>

  <h2>Features:</h2>
  <ul>
    <li><strong>Calculation of Chelator-Metal Complexes:</strong> PyChelator performs complex calculations involving chelators and metal ions, taking into account essential environmental parameters like pH, temperature, and ionic strength (the left panel).</li>
     <li><strong>Selection of constants:</strong> Easily select the constants to be used from the dropdown menu located in the left panel. In addition to the constants sourced from NIST v.48 and Theo Schoenmakers’ Chelator, users can also manually input the constants. The download feature allows users to obtain a local JSON file containing the entries, facilitating the subsequent use by uploading the constants. Equipped with input fields for metal and chelator names, a versatile use of the calculator is allowed for a broader range of applications. </li>
        <li><strong>Selection of input units:</strong> Convenient entry of chelator and metal concentrations in units ranging from Molar (M) to nano Molar range (M, mM, μM, and nM) (the left panel).</li>
    <li><strong>Structured Output:</strong> The comprehensive output of parameters in Maxchelator was structured for selectability. An extra option for the logarithmic transformation of free metal concentration (-log10[free]) is incorporated. The subsequent calculations are appended to the middle panel and can be conveniently downloaded as a single Excel file.</li>

  </ul>

  <h2>Flexibility and Customization:</h2>
  <p>A Python script that users can utilize for further analysis and customization was composed.</p>
  <p>Users are encouraged to modify the Python script according to their unique requirements, enabling them to integrate PyChelator with their existing Python-based workflows and projects.</p>

  <h2>Compatibility:</h2>
  <p>PyChelator is designed to work with modern web browsers and supports JavaScript-based web applications. It is versatile and can be integrated into various web projects related to metal-chelator interactions.</p>
  
  <h2>Disclaimer:</h2>
  <p>While PyChelator aims to provide accurate and useful data, users are advised to validate the results obtained from the code with experimental data and consult the experts for critical applications.</p>
</body>
</html>
