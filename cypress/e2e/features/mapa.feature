Feature: Filtro de gasolinera más barata en el mapa

  Scenario: El usuario elige un tipo de combustible y ve solo la opción más barata
    Given el usuario navega al mapa con estaciones preparadas
    When elige "Gasolina 95 E5" en "Más barata por tipo"
    Then debería ver solo la gasolinera más barata del mapa

  Scenario: El usuario desactiva el filtro y vuelven a verse todas las estaciones del mapa
    Given el usuario navega al mapa con estaciones preparadas
    When elige "Gasolina 95 E5" en "Más barata por tipo"
    And elige "Desactivado" en "Más barata por tipo"
    Then debería volver a ver todas las estaciones dentro del radio

  Scenario: El filtro de la más barata respeta el texto escrito en el rótulo
    Given el usuario navega al mapa con estaciones preparadas
    When escribe "cara" en el filtro de rótulo
    And elige "Gasolina 95 E5" en "Más barata por tipo"
    Then debería ver solo la gasolinera "Estación cara"
