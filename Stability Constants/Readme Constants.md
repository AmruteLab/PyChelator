<!DOCTYPE html>
<html>
<body>
  <h1>PyChelator v1.0: other constants</h1>
  <a href="https://doi.org/10.5281/zenodo.10674754"><img src="https://zenodo.org/badge/DOI/10.5281/zenodo.10674754.svg" alt="DOI"></a>
  <a href="https://colab.research.google.com/github/AmruteLab/PyChelator/blob/main/PyChelator_Colab.ipynb" target="_parent">
  <img src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>

</body>
</html>


# Description on the use of constants JSON file

1. Save the desired JSON constants file to your computer.
2. Go to: [PyChelator](https://amrutelab.github.io/PyChelator/)
3. Find: Constants > Upload your constants.

# Available constants files:
If you would like to contribute constants to the repository, or report problems, please write an Issue.

An extensive table of constants is available in [MaxChelator Constants](https://somapp.ucdmc.ucdavis.edu/pharmacology/bers/maxchelator/xlsconstants.htm). 

## Ca2+ and Mg2+ ions:
| Number    | Ligands |JSON File |Reference |Comments|
|:-----:    | :-----  |:-----  |:----- |:-----  |
|     1     |EGTA, ATP |[NIST](NIST.json) |   | Used in [MaxChelator](https://owamoosa.com/maxchelator/)|
|     2     |EGTA, ATP |[Chelator](Chelator.json)  | | Used in [MaxChelator](https://owamoosa.com/maxchelator/)  |
|     3     |EGTA, ATP |[Fabiato](Fabiato.json)   |  | Taken from [Fujushiro et al. 1995](https://www.sciencedirect.com/science/article/pii/001048259598886I) and compared to the reported constants in  [McGuigan et al.](https://owamoosa.com/maxchelator/). The ATP ML and MHL constants were temperature corrected to 20C.   
|     4    |EGTA, ATP |[Calcium](Calcium.json)  |   |   |

## Zn2+ and Ca2+ ions:
| Number    | Ligands |JSON File |Reference |Comments|
|:-----:    | :-----  |:-----  |:----- |:-----  |
|     5    |EGTA, EDTA |[Zn-Ca and EDTA-EGTA](ZnCa_EDTAEGTA.json)  |   |   |