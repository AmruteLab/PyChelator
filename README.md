<!DOCTYPE html>
<html>
<body>
  <h1>PyChelator: a web tool for metal-chelator calculations</h1>
  <h2>Description:</h2>
  <p>Pychelator serves as a helpful tool for researchers, scientists, and professionals working with metal-chelator interactions who need to obtain critical data related to these complexes. PyChelator web tool is a modified version of the well-established <a href="https://somapp.ucdmc.ucdavis.edu/pharmacology/bers/maxchelator/" target="_blank">Maxchelator</a>, with new features explained below. PyChelator Colab is the Python-based Google Colaboratory notebook.</p>

  <h2>Features:</h2>
  <ul>
    <li><strong>Calculation of Chelator-Metal Complexes:</strong> PyChelator performs complex calculations involving chelators and metal ions, taking into account essential environmental parameters like pH, temperature, and ionic strength (the left panel).</li>
     <li><strong>Selection of constants:</strong> Easily select the constants to be used from the dropdown in the left panel. Apart from the constants from NIST v.48 and Theo Schoenmakers’ Chelator, an option of manually writing the constants is available. The download option enables having a local json file of the entries which can be uploaded at a subsequent use. The presence of label fields for the metal and chelators enables the use of the calculator for any metal and chelators. </li>
        <li><strong>Selection of input units:</strong> Convenient entry of chelator and metal concentrations in units ranging from Molar (M) to nano Molar range (M, mM, μM, and nM) (the left panel).</li>
    <li><strong>Structured Output:</strong> The comprehensive output of parameters in Maxchelator was made selectable. An extra option for the logarithmic transformation of free metal concentration (-log10[free]) was included. The subsequent calculations are appended to the middle panel, downloadable as a single Excel file.</li>

  </ul>

  <h2>Flexibility and Customization:</h2>
  <p>A Python script that users can utilize for further analysis and customization was composed.</p>
  <p>Users are encouraged to modify the Python script according to their unique requirements, enabling them to integrate PyChelator with their existing Python-based workflows and projects.</p>
  <p>Try out the PyChelator Colab on Google Colaboratory: <a href="https://colab.research.google.com/drive/11u4w6PD4U_Y3j8kLM70c_TW6IkRYz5OF?usp=sharing" target="_blank">Open in Google Colab</a></p>

  <h2>Compatibility:</h2>
  <p>PyChelator is designed to work with modern web browsers and supports JavaScript-based web applications. It is versatile and can be integrated into various web projects related to metal-chelator interactions.</p>
  
  <h2>Disclaimer:</h2>
  <p>While PyChelator aims to provide accurate and useful data, users are advised to validate the results obtained from the code with experimental data and consult domain experts for critical applications.</p>
</body>
</html>
