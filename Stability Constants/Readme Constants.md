<!DOCTYPE html>
<html>
<body>
  <h1>PyChelator v1.1.0: other constants</h1>
  <a href="https://doi.org/10.5281/zenodo.10674754"><img src="https://zenodo.org/badge/DOI/10.5281/zenodo.10674754.svg" alt="DOI"></a>
  <a href="https://colab.research.google.com/github/AmruteLab/PyChelator/blob/main/PyChelator_Colab.ipynb" target="_parent">
  <img src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>

</body>
</html>

# Available constants:

An extensive table of constants is available in [MaxChelator Constants](https://somapp.ucdmc.ucdavis.edu/pharmacology/bers/maxchelator/xlsconstants.htm). 

| Metals | Ligands |JSON File |Reference |Comments|
| :----- | :-----  |:-----  |:----- |:-----  |
| Ca2+, Mg2+ |EGTA, ATP |[NIST](NIST.json) | [NIST46](https://www.nist.gov/srd/nist46)  | Used in [MaxChelator](https://owamoosa.com/maxchelator/)|
| Ca2+, Mg2+ |EGTA, ATP |[Chelator](Chelator.json)  | [Schoenmakers et al.](https://repository.ubn.ru.nl/bitstream/handle/2066/249805/249805.pdf?sequence=1) | Used in [MaxChelator](https://owamoosa.com/maxchelator/)  |
| Ca2+, Mg2+ |EGTA, ATP |[Fabiato](Fabiato.json)   | Based on [Fujushiro et al. 1995](https://www.sciencedirect.com/science/article/pii/001048259598886I) and compared to [McGuigan et al.](https://www.sciencedirect.com/science/article/pii/S0079610717300512?via%3Dihub) | The ATP ML and MHL constants were temperature corrected to 20°C.   
| Ca2+, Mg2+ |EGTA, ATP |[Calcium](Calcium.json)  | [Föhr et al.](https://www.sciencedirect.com/science/chapter/bookseries/abs/pii/007668799321014Y?via%3Dihub)  |   |
| Ca2+, Mg2+ |BAPTA, ATP |[Bapta-ATP_Ca-Mg](Bapta-ATP_Ca-Mg_20C.json)  | [NIST46](https://www.nist.gov/srd/nist46)  | Bapta constants (20°C) taken from [MaxChelator](https://owamoosa.com/maxchelator/xlsconstants.htm), NIST constants of ATP were adapted from 25°C to 20°C  |
| Zn2+, Ca2+ |EGTA, EDTA |[Zn-Ca and EDTA-EGTA](ZnCa_EDTAEGTA.json)  | [Neumaier et al.](https://onlinelibrary.wiley.com/doi/10.1111/apha.12988)  |  |

If you would like to contribute constants to the repository, or report problems, please write an Issue.