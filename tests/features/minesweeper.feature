Feature: Minesweeper

'Cell [1-1] means row = 1, column = 1

Cell without bomb -> o
Cell with bomb -> x
Cell revealed -> $

Cell with one adjacent bomb = 1
Cell with two adjacent bomb = 2
Cell with three adjacent bomb = 3
Cell with four adjacent bomb = 4
Cell with five adjacent bomb = 5
Cell with six adjacent bomb = 6
Cell with seven adjacent bomb = 7
Cell with eight adjacent bomb = 8

Cell flagged with bomb = !
Cell suspected with bomb = ?

3x3 Example with cell with bomb in the [2-2]
Each dash means one row below it = ooo-ooo-oox'

Background: 
Given the user opens the app

Scenario: Mines left display
Then the "<minesLeft>" should show the following value: "10"

Scenario: Time counter display
Then the "<timeDisplay>" should show the following value: ""
When the user clicks on "<Cell>"
Then time counter display should show the following value: "0"

Scenario: Initial gamemap
Then the number of columns should be: "8"
Then the number of rows should be: "8"
Then smiley should be "<Bored-Smiley>" 

Scenario: Reset game
When the user clicks on "<Reset-Btn>"
Then "<minesLeft>" should show the following value: "10" 
# This will give problem when difficulty is switched
And "<timeDisplay>" should show the following value: ""
# And cells are all covered up
# Don't know how to explain those scenarios yet.

Scenario Outline: Game over when the user reveals mine
Given the user loads the following data: "<MockData>"
When the user reveals cell [2,1]
And cell [2,1] should have bomb
Then gameStatus should be over

Examples:
    |   MockData  | gameStatus |
    | OOO-XOO-OOO |    over    |
    
Scenario: User game over
When game is over
Then cells are disabled
Then timeDisplay is stopped
# Then smiley should be "<Sad-Smiley>"

Scenario: Reveal mines when game is over
When game is over
Then all cells with mines should be revealed

Scenario: User reveals cell without bomb
Given the user loads the following data: "<MockData>"
When the user reveals cell [2,1]
And cell [2,1] shouldn't have bomb
Then gameStatus should alive

Examples:
    |   MockData  | gameStatus |
    | OOO-OOO-OXO |    alive   |


Scenario Outline: Flagging cell
When the user right clicks on "<Cell>"
Then "<cell>" should show the following value: "!"
And mines left display should have one less

Examples:
    | minesLeft |  cell | minesLeft |
    |     10    |  " "  |     10    |
    |     10    |  "!"  |     9     |
    |     10    |  "?"  |     10    |

Scenario Outline: Flagging flagged cell
When cell has the following value: "!"
And the user rightclicks on "<Cell>"
Then cell should show the following value: "?"
And mines left display should add one mine

Examples:
    | minesLeft | cellStatus | minesLeft |
    |     9     |     "?"    |     10    |

Scenario Outline: Number of mines with adjacent mines
Given the user loads the following data: "<MockData>"
When the user reveals cell [2-2]
Then the cell [2-2] should show the following value: "<NumberOfMines>"

Examples:
    |   MockData  | NumberOfMines |
    | OOO-X$O-OOO |       1       |
    | OOO-X$X-OOO |       2       |
    | OOX-X$X-OOO |       3       |
    | OOX-X$X-XOO |       4       |
    | OXX-X$X-XOO |       5       |
    | OXX-X$X-XXO |       6       |
    | XXX-X$X-XXO |       7       |
    | XXX-X$X-XXX |       8       |
